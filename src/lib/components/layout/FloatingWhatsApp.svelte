<script lang="ts">
  import { page } from '$app/state';

  const waNumber = process.env.WA_NUMBER || '6281252086455';

  function getDynamicWaMessage(): string {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : page.url.href;
    const pageData = page.data as Record<string, any> | undefined;
    const pathname = page.url.pathname;

    if (pageData?.product?.name) {
      const prod = pageData.product;
      const customMsg = prod.whatsappMessage || prod.whatsapp_message;
      if (customMsg && typeof customMsg === 'string') {
        return customMsg.includes('http')
          ? customMsg
          : `${customMsg}\n\nLink Produk: ${currentUrl}`;
      }
      return `Halo ORIA, saya tertarik dengan produk ${prod.name}.\n\nLink Produk: ${currentUrl}\n\nBoleh minta info harga dan spesifikasi lengkapnya?`;
    }

    if (pageData?.article?.title) {
      return `Halo ORIA, saya baru saja membaca artikel "${pageData.article.title}".\n\nLink Artikel: ${currentUrl}\n\nSaya ingin berkonsultasi lebih lanjut.`;
    }

    if (pageData?.category?.name) {
      return `Halo ORIA, saya sedang melihat kategori mesin ${pageData.category.name}.\n\nLink Kategori: ${currentUrl}\n\nBoleh rekomendasi tipe mesin terbaik?`;
    }

    if (pathname.startsWith('/tentang')) {
      return `Halo ORIA, saya ingin mengenal lebih lanjut mengenai perusahaan, showroom, dan layanan resmi ORIA.\n\nLink: ${currentUrl}`;
    }

    if (pathname.startsWith('/kontak')) {
      return `Halo ORIA, saya ingin menjadwalkan konsultasi atau kunjungan ke showroom & workshop ORIA.\n\nLink: ${currentUrl}`;
    }

    if (pathname.startsWith('/produk')) {
      return `Halo ORIA, saya sedang melihat katalog mesin ORIA dan ingin berkonsultasi untuk memilih tipe yang sesuai.\n\nLink: ${currentUrl}`;
    }

    if (pathname.startsWith('/artikel')) {
      return `Halo ORIA, saya ingin berkonsultasi mengenai informasi mesin percetakan dan industri ORIA.\n\nLink: ${currentUrl}`;
    }

    return currentUrl
      ? `Halo ORIA, saya ingin konsultasi mengenai mesin percetakan dan industri ORIA.\n\nLink: ${currentUrl}`
      : 'Halo ORIA, saya ingin konsultasi mengenai mesin percetakan dan industri ORIA.';
  }

  let waHref = $derived(`https://wa.me/${waNumber}?text=${encodeURIComponent(getDynamicWaMessage())}`);
</script>

<a
  href={waHref}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Konsultasi via WhatsApp"
  class="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 group flex items-center gap-0 hover:gap-2.5 h-12 sm:h-13 px-3 sm:px-3.5 rounded-full bg-[#1a262a]/95 hover:bg-[#25363c] text-white border border-white/20 hover:border-[#25D366]/60 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-300 cursor-pointer focus:outline-none"
>
  <span class="relative flex items-center justify-center w-6 h-6 shrink-0">
    <span class="absolute inline-flex h-full w-full rounded-full bg-[#25D366]/25 animate-ping"></span>
    <svg
      class="relative w-5 h-5 fill-[#25D366] transition-transform duration-300 group-hover:scale-110"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.59 5.96L0 24l6.31-1.65a11.87 11.87 0 0 0 5.75 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.44zM12.07 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.23-.37a9.86 9.86 0 0 1-1.51-5.27c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.46-4.44 9.9-9.9 9.9zm5.43-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.21 5.08 4.5.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z"/>
    </svg>
  </span>
  <span class="max-w-0 overflow-hidden whitespace-nowrap font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-white/95 opacity-0 group-hover:max-w-[140px] group-hover:opacity-100 group-hover:pr-1.5 transition-all duration-300 hidden sm:inline-block">
    Konsultasi WA
  </span>
</a>
