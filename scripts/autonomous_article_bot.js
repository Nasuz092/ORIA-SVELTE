import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to load env from .env file first, then process.env
function getEnv(key, defaultValue = '') {
  try {
    const candidatePaths = [
      path.join(__dirname, '..', '.env'),
      path.join(__dirname, '..', '..', 'cms.oria.co.id', 'public_html', '.env'),
      path.join(__dirname, '..', '..', 'oria.com-Strapi', '.env')
    ];
    for (const envPath of candidatePaths) {
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        const lines = content.split(/\r?\n/);
        for (const line of lines) {
          const match = line.match(/^\s*(?:export\s+)?([\w.-]+)\s*=\s*(.*)?\s*$/);
          if (match && match[1] === key && match[2] !== undefined) {
            const v = match[2].trim().replace(/^['"]|['"]$/g, '');
            if (v) return v;
          }
        }
      }
    }
  } catch (err) {}
  return process.env[key] || defaultValue;
}

const GEMINI_API_KEY = getEnv('GEMINI_API_KEY_BOT_GENERATE') || getEnv('GEMINI_API_KEY');
const GEMINI_MODEL = getEnv('GEMINI_MODEL_BOT_GENERATE') || getEnv('GEMINI_MODEL', 'gemini-4-hydrogen');
const STRAPI_URL = (getEnv('STRAPI_URL') || 'https://cms.oria.co.id').replace(/\/$/, '');
const STRAPI_TOKEN = getEnv('STRAPI_TOKEN_BOT_GENERATE') || getEnv('STRAPI_TOKEN');

// Optional DB fallback credentials
const DB_HOST = getEnv('DATABASE_HOST') || '127.0.0.1';
const DB_PORT = parseInt(getEnv('DATABASE_PORT') || '3306', 10);
const DB_USER = getEnv('DATABASE_USERNAME') || getEnv('DATABASE_USER') || 'root';
const DB_PASS = getEnv('DATABASE_PASSWORD') || '';
const DB_NAME = getEnv('DATABASE_NAME') || 'oria_strapi';

function logMessage(msg) {
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
  const formatted = `[${timestamp}] ${msg}`;
  console.log(formatted);
  try {
    const logsDir = path.join(__dirname, '..', 'logs');
    if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });
    fs.appendFileSync(path.join(logsDir, 'autonomous_bot.log'), formatted + '\n');
  } catch (err) {}
}

function cleanPlainText(str) {
  if (!str || typeof str !== 'string') return str || '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

// Schedule: Senin (1), Rabu (3), Jumat (5) WIB — 3 artikel/minggu
function getJakartaDayInfo() {
  const nowJakarta = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
  const dayIndex = nowJakarta.getDay();
  const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  return {
    dayIndex,
    dayName: dayNames[dayIndex],
    isScheduledDay: dayIndex === 1 || dayIndex === 3 || dayIndex === 5
  };
}

// Map Strapi product/category to frontend route category (/produk/[kategori]/[slug])
function getProductRouteCategory(prod) {
  const catSlug = (prod.categorySlug || '').toLowerCase();
  const pName = (prod.name || '').toLowerCase();
  const slug = (prod.slug || '').toLowerCase();

  if (catSlug.includes('single-pass') || pName.includes('one pass') || pName.includes('single pass')) return 'single-pass';
  if (catSlug.includes('outdoor') || pName.includes('outdoor') || pName.includes('3204') || pName.includes('3202')) return 'outdoor';
  if (catSlug.includes('indoor') || pName.includes('indoor') || pName.includes('ecosolvent')) return 'indoor';
  if (catSlug.includes('uv') || pName.includes('uv') || pName.includes('tumbler')) return 'uv';
  if (catSlug.includes('sublim') || pName.includes('sublim') || catSlug.includes('heat-press') || pName.includes('heat press')) return 'sublimasi';
  if (catSlug === 'mesin-dtf' || pName.includes('dtf')) return 'dtf';
  if (catSlug === 'mesin-dtg' || pName.includes('dtg')) return 'dtg';
  if ((pName.includes('laser') || slug.includes('laser')) && !pName.includes('uv')) return 'laser';
  if (pName.includes('cnc') || pName.includes('router') || pName.includes('plasma')) return 'cnc';
  return 'uv';
}

async function getExistingArticles() {
  const articlesMap = new Map();

  const fetchByStatus = async (statusParam) => {
    try {
      for (let page = 1; page <= 2; page++) {
        const url = `${STRAPI_URL}/api/articles?${statusParam}&fields[0]=title&fields[1]=slug&fields[2]=category&fields[3]=createdAt&fields[4]=updatedAt&fields[5]=content&pagination[page]=${page}&pagination[pageSize]=100&sort=updatedAt:desc`;
        const res = await fetch(url, {
          headers: {
            ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {})
          }
        });
        if (!res.ok) break;
        const data = await res.json();
        const items = data.data || [];
        items.forEach((a) => {
          const attrs = a.attributes || a;
          if (attrs && attrs.title) {
            const slugKey = (attrs.slug || '').toLowerCase().trim();
            const titleKey = (attrs.title || '').toLowerCase().trim();
            const key = `${slugKey}|${titleKey}`;
            const contentLower = (attrs.content || '').toLowerCase();
            if (!articlesMap.has(key)) {
              articlesMap.set(key, {
                title: attrs.title || '',
                slug: attrs.slug || '',
                category: attrs.category || '',
                createdAt: attrs.createdAt || '',
                updatedAt: attrs.updatedAt || '',
                hasBacklinkMp: contentLower.includes('mesinprinting.id'),
                hasBacklinkMpj: contentLower.includes('mesinprintingjersey.id')
              });
            }
          }
        });
        if (page >= (data.meta?.pagination?.pageCount || 1)) break;
      }
    } catch (e) {
      logMessage(`Peringatan saat fetch artikel (${statusParam}): ${e.message}`);
    }
  };

  await Promise.all([fetchByStatus('status=published'), fetchByStatus('status=draft')]);
  const list = Array.from(articlesMap.values());
  logMessage(`Total riwayat artikel di Strapi ORIA (Published & Draft): ${list.length} artikel.`);
  return list;
}

async function getProductsCatalog() {
  let allProducts = [];
  try {
    let page = 1;
    while (true) {
      const url = `${STRAPI_URL}/api/products?status=published&fields[0]=name&fields[1]=slug&fields[2]=brand&fields[3]=regular_price&fields[4]=sale_price&populate[category][fields][0]=name&populate[category][fields][1]=slug&pagination[page]=${page}&pagination[pageSize]=100`;
      const res = await fetch(url, {
        headers: {
          ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {})
        }
      });
      if (!res.ok) break;
      const data = await res.json();
      const items = data.data || [];
      allProducts = allProducts.concat(
        items.map((p) => {
          const attrs = p.attributes || p;
          const mapped = {
            name: attrs.name,
            slug: attrs.slug,
            category: attrs.category?.name || (typeof attrs.category === 'string' ? attrs.category : 'Mesin Digital Printing'),
            categorySlug: attrs.category?.slug || '',
            brand: attrs.brand || 'ORIA',
            price: attrs.sale_price || attrs.regular_price || null
          };
          return {
            ...mapped,
            routeCategory: getProductRouteCategory(mapped)
          };
        })
      );
      if (page >= (data.meta?.pagination?.pageCount || 1)) break;
      page++;
    }
  } catch (e) {
    logMessage(`Peringatan saat fetch katalog produk ORIA: ${e.message}`);
  }
  logMessage(`Katalog produk aktif (Published) ORIA termuat: ${allProducts.length} unit.`);
  return allProducts;
}

function detectMachineCategory(text) {
  const t = (text || '').toLowerCase();
  if (t.includes('outdoor') || t.includes('banner') || t.includes('spanduk') || t.includes('3202') || t.includes('3204') || t.includes('solvent')) {
    return 'outdoor_solvent';
  }
  if (t.includes('indoor') || t.includes('ecosolvent') || t.includes('eco-solvent') || t.includes('1802') || t.includes('1902') || t.includes('stiker')) {
    return 'indoor_ecosolvent';
  }
  if (t.includes('uv') || t.includes('flatbed') || t.includes('tumbler') || t.includes('cylinder') || t.includes('uv dtf')) {
    return 'uv_printing';
  }
  if (t.includes('sublim') || t.includes('jersey') || t.includes('heat press') || t.includes('tekstil')) {
    return 'sublimasi_tekstil';
  }
  if (t.includes('dtf') || t.includes('dtg') || t.includes('kaos') || t.includes('apparel')) {
    return 'dtf_dtg_apparel';
  }
  if (t.includes('laser') || t.includes('fiber') || t.includes('galvo') || t.includes('marking')) {
    return 'laser_cutting';
  }
  if (t.includes('cnc') || t.includes('router') || t.includes('plasma')) {
    return 'cnc_router';
  }
  if (t.includes('single pass') || t.includes('one pass') || t.includes('karton') || t.includes('dc800sp')) {
    return 'single_pass';
  }
  return 'general';
}

function getWeeklyArticleStats(existingArticles) {
  const now = new Date();
  const startOfWeek = new Date(now);
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
  startOfWeek.setDate(diff);
  startOfWeek.setHours(0, 0, 0, 0);

  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const articlesLast7Days = existingArticles.filter((a) => new Date(a.createdAt || a.updatedAt || 0) >= sevenDaysAgo);
  const thisWeekArticles = existingArticles.filter((a) => new Date(a.createdAt || a.updatedAt || 0) >= startOfWeek);
  const productArticlesLast7Days = articlesLast7Days.filter((a) => a.category === 'Product');
  const hasBacklinkMpThisWeek = thisWeekArticles.some((a) => a.hasBacklinkMp);
  const hasBacklinkMpjThisWeek = thisWeekArticles.some((a) => a.hasBacklinkMpj);

  const sortedRecent = [...existingArticles]
    .filter((a) => a.createdAt || a.updatedAt)
    .sort((a, b) => new Date(b.createdAt || b.updatedAt).getTime() - new Date(a.createdAt || a.updatedAt).getTime());

  const recent3 = sortedRecent.slice(0, 3);
  const troubleshootingCountInRecent3 = recent3.filter((a) => {
    const t = (a.title || '').toLowerCase();
    return t.startsWith('cara mengatasi') || t.startsWith('panduan mengatasi') || t.includes('mengatasi');
  }).length;

  const recentCategories = recent3
    .map((a) => detectMachineCategory(`${a.title || ''} ${a.slug || ''}`))
    .filter((c) => c !== 'general');

  return {
    totalLast7Days: articlesLast7Days.length,
    thisWeekCount: thisWeekArticles.length,
    hasBacklinkMpThisWeek,
    hasBacklinkMpjThisWeek,
    productCountLast7Days: productArticlesLast7Days.length,
    troubleshootingCountInRecent3,
    lastMachineCategory: recentCategories[0] || '',
    lastPillarCategory: sortedRecent[0]?.category || '',
    recentTitles: recent3.map((a) => a.title)
  };
}

// Decide which dofollow backlinks to include (at least 1x/week to mesinprinting.id & 1x/week to mesinprintingjersey.id)
function getBacklinkTargetsForRun(weeklyStats, dayIndex, topicTitle = '') {
  const needMp = !weeklyStats.hasBacklinkMpThisWeek;
  const needMpj = !weeklyStats.hasBacklinkMpjThisWeek;

  if (!needMp && !needMpj) return { includeMp: false, includeMpj: false };
  if (needMp && !needMpj) return { includeMp: true, includeMpj: false };
  if (!needMp && needMpj) return { includeMp: false, includeMpj: true };

  // Both still needed this week: on Friday (5) include both to guarantee weekly target; otherwise rotate cleanly
  if (dayIndex === 5) return { includeMp: true, includeMpj: true };
  const isTextileTopic = /sublim|jersey|dtf|dtg|tekstil|kaos|heat press/i.test(topicTitle);
  return isTextileTopic ? { includeMp: false, includeMpj: true } : { includeMp: true, includeMpj: false };
}

const COMPETITOR_BRANDS = [
  'rhinotec', 'grando', 'gongzheng', 'allwin', 'taimes', 'wit-color', 'witcolor',
  'skycolor', 'audley', 'fedar', 'stormjet', 'crystaljet', 'liyu', 'galaxy',
  'human digital', 'xenons', 'kingjet', 'flora', 'yaselan', 'keundo'
];

function isProductEligibleForArticle(prod) {
  const pName = (prod.name || '').toLowerCase();
  const pCat = (prod.category || '').toLowerCase();
  const pCatSlug = (prod.categorySlug || '').toLowerCase();
  if (COMPETITOR_BRANDS.some((c) => pName.includes(c))) return false;
  if (
    pCat.includes('consumable') ||
    pCatSlug.includes('consumable') ||
    pName.startsWith('tinta ') ||
    pName.startsWith('kertas ')
  ) {
    return false;
  }
  return true;
}

const INDONESIAN_STOPWORDS = new Set([
  'yang', 'untuk', 'pada', 'ke', 'para', 'namun', 'menurut', 'antara', 'dia', 'dua', 'ia',
  'seperti', 'jika', 'sehingga', 'kembali', 'dan', 'tidak', 'ini', 'itu', 'karena', 'kepada',
  'oleh', 'saat', 'harus', 'sementara', 'setelah', 'belum', 'kami', 'sekitar', 'bagi', 'serta',
  'di', 'dari', 'telah', 'sebagai', 'masih', 'hal', 'ketika', 'adalah', 'dalam', 'bisa',
  'bahwa', 'atau', 'hanya', 'kita', 'dengan', 'akan', 'juga', 'ada', 'mereka', 'sudah', 'saya',
  'agar', 'anda', 'tentang', 'oria', 'mesin', 'printer', 'printing', 'digital', 'cetak', 'indonesia'
]);

function normalizeSemanticTokens(text) {
  const s = (text || '')
    .toLowerCase()
    .replace(/-/g, ' ')
    .replace(/berapa\s+harga|kisaran\s+harga|daftar\s+harga|cek\s+harga|\bharga\b/g, 'intent_harga')
    .replace(/perbedaan|perbandingan|\bvs\b|banding|mana\s+yang\s+lebih/g, 'intent_komparasi')
    .replace(/peluang\s+usaha|peluang\s+bisnis|ide\s+bisnis|ide\s+usaha|memulai\s+usaha|memulai\s+bisnis/g, 'intent_bisnis')
    .replace(/cara\s+mengatasi|panduan\s+mengatasi|solusi\s+mengatasi|printhead\s+mampet/g, 'intent_troubleshooting')
    .replace(/spesifikasi\s+lengkap|review|\bspesifikasi\b/g, 'intent_spesifikasi')
    .replace(/cara\s+memilih|panduan\s+memilih|tips\s+memilih/g, 'intent_buying_guide')
    .replace(/[^a-z0-9_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return [...new Set(s.split(' ').filter((w) => w.length >= 3 && !INDONESIAN_STOPWORDS.has(w)))];
}

function extractModelIdentifiers(text) {
  const t = (text || '').toLowerCase().replace(/-/g, ' ');
  const matches = t.match(/\b(?:[a-z]{0,4}\d{3,4}[a-z]{0,2}|a3|e3|5w|dc800sp|dtg02)\b/g) || [];
  const ignoreYears = new Set(['2024', '2025', '2026', '2027']);
  return [...new Set(matches.map((m) => m.replace(/\s+/g, '')).filter((m) => !ignoreYears.has(m)))];
}

function checkTopicDuplicationInStrapi(candidate, existingArticles) {
  const candTitle = typeof candidate === 'string' ? candidate : candidate.discovered_title || candidate.title || '';
  const candPrimaryKw = typeof candidate === 'object' ? candidate.keyword_analysis?.primary_keyword || '' : '';
  const candTokens = normalizeSemanticTokens(candTitle);
  const candKwTokens = normalizeSemanticTokens(candPrimaryKw || candTitle);
  const candModels = extractModelIdentifiers(`${candTitle} ${candPrimaryKw}`);

  for (const existing of existingArticles) {
    const exTitle = existing.title || '';
    const exSlug = existing.slug || '';
    const exCombined = `${exTitle} ${exSlug}`;
    const exTokens = normalizeSemanticTokens(exCombined);
    const exModels = extractModelIdentifiers(exCombined);

    if (candTitle.toLowerCase().trim() === exTitle.toLowerCase().trim()) {
      return { isDuplicate: true, reason: `Judul sama persis dengan "${exTitle}"` };
    }

    if (candModels.length > 0 && exModels.length > 0) {
      const sharedModels = candModels.filter((m) => exModels.includes(m));
      if (sharedModels.length > 0 && candTokens.filter((t) => exTokens.includes(t)).length >= 2) {
        return { isDuplicate: true, reason: `Model (${sharedModels.join(', ')}) sudah dibahas di "${exTitle}"` };
      }
    }

    if (candKwTokens.length >= 2) {
      const kwRatio = candKwTokens.filter((t) => exTokens.includes(t)).length / candKwTokens.length;
      if (kwRatio >= 0.75) {
        return { isDuplicate: true, reason: `Keyword sudah terwakili oleh "${exTitle}"` };
      }
    }

    if (candTokens.length >= 3 && exTokens.length >= 3) {
      const overlap = candTokens.filter((t) => exTokens.includes(t));
      const maxRatio = Math.max(overlap.length / candTokens.length, overlap.length / exTokens.length);
      if (maxRatio >= 0.65) {
        return { isDuplicate: true, reason: `Kemiripan topik (${Math.round(maxRatio * 100)}%) dengan "${exTitle}"` };
      }
    }
  }

  return { isDuplicate: false, reason: '' };
}

function selectTopFeaturedProduct(catalog, existingArticles, lastMachineCategory = '') {
  const existingLower = existingArticles.map((a) => `${a.slug || ''} ${a.title || ''}`.toLowerCase());
  const priorityTerms = ['3202', 'uv', 'a3', '1902', '6040', '6004', '1325', 'dc800sp'];

  const scored = [];
  for (const prod of catalog) {
    if (!prod.name || !prod.slug || !isProductEligibleForArticle(prod)) continue;
    const pName = prod.name.toLowerCase();
    const pSlug = prod.slug.toLowerCase();
    const prodTechCategory = detectMachineCategory(`${pName} ${prod.category || ''}`);
    const dupCheck = checkTopicDuplicationInStrapi(`${prod.name} spesifikasi harga`, existingArticles);
    const isReviewed =
      dupCheck.isDuplicate ||
      existingLower.some((entry) => entry.includes(pSlug) || entry.includes(pName));

    let score = 10;
    for (const term of priorityTerms) {
      if (pName.includes(term) || pSlug.includes(term)) score += 35;
    }
    if (lastMachineCategory && prodTechCategory === lastMachineCategory) score -= 500;

    scored.push({ ...prod, techCategory: prodTechCategory, score, isReviewed });
  }

  const diffCat = scored.filter((p) => !p.isReviewed && p.techCategory !== lastMachineCategory).sort((a, b) => b.score - a.score);
  if (diffCat.length > 0) return diffCat[0];

  const anyUnreviewed = scored.filter((p) => !p.isReviewed).sort((a, b) => b.score - a.score);
  return anyUnreviewed[0] || null;
}

let stickyWorkingEndpoint = null;

async function callGeminiAPI(body, defaultModel = GEMINI_MODEL) {
  const candidateModels = [
    ...new Set([
      defaultModel,
      'gemini-4-hydrogen',
      'gemini-4-carbon',
      'gemini-4-neon',
      'gemini-4-argon',
      'gemini-3.8-flash',
      'gemini-3.6-flash'
    ].filter(Boolean))
  ];

  // Try generativelanguage.googleapis.com across all allowed models first, then aiplatform fallback
  const attemptsList = [];
  if (stickyWorkingEndpoint) attemptsList.push(stickyWorkingEndpoint);
  for (const model of candidateModels) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
    if (!attemptsList.some((item) => item.url === url)) attemptsList.push({ model, url });
  }
  for (const model of candidateModels) {
    const url = `https://aiplatform.googleapis.com/v1/publishers/google/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
    if (!attemptsList.some((item) => item.url === url)) attemptsList.push({ model, url });
  }

  let lastRes = null;
  let lastModel = candidateModels[0];

  for (let i = 0; i < attemptsList.length; i++) {
    const { model, url } = attemptsList[i];
    const maxRetries = model === defaultModel ? 2 : 1;

    for (let retry = 1; retry <= maxRetries; retry++) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
          signal: AbortSignal.timeout(180000)
        });
        lastRes = res;
        lastModel = model;

        if (res.ok) {
          stickyWorkingEndpoint = { model, url };
          return { res, model };
        }

        if ((res.status === 503 || res.status === 429) && retry < maxRetries) {
          logMessage(`⚠️ Model ${model} sibuk (${res.status}). Retry ${retry}/${maxRetries - 1} dalam 5 detik...`);
          await new Promise((r) => setTimeout(r, 5000));
          continue;
        }

        if ([400, 401, 403, 404, 429, 500, 503].includes(res.status) && attemptsList[i + 1]) {
          logMessage(`⚠️ Model ${model} status ${res.status}. Mencoba cadangan (${attemptsList[i + 1].model})...`);
          await new Promise((r) => setTimeout(r, 1500));
          break;
        }
        return { res, model };
      } catch (err) {
        if (retry < maxRetries) {
          logMessage(`⚠️ Request ${model} gagal (${err.message}). Retry dalam 5 detik...`);
          await new Promise((r) => setTimeout(r, 5000));
          continue;
        }
        if (!attemptsList[i + 1]) throw err;
        logMessage(`⚠️ Request ${model} gagal (${err.message}). Mengalihkan ke ${attemptsList[i + 1].model}...`);
        break;
      }
    }
  }
  return { res: lastRes, model: lastModel };
}

async function discoverAutonomousTopic(existingArticles, catalog, forcedPillar = '') {
  logMessage(`🔍 Menjalankan Riset Strategis SEO, GEO & E-E-A-T ORIA...`);

  const stats = getWeeklyArticleStats(existingArticles);
  const dayInfo = getJakartaDayInfo();

  const shouldPickProductSpotlight =
    forcedPillar === 'Product' ||
    (!forcedPillar && stats.productCountLast7Days === 0 && stats.lastPillarCategory !== 'Product' && dayInfo.dayIndex === 3);

  let candidateProduct = null;
  if (shouldPickProductSpotlight) {
    candidateProduct = selectTopFeaturedProduct(catalog, existingArticles, stats.lastMachineCategory);
  }

  const forbidTroubleshooting = stats.troubleshootingCountInRecent3 >= 1;
  const pillarOptions = ['Digital Print', 'Business', 'Insight', 'Trivia'];
  const targetCategory = forcedPillar || (candidateProduct ? 'Product' : pillarOptions[Math.floor(Math.random() * pillarOptions.length)]);

  const compactRecentTitles = existingArticles.slice(0, 60).map((a) => `- ${a.title}`).join('\n');
  const eligibleCatalogSample = catalog
    .filter(isProductEligibleForArticle)
    .slice(0, 25)
    .map((p) => `${p.name} (/produk/${p.routeCategory}/${p.slug})`)
    .join('\n- ');

  const forbiddenTech = stats.lastMachineCategory || '';
  const rejectedTopicsHistory = [];
  const MAX_ATTEMPTS = 3;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const rejectionFeedback =
      rejectedTopicsHistory.length > 0
        ? `\nTOPIK SEBELUMNYA DITOLAK KARENA DUPLIKAT:\n${rejectedTopicsHistory.map((r, i) => `${i + 1}. "${r.title}" -> ${r.reason}`).join('\n')}\nWAJIB PILIH TOPIK & KATEGORI MESIN YANG BERBEDA!\n`
        : '';

    const prompt = `Anda adalah Senior SEO, GEO & E-E-A-T Content Strategist untuk ORIA Printing Indonesia (oria.co.id) — Brand Mesin Digital Printing & Manufaktur Industri Presisi di Indonesia.

TUGAS: Rancang 1 topik artikel baru yang mencerminkan keragaman lini mesin ORIA (seperti mesinprinting.id):
- Mesin Outdoor Solvent (spanduk, baliho, stiker kendaraan — misal ORIA 3202 & 3204 ST)
- Mesin Indoor Eco-Solvent (poster, stiker vinyl, wallcovering, POSM)
- Mesin UV Printing (UV Flatbed A3/3060/6040/6090, UV Roll-to-Roll, UV Cylinder/Tumbler, UV DTF)
- Mesin Sublimasi Textile & Heat Press (jersey, hijab voal, apparel)
- Mesin Sablon DTF & DTG Garment
- Mesin Laser Cutting, Fiber Laser, Laser Marking & CNC Router / Plasma
- Mesin Single Pass Packaging (karton & box)
${rejectionFeedback}
DATA INPUT:
- Target Kategori: "${targetCategory}"
${
  candidateProduct && attempt === 1
    ? `- Fokus Produk: "${candidateProduct.name}" (/produk/${candidateProduct.routeCategory}/${candidateProduct.slug})`
    : '- Fokus: Panduan Memilih Mesin / Komparasi Teknologi / Analisa HPP & ROI Usaha / Tips Teknis Operator'
}
- Daftar Produk Aktif ORIA:
- ${eligibleCatalogSample}
${forbiddenTech ? `- Kategori Terakhir (DIHINDARI Diulang): "${forbiddenTech.toUpperCase()}"` : ''}

ATURAN KETAT JUDUL & ANTI-DUPLIKASI:
1. DILARANG membuat topik yang mirip dengan daftar artikel yang sudah ada:
${compactRecentTitles || '- Belum ada artikel.'}
2. JUDUL WAJIB SINGKAT, BERUPA KALIMAT UTUH, DAN TANPA TITIK DUA (":"):
   - Panjang maksimal 50–60 karakter (6–9 kata).
   - DILARANG KERAS memakai titik dua (":"), garis vertikal ("|"), atau tanda pisah ("—") di dalam judul.
   - Contoh BENAR: "Perbedaan Mesin UV Flatbed dan UV DTF untuk Merchandise", "Panduan Memilih Mesin Digital Printing 3,2 Meter untuk Pemula".
${forbidTroubleshooting ? '3. DILARANG membuat judul berawalan "Cara Mengatasi...".' : ''}
4. DILARANG menyebut merek kompetitor.

Keluarkan HANYA JSON valid:
{
  "keyword_analysis": {
    "primary_keyword": "keyword utama target",
    "secondary_keywords": ["keyword 1", "keyword 2", "keyword 3"],
    "search_intent": "Commercial / Informational",
    "people_also_ask": ["Pertanyaan 1?", "Pertanyaan 2?", "Pertanyaan 3?"]
  },
  "competitor_analysis": {
    "serp_weaknesses": "Kelemahan artikel kompetitor",
    "content_gap_to_exploit": "Celah informasi praktis yang diisi"
  },
  "opportunity_analysis": {
    "winning_angle": "Nilai tambah E-E-A-T artikel ini",
    "mandatory_data_points": ["Data riil 1", "Data riil 2", "Data riil 3"]
  },
  "discovered_title": "Judul Artikel Singkat Tanpa Titik Dua",
  "category": "${targetCategory}"
}`;

    const { res, model: usedModel } = await callGeminiAPI({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json', temperature: 0.75 + attempt * 0.05 }
    });

    if (!res.ok) throw new Error(`Gagal riset topik (${res.status}): ${await res.text()}`);
    const data = await res.json();
    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const parsed = JSON.parse(raw.trim().replace(/^```json\s*/i, '').replace(/\s*```$/i, ''));

    const topicTitle = cleanPlainText(parsed.discovered_title || '').replace(/\s*[:|—]\s*/g, ' ').replace(/\s+/g, ' ').trim();
    const primaryKw = parsed.keyword_analysis?.primary_keyword || '';

    if (COMPETITOR_BRANDS.some((c) => topicTitle.toLowerCase().includes(c) || primaryKw.toLowerCase().includes(c))) {
      rejectedTopicsHistory.push({ title: topicTitle, reason: 'Mengandung merek kompetitor' });
      continue;
    }

    const progCheck = checkTopicDuplicationInStrapi({ ...parsed, discovered_title: topicTitle }, existingArticles);
    if (progCheck.isDuplicate) {
      rejectedTopicsHistory.push({ title: topicTitle, reason: progCheck.reason });
      candidateProduct = null;
      continue;
    }

    logMessage(`🎯 Topik Lolos (${usedModel}): "${topicTitle}" | Keyword: "${primaryKw}"`);
    return {
      title: topicTitle,
      category: parsed.category || targetCategory,
      focusProduct: candidateProduct,
      seoBrief: parsed
    };
  }

  throw new Error(`Tidak ditemukan topik bebas duplikat setelah ${MAX_ATTEMPTS} percobaan.`);
}

function buildSystemPrompt(
  catalog,
  existingArticles,
  focusProduct = null,
  seoBrief = null,
  backlinkTargets = { includeMp: false, includeMpj: false }
) {
  const eligibleCatalog = catalog.filter(isProductEligibleForArticle);
  const catalogContext =
    eligibleCatalog.length > 0
      ? eligibleCatalog.slice(0, 25).map((c) => `- ${c.name} (/produk/${c.routeCategory}/${c.slug})`).join('\n')
      : `- Mesin Digital Printing Outdoor (/produk/outdoor)\n- Mesin UV Printing (/produk/uv)\n- Mesin Sublimasi (/produk/sublimasi)\n- Mesin Laser & CNC (/produk/laser)`;

  const articlesContext =
    existingArticles.length > 0
      ? existingArticles.slice(0, 15).map((a) => `- "${a.title}" (/artikel/${a.slug})`).join('\n')
      : '- Belum ada artikel terkait.';

  let seoBriefSection = '';
  if (seoBrief) {
    const kw = seoBrief.keyword_analysis || {};
    const opp = seoBrief.opportunity_analysis || {};
    seoBriefSection = `
BRIEF SEO & E-E-A-T:
- Primary Keyword: "${kw.primary_keyword || ''}"
- Secondary Keywords: ${(kw.secondary_keywords || []).join(', ')}
- FAQ Wajib: ${(kw.people_also_ask || []).join(' | ')}
- Winning Angle: ${opp.winning_angle || '-'} (${(opp.mandatory_data_points || []).join(', ')})
`;
  }

  const productSpotlightSection = focusProduct
    ? `
FOKUS PRODUK ORIA:
- Nama: ${focusProduct.name} (/produk/${focusProduct.routeCategory}/${focusProduct.slug})
- Sertakan spesifikasi teknis dalam <table> ringkas, estimasi HPP/ROI usaha, dan tautan natural <a href="/produk/${focusProduct.routeCategory}/${focusProduct.slug}">${focusProduct.name}</a>.
`
    : '';

  const backlinkRules = [];
  if (backlinkTargets.includeMp) {
    backlinkRules.push(
      `- Sertakan 1 tautan external DOFOLLOW yang natural ke https://mesinprinting.id:\n  <a href="https://mesinprinting.id" target="_blank" rel="dofollow">mesin digital printing</a> (atau variasi anchor relevan seperti "distributor mesin digital printing").`
    );
  }
  if (backlinkTargets.includeMpj) {
    backlinkRules.push(
      `- Sertakan 1 tautan external DOFOLLOW yang natural ke https://mesinprintingjersey.id:\n  <a href="https://mesinprintingjersey.id" target="_blank" rel="dofollow">mesin printing jersey</a> (atau variasi anchor relevan seperti "mesin sublimasi jersey").`
    );
  }
  const backlinkSection =
    backlinkRules.length > 0
      ? `\nATURAN BACKLINK DOFOLLOW EKOSISTEM (WAJIB MINGGUAN):\n${backlinkRules.join('\n')}\n- Sisipkan secara alami di dalam paragraf isi artikel.`
      : `\nATURAN BACKLINK:\n- Kuota backlink mingguan ke mesinprinting.id dan mesinprintingjersey.id sudah terpenuhi minggu ini; fokus pada internal link oria.co.id.`;

  return `Anda adalah Senior Technical Writer & Praktisi Digital Printing Industri (10+ tahun pengalaman lapangan) untuk ORIA Printing Indonesia (oria.co.id).
${seoBriefSection}${productSpotlightSection}${backlinkSection}
STANDAR WAJIB GOOGLE E-E-A-T + RINGKAS PADAT:
1. **PANJANG KONTEN PROPORSIONAL (600–850 KATA SAJA)**: Singkat, padat, langsung ke inti pembahasan, tanpa basa-basi bertele-tele. Setiap paragraf maksimal 2–4 kalimat.
2. **JUDUL TANPA TITIK DUA (":")**: \`title\` dan \`seo_title\` WAJIB maksimal 50–60 karakter (6–9 kata), berupa kalimat natural utuh, dan DILARANG KERAS mengandung tanda titik dua (":"), "|", atau "—".
3. **EXPERIENCE & EXPERTISE NYATA**: Sertakan angka teknis konkret di lapangan (kecepatan m²/jam, jenis printhead, daya listrik Watt, suhu/kelembaban ruang kerja 45–65% RH, jadwal maintenance, estimasi HPP/ROI).
4. **ATOMIC ANSWER & TABEL**: Di bawah \`<h2>\` pertama, berikan jawaban ringkas 35–50 kata yang langsung menjawab topik. Sertakan 1 \`<table>\` HTML ringkas (\`<thead>\` & \`<tbody>\`).
5. **AUTHORITATIVENESS (INTERNAL LINK)**: Sisipkan 2–3 tautan internal natural ke artikel/produk oria.co.id berikut:
Artikel terkait:
${articlesContext}
Katalog produk:
${catalogContext}
6. **TRUSTWORTHINESS & FAQ**: Objektif (jelaskan kelebihan & hal teknis yang perlu diperhatikan) dan sertakan bagian \`<h2>Pertanyaan yang Sering Diajukan (FAQ)</h2>\` berisi 3 tanya jawab teknis (\`<h3>...</h3><p>...</p>\`).
7. **LARANGAN MUTLAK**: Dilarang menyebut merek kompetitor, dilarang memakai kata "calender" (gunakan "mesin heat press roll"), dan dilarang memakai HTML entity pada metadata JSON.`;
}

async function generateArticle(topicData, catalog, existingArticles, backlinkTargets = { includeMp: false, includeMpj: false }) {
  if (!GEMINI_API_KEY) throw new Error('GEMINI_API_KEY_BOT_GENERATE / GEMINI_API_KEY belum disetel di .env!');

  const systemPrompt = buildSystemPrompt(catalog, existingArticles, topicData.focusProduct, topicData.seoBrief, backlinkTargets);
  const userPrompt = `Tulis artikel SEO & E-E-A-T ringkas padat (600–850 kata) untuk ORIA Printing Indonesia:
- Judul: "${topicData.title}"
- Kategori: "${topicData.category}"
${topicData.seoBrief?.keyword_analysis?.primary_keyword ? `- Primary Keyword: "${topicData.seoBrief.keyword_analysis.primary_keyword}"` : ''}
Keluarkan hasil dalam JSON valid sesuai schema.`;

  const requestBody = {
    contents: [{ role: 'user', parts: [{ text: `${systemPrompt}\n\n---\n\n${userPrompt}` }] }],
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'OBJECT',
        properties: {
          title: { type: 'STRING' },
          slug: { type: 'STRING' },
          excerpt: { type: 'STRING' },
          category: { type: 'STRING', enum: ['Business', 'Digital Print', 'Insight', 'Product', 'Trivia'] },
          tags: { type: 'STRING' },
          reading_time: { type: 'STRING' },
          seo_title: { type: 'STRING' },
          seo_description: { type: 'STRING' },
          seo_keywords: { type: 'STRING' },
          content: { type: 'STRING' }
        },
        required: ['title', 'slug', 'excerpt', 'category', 'tags', 'reading_time', 'seo_title', 'seo_description', 'seo_keywords', 'content']
      },
      temperature: 0.7,
      maxOutputTokens: 16384
    }
  };

  logMessage(`🤖 Mengirim request ke Gemini (${GEMINI_MODEL}) untuk: "${topicData.title}"...`);
  const { res: response, model: usedModel } = await callGeminiAPI(requestBody);
  if (!response || !response.ok) {
    throw new Error(`Gemini API Error (${response?.status || 'Unknown'}): ${response ? await response.text() : 'No response'}`);
  }

  const result = await response.json();
  const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) throw new Error('Gemini tidak mengembalikan teks konten!');

  const parsed = JSON.parse(rawText.trim().replace(/^```json\s*/i, '').replace(/\s*```$/i, ''));
  parsed.title = cleanPlainText(parsed.title).replace(/\s*[:|—]\s*/g, ' ').replace(/\s+/g, ' ').trim();
  parsed.seo_title = cleanPlainText(parsed.seo_title).replace(/\s*[:|—]\s*/g, ' ').replace(/\s+/g, ' ').trim();
  parsed.seo_description = cleanPlainText(parsed.seo_description);
  parsed.seo_keywords = cleanPlainText(parsed.seo_keywords);
  parsed.excerpt = cleanPlainText(parsed.excerpt);
  parsed.tags = cleanPlainText(parsed.tags);
  parsed.reading_time = String(parsed.reading_time || '4').replace(/[^0-9]/g, '') || '4';
  parsed.slug = cleanPlainText(parsed.slug).toLowerCase().replace(/&+/g, 'dan').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  if (parsed.content) parsed.content = parsed.content.replace(/\bcalender\b/gi, 'roll');

  // Ensure scheduled dofollow backlinks are present in HTML content
  if (backlinkTargets.includeMp && parsed.content && !parsed.content.includes('mesinprinting.id')) {
    parsed.content = parsed.content.replace(
      /(mesin digital printing)/i,
      '<a href="https://mesinprinting.id" target="_blank" rel="dofollow">$1</a>'
    );
    if (!parsed.content.includes('mesinprinting.id')) {
      parsed.content += `<p>Untuk referensi kebutuhan lini produksi komersial yang lebih luas, Anda dapat meninjau pilihan <a href="https://mesinprinting.id" target="_blank" rel="dofollow">mesin digital printing</a> bergaransi resmi di Indonesia.</p>`;
    }
  }
  if (backlinkTargets.includeMpj && parsed.content && !parsed.content.includes('mesinprintingjersey.id')) {
    parsed.content = parsed.content.replace(
      /(mesin printing jersey|mesin sublimasi)/i,
      '<a href="https://mesinprintingjersey.id" target="_blank" rel="dofollow">$1</a>'
    );
    if (!parsed.content.includes('mesinprintingjersey.id')) {
      parsed.content += `<p>Untuk lini produksi khusus konveksi olahraga dan tekstil, Anda juga dapat mempelajari solusi <a href="https://mesinprintingjersey.id" target="_blank" rel="dofollow">mesin printing jersey</a> siap pakai untuk skala UMKM hingga pabrik.</p>`;
    }
  }

  if (topicData.focusProduct || topicData.category === 'Product') parsed.category = 'Product';

  logMessage(`✅ Gemini (${usedModel}) selesai membuat artikel: "${parsed.title}"`);
  return parsed;
}

async function injectDraftToStrapi(articleData, existingArticles = []) {
  const dupCheck = checkTopicDuplicationInStrapi(
    { discovered_title: articleData.title, keyword_analysis: { primary_keyword: articleData.seo_keywords?.split(',')[0] || '' } },
    existingArticles
  );
  if (dupCheck.isDuplicate) throw new Error(`Dibatalkan Pre-Flight Guard (duplikat): ${dupCheck.reason}`);

  const VALID_CATEGORIES = ['Business', 'Digital Print', 'Insight', 'Product', 'Trivia'];
  const category = VALID_CATEGORIES.includes(articleData.category) ? articleData.category : 'Insight';
  const safeTrunc = (str, maxLen = 250, commaList = false) => {
    const s = cleanPlainText(String(str || ''));
    if (s.length <= maxLen) return s;
    const cut = s.substring(0, commaList ? maxLen : maxLen - 3);
    const idx = cut.lastIndexOf(commaList ? ',' : ' ');
    return (idx > 20 ? cut.substring(0, idx) : cut).trim() + (commaList ? '' : '...');
  };

  const payload = {
    data: {
      title: safeTrunc(articleData.title, 250),
      slug: articleData.slug.substring(0, 200).replace(/-+$/, ''),
      excerpt: safeTrunc(articleData.excerpt, 250),
      author: 'Tim Editorial ORIA',
      category,
      tags: safeTrunc(articleData.tags || 'mesin digital printing, oria, percetakan industri', 250, true),
      reading_time: articleData.reading_time,
      seo_title: safeTrunc(articleData.seo_title || articleData.title, 250),
      seo_description: safeTrunc(articleData.seo_description || articleData.excerpt, 250),
      seo_keywords: safeTrunc(articleData.seo_keywords || '', 250, true),
      content: articleData.content,
      publishedAt: null
    }
  };

  const response = await fetch(`${STRAPI_URL}/api/articles?status=draft`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {})
    },
    body: JSON.stringify(payload)
  });

  if (response.ok) {
    const resJson = await response.json();
    logMessage(`🎉 SUKSES! Draft artikel disimpan di Strapi ORIA: "${payload.data.title}" (${payload.data.slug})`);
    return resJson;
  }

  const errTxt = await response.text();
  logMessage(`⚠️ REST API Strapi (${response.status}): ${errTxt}. Mencoba fallback DB lokal...`);

  const mysql = await import('mysql2/promise');
  const conn = await mysql.createConnection({ host: DB_HOST, port: DB_PORT, user: DB_USER, password: DB_PASS, database: DB_NAME });
  const documentId = crypto.randomBytes(12).toString('hex');
  const now = new Date();
  await conn.query(
    `INSERT INTO articles (document_id, title, slug, content, excerpt, author, category, tags, reading_time, seo_title, seo_description, seo_keywords, created_at, updated_at, published_at, locale)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, 'en')`,
    [
      documentId, payload.data.title, payload.data.slug, payload.data.content, payload.data.excerpt,
      payload.data.author, payload.data.category, payload.data.tags, payload.data.reading_time,
      payload.data.seo_title, payload.data.seo_description, payload.data.seo_keywords, now, now
    ]
  );
  await conn.end();
  logMessage(`🎉 SUKSES! Draft disimpan via DB fallback (Document ID: ${documentId}).`);
  return { documentId };
}

async function main() {
  logMessage('==================================================================');
  logMessage('🚀 AUTONOMOUS SEO, GEO & E-E-A-T ARTICLE BOT — ORIA.CO.ID (3x/MG)');
  logMessage('==================================================================');

  const args = process.argv.slice(2);
  let batchCount = 1;
  let customTopic = '';
  let dryRun = false;
  let forceRun = false;
  let forcedPillar = '';

  args.forEach((arg) => {
    if (arg.startsWith('--count=')) batchCount = parseInt(arg.replace('--count=', ''), 10) || 1;
    else if (arg.startsWith('--topic=')) { customTopic = arg.replace('--topic=', '').trim().replace(/^['"]|['"]$/g, ''); batchCount = 1; }
    else if (arg.startsWith('--pillar=')) forcedPillar = arg.replace('--pillar=', '').trim();
    else if (arg === '--dry-run') dryRun = true;
    else if (arg === '--force') forceRun = true;
  });

  const dayInfo = getJakartaDayInfo();
  if (!dayInfo.isScheduledDay && !forceRun && !dryRun && !customTopic) {
    logMessage(`⏭️ [JADWAL SENIN, RABU & JUMAT] Hari ini ${dayInfo.dayName}. Gunakan --force untuk menjalankan manual.`);
    return;
  }

  const catalog = await getProductsCatalog();
  const existingArticles = await getExistingArticles();

  const weeklyStats = getWeeklyArticleStats(existingArticles);
  if (!forceRun && !dryRun && !customTopic && weeklyStats.thisWeekCount >= 3) {
    logMessage(`⏭️ [KUOTA MINGGUAN TERPENUHI] Minggu ini sudah ada ${weeklyStats.thisWeekCount} artikel.`);
    return;
  }

  for (let i = 0; i < batchCount; i++) {
    try {
      const topicToProcess = customTopic
        ? { title: customTopic, category: forcedPillar || 'Insight', focusProduct: null, seoBrief: null }
        : await discoverAutonomousTopic(existingArticles, catalog, forcedPillar);

      const currentStats = getWeeklyArticleStats(existingArticles);
      const backlinkTargets = getBacklinkTargetsForRun(currentStats, dayInfo.dayIndex, topicToProcess.title);
      logMessage(
        `🔗 Backlink mingguan — mesinprinting.id: ${currentStats.hasBacklinkMpThisWeek ? 'SUDAH' : backlinkTargets.includeMp ? 'SISIPKAN' : 'TUNDA'} | mesinprintingjersey.id: ${currentStats.hasBacklinkMpjThisWeek ? 'SUDAH' : backlinkTargets.includeMpj ? 'SISIPKAN' : 'TUNDA'}`
      );

      const article = await generateArticle(topicToProcess, catalog, existingArticles, backlinkTargets);
      if (dryRun) {
        logMessage(`✅ [DRY-RUN] Judul: ${article.title} | Slug: ${article.slug} | Kategori: ${article.category}`);
      } else {
        await injectDraftToStrapi(article, existingArticles);
      }

      const contentLower = (article.content || '').toLowerCase();
      existingArticles.push({
        title: article.title,
        slug: article.slug,
        category: article.category,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        hasBacklinkMp: contentLower.includes('mesinprinting.id'),
        hasBacklinkMpj: contentLower.includes('mesinprintingjersey.id')
      });
    } catch (e) {
      logMessage(`❌ Error: ${e.message}`);
    }
  }
}

main().catch((err) => {
  logMessage(`FATAL ERROR: ${err.message}`);
  process.exit(1);
});
