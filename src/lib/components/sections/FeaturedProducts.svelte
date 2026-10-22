<script lang="ts">
  import { onMount } from 'svelte';
  import { fetchOriaProducts, getStrapiMediaUrl } from '$lib/api/products';
  import type { FormattedProduct } from '$lib/types/product';

  // Curated initial defaults with exact Strapi slugs & images
  let featured: FormattedProduct[] = $state([
    {
      id: 1604,
      name: 'Mesin DTG ORIA OR-DTG02 One Station 8 Warna',
      slug: 'mesin-dtg-oria-or-dtg02-one-station',
      sku: 'ASM-ORIA-1307',
      brand: 'ORIA',
      categoryName: 'Digital Textile',
      categorySlug: 'mesin-dtg',
      shortDescription: '2x Epson i3200HD • Area Cetak 400x500mm • Speed 1.5 min/pcs • Pigment Ink',
      descriptionHtml: '',
      priceText: 'Rp 185.000.000',
      imageUrl: getStrapiMediaUrl('/uploads/Image_Web_15_3a84218806.webp'),
      galleryUrls: [],
      isFeatured: true,
      whatsappMessage: 'Halo ORIA, saya tertarik dengan Mesin DTG ORIA OR-DTG02 One Station'
    },
    {
      id: 1771,
      name: 'Mesin UV Flatbed ORIA A3 High Speed',
      slug: 'mesin-uv-flatbed-oria-a3',
      sku: 'ASM-ORIA-140801',
      brand: 'ORIA',
      categoryName: 'UV Flatbed',
      categorySlug: 'mesin-uv-flatbed',
      shortDescription: 'Epson i3200-U1 • Media Datar & Tumbler Silinder • Varnish & White Gloss',
      descriptionHtml: '',
      priceText: 'Hubungi Sales',
      imageUrl: getStrapiMediaUrl('/uploads/Mesin_UV_Flatbed_Oria_A3_ec3177e421.webp'),
      galleryUrls: [],
      isFeatured: true,
      whatsappMessage: 'Halo ORIA, saya tertarik dengan Mesin UV Flatbed ORIA A3'
    },
    {
      id: 1780,
      name: 'Mesin Fiber Laser Cutting Oria 3015 Potong Plat Besi',
      slug: 'mesin-fiber-laser-cutting-oria-3015-potong-plat-besi',
      sku: 'ASM-ORIA-1301',
      brand: 'ORIA',
      categoryName: 'Laser Cutting',
      categorySlug: 'mesin-laser-engrave-cnc',
      shortDescription: '3000x1500mm Bed • Raycus Laser Power • Potong Plat Logam & Stainless Steel',
      descriptionHtml: '',
      priceText: 'Hubungi Sales',
      imageUrl: getStrapiMediaUrl('/uploads/Teks_8_766cf7c29a.webp'),
      galleryUrls: [],
      isFeatured: true,
      whatsappMessage: 'Halo ORIA, saya tertarik dengan Mesin Fiber Laser Cutting ORIA 3015'
    },
    {
      id: 1783,
      name: 'Mesin CNC Router Oria 1325 with Spindle 3100 W',
      slug: 'mesin-cnc-router-oria-1325',
      sku: 'ASM-ORIA-1179',
      brand: 'ORIA',
      categoryName: 'CNC Router',
      categorySlug: 'mesin-laser-engrave-cnc',
      shortDescription: 'Working Area 1300x2500mm • Spindle 3.1 kW • DSP System • Vacuum Table Bed',
      descriptionHtml: '',
      priceText: 'Hubungi Sales',
      imageUrl: getStrapiMediaUrl('/uploads/Mesin_CNC_Oria_1325_87a9abea29.webp'),
      galleryUrls: [],
      isFeatured: true,
      whatsappMessage: 'Halo ORIA, saya tertarik dengan Mesin CNC Router ORIA 1325'
    }
  ]);

  onMount(async () => {
    try {
      const prods = await fetchOriaProducts();
      if (prods && prods.length > 0) {
        // Find featured products or pick top distinct categories
        const selected = prods.filter(p => [
          'mesin-dtg-oria-or-dtg02-one-station',
          'mesin-uv-flatbed-oria-a3',
          'mesin-fiber-laser-cutting-oria-3015-potong-plat-besi',
          'mesin-cnc-router-oria-1325'
        ].includes(p.slug));

        if (selected.length > 0) {
          featured = selected;
        }
      }
    } catch (e) {
      // Keep defaults
    }
  });
</script>

<section class="w-full bg-white text-black py-20 px-6 sm:px-8 border-t border-gray-100">
  <div class="w-full space-y-12">
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div class="space-y-2">
        <div class="font-sans font-bold text-xs uppercase tracking-widest text-black">
          Unggulan Industri
        </div>
        <h2 class="font-heading font-extrabold text-3xl sm:text-4xl tracking-tight text-black">
          Mesin Pilihan Produksi Massal
        </h2>
      </div>
      <a href="/produk" class="font-sans font-semibold text-xs uppercase tracking-widest hover:underline flex items-center gap-1">
        Lihat Semua Mesin ({featured.length > 0 ? '30+' : ''})
        <svg class="w-4 h-4 stroke-black" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each featured as p}
        <div class="group flex flex-col bg-white border border-gray-200 hover:border-black transition-colors overflow-hidden">
          <!-- Image Container -->
          <a
            href="/produk/{p.slug}"
            class="aspect-[4/3] bg-neutral-50 flex items-center justify-center p-4 border-b border-gray-100 overflow-hidden"
          >
            <img
              src={p.imageUrl}
              alt={p.name}
              class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 ease-out"
              loading="lazy"
            />
          </a>

          <!-- Details -->
          <div class="p-5 flex-1 flex flex-col justify-between space-y-3">
            <div class="space-y-1.5">
              <div class="font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500">
                {p.categoryName} • {p.sku}
              </div>
              <h3 class="font-heading font-bold text-base text-black group-hover:underline leading-snug line-clamp-2">
                <a href="/produk/{p.slug}">
                  {p.name}
                </a>
              </h3>
              {#if p.shortDescription}
                <p class="font-sans text-xs text-gray-600 line-clamp-2 leading-relaxed">
                  {p.shortDescription}
                </p>
              {/if}
            </div>

            <div class="pt-2 border-t border-gray-100 flex items-center justify-between">
              <span class="font-sans font-bold text-xs text-black">
                {p.priceText}
              </span>
              <a
                href="/produk/{p.slug}"
                class="font-sans font-bold text-xs uppercase tracking-wider text-black hover:underline inline-flex items-center gap-1"
              >
                Detail
                <svg class="w-3.5 h-3.5 stroke-black" fill="none" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
