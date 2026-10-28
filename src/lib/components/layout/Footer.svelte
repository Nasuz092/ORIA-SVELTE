<script lang="ts">
  import { onMount } from 'svelte';

  function scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const scrollContainer = document.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  function handleCtaClick(e: MouseEvent) {
    if (typeof window !== 'undefined' && window.location.pathname === '/') {
      e.preventDefault();
      scrollToTop();
    }
  }

  interface LanguageOption {
    code: string;
    label: string;
    flag: string;
  }

  const languages: LanguageOption[] = [
    { code: 'id', label: 'Indonesia (ID)', flag: '🇮🇩' },
    { code: 'en', label: 'English (EN)', flag: '🇬🇧' },
    { code: 'zh-CN', label: 'Chinese (ZH)', flag: '🇨🇳' },
    { code: 'ja', label: 'Japanese (JA)', flag: '🇯🇵' },
    { code: 'ar', label: 'Arabic (AR)', flag: '🇸🇦' }
  ];

  let isLangOpen = $state(false);
  let selectedLang = $state('Indonesia (ID)');
  let selectedCode = $state('id');

  function toggleLang() {
    isLangOpen = !isLangOpen;
  }

  function closeLang() {
    isLangOpen = false;
  }

  function changeLanguage(lang: LanguageOption) {
    selectedLang = lang.label;
    selectedCode = lang.code;
    isLangOpen = false;

    if (typeof window === 'undefined') return;

    const host = window.location.hostname;
    if (lang.code === 'id') {
      const expire = 'expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = `googtrans=; ${expire}`;
      document.cookie = `googtrans=; ${expire} domain=${host};`;
      document.cookie = `googtrans=; ${expire} domain=.${host};`;
      if (!/^\d+\.\d+\.\d+\.\d+$/.test(host)) {
        const rootDomain = host.replace(/^www\./, '');
        document.cookie = `googtrans=; ${expire} domain=.${rootDomain};`;
      }
      const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
      if (select) {
        select.value = '';
        select.dispatchEvent(new Event('change'));
      }
      window.dispatchEvent(new CustomEvent('language-change', { detail: 'id' }));
      window.location.reload();
      return;
    } else {
      document.cookie = `googtrans=/id/${lang.code}; path=/;`;
      document.cookie = `googtrans=/id/${lang.code}; path=/; domain=${host};`;
      if (!/^\d+\.\d+\.\d+\.\d+$/.test(host)) {
        document.cookie = `googtrans=/id/${lang.code}; path=/; domain=.${host.replace(/^www\./, '')};`;
      }
      const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
      if (select) {
        select.value = lang.code;
        select.dispatchEvent(new Event('change'));
      } else {
        window.location.reload();
      }
    }
    window.dispatchEvent(new CustomEvent('language-change', { detail: lang.code }));
  }

  onMount(() => {
    if (typeof document !== 'undefined') {
      const match = document.cookie.match(/googtrans=\/id\/([a-zA-Z-]+)/);
      if (match && match[1]) {
        const found = languages.find((l) => l.code === match[1]);
        if (found) {
          selectedLang = found.label;
          selectedCode = found.code;
        }
      }

      function onGlobalLang(e: Event) {
        const ce = e as CustomEvent<string>;
        if (ce.detail) {
          const found = languages.find((l) => l.code === ce.detail);
          if (found) {
            selectedLang = found.label;
            selectedCode = found.code;
          }
        }
      }
      window.addEventListener('language-change', onGlobalLang);

      (window as any).googleTranslateElementInit = function () {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: 'id',
            includedLanguages: 'id,en,zh-CN,ja,ar',
            autoDisplay: false
          },
          'google_translate_element'
        );
      };

      if (!document.getElementById('google-translate-script')) {
        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.type = 'text/javascript';
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.body.appendChild(script);
      }

      // Aggressively suppress Google Translate banner and body push
      const killBanner = () => {
        const banners = document.querySelectorAll<HTMLElement>(
          '.goog-te-banner-frame, iframe.skiptranslate, .VIpgJd-ZVi9od-aZ2wEe-wOHMyf, .VIpgJd-ZVi9od-xl07Ob-OEVmcd, [id*=":1.container"], [id*=":2.container"]'
        );
        banners.forEach((b) => {
          b.style.setProperty('display', 'none', 'important');
          b.style.setProperty('visibility', 'hidden', 'important');
          b.style.setProperty('height', '0px', 'important');
        });
        if (document.body.style.top && document.body.style.top !== '0px') {
          document.body.style.setProperty('top', '0px', 'important');
        }
      };

      killBanner();
      const observer = new MutationObserver(killBanner);
      observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['style'] });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style', 'class'] });

      return () => observer.disconnect();
    }
  });
</script>

<footer class="w-full bg-black text-white pt-16 sm:pt-20 lg:pt-24 pb-0 select-none px-6 sm:px-10 lg:px-16">
  <!-- Top Center Yellow CTA Logo Badge Intersecting Yellow Horizontal Divider -->
  <div class="relative w-full max-w-7xl mx-auto mb-16 sm:mb-20 lg:mb-24">
    <!-- Thin Yellow Divider Line -->
    <div class="w-full border-t border-[#FFE500]"></div>

    <!-- Centered Circular ORIA Logo Badge (Replacing Lotus Emblem CTA) -->
    <div class="absolute left-1/2 -translate-x-1/2 -top-9 sm:-top-11 z-20">
      <a
        href="/"
        onclick={handleCtaClick}
        class="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-[#FFE500] border-2 border-black/40 flex items-center justify-center p-3.5 sm:p-4 shadow-[0_0_35px_rgba(255,229,0,0.35)] hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer focus:outline-none"
        aria-label="ORIA Home & Kembali ke Atas"
      >
        <img
          src="/images/oria-logo-hd.png"
          alt="ORIA"
          class="w-full h-auto object-contain brightness-0 group-hover:scale-105 transition-transform duration-300"
        />
      </a>
    </div>
  </div>

  <!-- Main Footer Content (Social Links, Models Column, About ORIA Column) -->
  <div class="max-w-7xl mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-16 sm:pb-20">
      <!-- Left Column: Circular Social Media Icons -->
      <div class="md:col-span-5 lg:col-span-5 flex flex-col justify-end">
        <div class="flex items-center gap-3 sm:gap-4">
          <!-- Facebook -->
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            class="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-neutral-600 hover:border-[#FFE500] text-neutral-300 hover:text-[#FFE500] flex items-center justify-center transition-all duration-300 focus:outline-none"
            aria-label="Facebook ORIA"
          >
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>

          <!-- Instagram -->
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            class="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-neutral-600 hover:border-[#FFE500] text-neutral-300 hover:text-[#FFE500] flex items-center justify-center transition-all duration-300 focus:outline-none"
            aria-label="Instagram ORIA"
          >
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>

          <!-- X (Twitter) -->
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            class="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-neutral-600 hover:border-[#FFE500] text-neutral-300 hover:text-[#FFE500] flex items-center justify-center transition-all duration-300 focus:outline-none"
            aria-label="X ORIA"
          >
            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>

          <!-- YouTube -->
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            class="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-neutral-600 hover:border-[#FFE500] text-neutral-300 hover:text-[#FFE500] flex items-center justify-center transition-all duration-300 focus:outline-none"
            aria-label="YouTube ORIA"
          >
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Center Column: MODELS -->
      <div class="md:col-span-3 lg:col-span-3 space-y-4">
        <h4 class="font-heading font-bold text-sm sm:text-base uppercase tracking-[0.22em] text-[#FFE500]">
          MODELS
        </h4>
        <ul class="space-y-2.5 font-sans text-sm sm:text-[15px] text-neutral-300">
          <li>
            <a href="/produk/uv/oria-uv-flatbed-a3" class="hover:text-[#FFE500] transition-colors">
              ORIA UV Flatbed A3
            </a>
          </li>
          <li>
            <a href="/produk/sublimasi/oria-sublim-1902" class="hover:text-[#FFE500] transition-colors">
              ORIA Sublimasi 1902
            </a>
          </li>
          <li>
            <a href="/produk/laser/oria-laser-cutting-6040" class="hover:text-[#FFE500] transition-colors">
              ORIA Laser Cutting 6040
            </a>
          </li>
          <li>
            <a href="/produk/dtf/oria-dtf-6004" class="hover:text-[#FFE500] transition-colors">
              ORIA DTF 6004 Industrial
            </a>
          </li>
          <li>
            <a href="/produk/outdoor/oria-outdoor-3204-st" class="hover:text-[#FFE500] transition-colors">
              ORIA Outdoor 3204
            </a>
          </li>
          <li>
            <a href="/produk/indoor/oria-indoor-3202" class="hover:text-[#FFE500] transition-colors">
              ORIA Indoor 3202
            </a>
          </li>
          <li>
            <a href="/produk/cnc/oria-cnc-router-1325" class="hover:text-[#FFE500] transition-colors">
              ORIA CNC Router 1325
            </a>
          </li>
        </ul>
      </div>

      <!-- Right Column: ABOUT ORIA -->
      <div class="md:col-span-4 lg:col-span-4 space-y-4">
        <h4 class="font-heading font-bold text-sm sm:text-base uppercase tracking-[0.22em] text-[#FFE500]">
          ABOUT ORIA
        </h4>
        <ul class="space-y-2.5 font-sans text-sm sm:text-[15px] text-neutral-300">
          <li>
            <a href="/tentang" class="hover:text-[#FFE500] transition-colors">
              Tentang ORIA
            </a>
          </li>
          <li>
            <a href="/tentang" class="hover:text-[#FFE500] transition-colors">
              Standar Rekayasa Presisi
            </a>
          </li>
          <li>
            <a href="/kontak" class="hover:text-[#FFE500] transition-colors">
              Showroom & Workshop
            </a>
          </li>
          <li>
            <a href="/artikel" class="hover:text-[#FFE500] transition-colors">
              Artikel & Wawasan Industri
            </a>
          </li>
          <li>
            <a href="/kontak" class="hover:text-[#FFE500] transition-colors">
              Layanan Garansi & Teknisi Resmi
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Bottom Bar with Yellow Divider Line -->
  <div class="max-w-7xl mx-auto">
    <div class="border-t border-[#FFE500] py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-neutral-400">
      <!-- Legal Links -->
      <div class="flex flex-wrap items-center justify-center sm:justify-start gap-6 sm:gap-8">
        <a href="/terms-conditions" class="hover:text-white transition-colors">
          Terms and Conditions
        </a>
        <a href="/privacy" class="hover:text-white transition-colors">
          Privacy Notice
        </a>
        <a href="/cookie-statement" class="hover:text-white transition-colors">
          Cookie Statement
        </a>
      </div>

      <!-- Country / Region Selector with Chevron (STRICT RULE: Chevrons Only, No Arrows) -->
      <div class="relative">
        <button
          type="button"
          onclick={toggleLang}
          class="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors cursor-pointer group focus:outline-none"
          aria-haspopup="listbox"
          aria-expanded={isLangOpen}
          aria-label="Pilih Bahasa"
        >
          <span class="text-xs">{selectedLang}</span>
          <div class="w-6 h-6 border border-[#FFE500] flex items-center justify-center text-[#FFE500] group-hover:bg-[#FFE500] group-hover:text-black transition-colors">
            <svg
              class="w-3.5 h-3.5 stroke-current transition-transform duration-200 {isLangOpen ? 'rotate-180' : ''}"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {#if isLangOpen}
          <!-- Backdrop to close on click outside -->
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <div
            class="fixed inset-0 z-40 bg-transparent"
            onclick={closeLang}
          ></div>

          <!-- Dropdown Menu (Opens Upward with Lotus/ORIA Premium Dark Style) -->
          <div
            class="absolute bottom-full right-0 mb-3 z-50 min-w-[170px] bg-neutral-950 border border-white/15 shadow-2xl py-1.5 rounded-none backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-200"
            role="listbox"
          >
            {#each languages as lang}
              <button
                type="button"
                onclick={() => changeLanguage(lang)}
                class="w-full text-left px-4 py-2.5 text-xs flex items-center justify-between gap-3 transition-colors cursor-pointer {selectedCode === lang.code
                  ? 'bg-[#FFE500] text-black font-bold'
                  : 'text-neutral-300 hover:bg-white/10 hover:text-[#FFE500]'}"
                role="option"
                aria-selected={selectedCode === lang.code}
              >
                <span class="flex items-center gap-2.5">
                  <span class="text-sm">{lang.flag}</span>
                  <span>{lang.label}</span>
                </span>
                {#if selectedCode === lang.code}
                  <svg class="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                {/if}
              </button>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- Hidden Google Translate Element Container -->
  <div id="google_translate_element" class="hidden" style="display:none;" aria-hidden="true"></div>
</footer>
