import fs from 'fs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const mysql = require('c:/Users/pc/Documents/oria.com-Strapi/node_modules/mysql2/promise');

function buildSeoTitle(slug, name) {
  if (slug === 'mesin-digital-printing-outdoor-oria-3202') {
    return `Mesin Digital Printing Harga Terjangkau — ${name}`;
  }
  if (slug === 'mesin-printing-outdoor-oria-3204-st') {
    return `Mesin Cetak Banner & Spanduk Outdoor — ${name}`;
  }
  if (slug.startsWith('mesin-printing-indoor-')) return `Mesin Printing Indoor Ecosolvent — ${name}`;
  if (slug.startsWith('mesin-uv-printing-')) return `Mesin UV Printing Flatbed — ${name}`;
  if (slug.startsWith('mesin-uv-roll-to-roll-')) return `Mesin UV Printing Roll to Roll — ${name}`;
  if (slug.startsWith('mesin-uv-laser-marking-')) return `Mesin UV Laser Marking — ${name}`;
  if (slug.startsWith('mesin-uv-cylinder-') || slug.startsWith('mesin-uv-mini-cylinder-')) {
    return `Mesin UV Printing Cylinder — ${name}`;
  }
  if (slug.startsWith('mesin-uv-dtf-')) return `Mesin UV DTF Printing — ${name}`;
  if (slug.startsWith('mesin-sublimasi-')) return `Mesin Sublimasi Textile — ${name}`;
  if (slug.startsWith('mesin-dtf-printing-')) return `Mesin DTF Printing — ${name}`;
  if (slug.startsWith('mesin-dtg-printing-')) return `Mesin DTG Printing Kaos — ${name}`;
  if (slug.startsWith('mesin-heat-press-')) return `Mesin Heat Press Industri — ${name}`;
  if (slug.startsWith('mesin-laser-marking-')) return `Mesin Laser Marking — ${name}`;
  if (slug.startsWith('mesin-laser-cutting-')) return `Mesin Laser Cutting — ${name}`;
  if (slug.startsWith('mesin-laser-galvo-')) return `Mesin Laser Galvo — ${name}`;
  if (slug.startsWith('mesin-fiber-laser-')) return `Mesin Fiber Laser Cutting — ${name}`;
  if (slug.startsWith('mesin-cnc-plasma-')) return `Mesin CNC Plasma Cutting — ${name}`;
  if (slug.startsWith('mesin-cnc-')) return `Mesin CNC Router — ${name}`;
  if (slug.startsWith('mesin-single-pass-')) return `Mesin Single Pass Karton — ${name}`;
  return `Consumable Printing — ${name}`;
}

const c = await mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  database: 'oria_strapi'
});

const [rows] = await c.query('SELECT DISTINCT slug, name FROM products ORDER BY slug');
const sqlLines = [];
let updated = 0;

for (const row of rows) {
  const newSeoTitle = buildSeoTitle(row.slug, row.name);
  const [res] = await c.query('UPDATE products SET seo_title = ? WHERE slug = ?', [newSeoTitle, row.slug]);
  updated += res.affectedRows;
  const escapedTitle = newSeoTitle.replace(/'/g, "''");
  sqlLines.push(`UPDATE products SET seo_title = '${escapedTitle}' WHERE slug = '${row.slug}';`);
}

// Update scripts/update-product-slugs.sql to include both slug + seo_title updates
const existingSql = fs.readFileSync('c:/Users/pc/Documents/oria.com-Svelte/scripts/update-product-slugs.sql', 'utf8');
const withoutCommit = existingSql.replace(/\s*COMMIT;\s*$/, '');
const combinedSql = `${withoutCommit}\n\n-- Update seo_title with category prefix\n${sqlLines.join('\n')}\nCOMMIT;\n`;

fs.writeFileSync('c:/Users/pc/Documents/oria.com-Svelte/scripts/update-product-slugs.sql', combinedSql);
fs.writeFileSync('c:/Users/pc/Documents/oria.com-Strapi/scripts/update-product-slugs.sql', combinedSql);

console.log('Updated seo_title rows:', updated);
await c.end();
