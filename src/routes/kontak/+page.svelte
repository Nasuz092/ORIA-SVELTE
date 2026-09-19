<script lang="ts">
  import { page } from '$app/state';

  let nama = $state('');
  let phone = $state('');
  let unitMesin = $state(page.url.searchParams.get('unit') || '');
  let pesan = $state('');
  let submitted = $state(false);

  function handleSubmit(e: Event) {
    e.preventDefault();
    submitted = true;
    const text = encodeURIComponent(
      `Halo ORIA, saya tertarik berkonsultasi mengenai mesin.\nNama: ${nama}\nNo. Telp/WA: ${phone}\nUnit yang diminati: ${unitMesin}\nPesan: ${pesan}`
    );
    window.open(`https://wa.me/6281252086455?text=${text}`, '_blank');
  }
</script>

<svelte:head>
  <title>Kontak & Showroom - ORIA</title>
  <meta name="description" content="Hubungi tim penjualan dan teknis ORIA untuk konsultasi mesin, penawaran harga, dan jadwal demo showroom." />
</svelte:head>

<div class="w-full bg-white text-black py-16 lg:py-24 px-6 lg:px-12">
  <div class="max-w-5xl mx-auto space-y-16">
    <!-- Header -->
    <div class="space-y-4">
      <div class="font-sans font-bold text-xs uppercase tracking-widest text-black">
        Hubungi Kami
      </div>
      <h1 class="font-heading font-black text-4xl sm:text-5xl tracking-tighter text-black">
        Konsultasi & Kunjungan Showroom
      </h1>
      <p class="font-sans text-base sm:text-lg text-black max-w-2xl leading-relaxed">
        Silakan isi formulir di bawah ini atau hubungi tim customer relation kami secara langsung via WhatsApp untuk respon cepat.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
      <!-- Contact Form -->
      <div class="space-y-6">
        <h2 class="font-heading font-bold text-2xl text-black">
          Formulir Permintaan Penawaran
        </h2>

        {#if submitted}
          <div class="p-6 bg-white space-y-2">
            <div class="font-heading font-bold text-lg text-black">Terima Kasih!</div>
            <p class="font-sans text-sm text-black">Pesan Anda sedang diteruskan ke tim WhatsApp resmi ORIA.</p>
          </div>
        {:else}
          <form onsubmit={handleSubmit} class="space-y-5">
            <div>
              <label for="nama" class="font-sans font-bold text-xs uppercase tracking-widest block mb-2 text-black">
                Nama Lengkap / Perusahaan *
              </label>
              <input
                id="nama"
                type="text"
                required
                bind:value={nama}
                placeholder="Contoh: Budi Santoso / CV Maju Jaya"
                class="w-full bg-white text-black text-sm p-3 border-b-2 border-black focus:outline-none placeholder:text-black placeholder:opacity-40"
              />
            </div>

            <div>
              <label for="phone" class="font-sans font-bold text-xs uppercase tracking-widest block mb-2 text-black">
                Nomor WhatsApp / Telepon *
              </label>
              <input
                id="phone"
                type="tel"
                required
                bind:value={phone}
                placeholder="Contoh: 081234567890"
                class="w-full bg-white text-black text-sm p-3 border-b-2 border-black focus:outline-none placeholder:text-black placeholder:opacity-40"
              />
            </div>

            <div>
              <label for="unit" class="font-sans font-bold text-xs uppercase tracking-widest block mb-2 text-black">
                Unit Mesin yang Diminati
              </label>
              <input
                id="unit"
                type="text"
                bind:value={unitMesin}
                placeholder="Contoh: Mesin DTG A3 / Mesin UV Flatbed / Lainnya"
                class="w-full bg-white text-black text-sm p-3 border-b-2 border-black focus:outline-none placeholder:text-black placeholder:opacity-40"
              />
            </div>

            <div>
              <label for="pesan" class="font-sans font-bold text-xs uppercase tracking-widest block mb-2 text-black">
                Pesan / Kebutuhan Produksi
              </label>
              <textarea
                id="pesan"
                rows="4"
                bind:value={pesan}
                placeholder="Tuliskan kebutuhan usaha Anda, estimasi kapasitas harian, atau pertanyaan spesifikasi..."
                class="w-full bg-white text-black text-sm p-3 border-b-2 border-black focus:outline-none placeholder:text-black placeholder:opacity-40"
              ></textarea>
            </div>

            <div class="pt-2">
              <button
                type="submit"
                class="bg-black text-white px-8 py-4 text-xs font-semibold uppercase tracking-widest hover:opacity-85 transition-opacity"
              >
                Kirim via WhatsApp
              </button>
            </div>
          </form>
        {/if}
      </div>

      <!-- Info Lokasi & Kontak Langsung -->
      <div class="space-y-8">
        <h2 class="font-heading font-bold text-2xl text-black">
          Informasi Showroom & Kontak
        </h2>

        <div class="space-y-6 font-sans text-sm text-black leading-relaxed">
          <div class="space-y-1">
            <div class="font-bold uppercase text-xs tracking-wider">Layanan Pelanggan WhatsApp</div>
            <div>+62 812-5208-6455</div>
            <div class="text-xs">Respon cepat hari kerja: 08:30 - 17:00 WIB</div>
          </div>

          <div class="space-y-1">
            <div class="font-bold uppercase text-xs tracking-wider">Email Resmi</div>
            <div>sales@oria.com / support@oria.com</div>
          </div>

          <div class="space-y-1">
            <div class="font-bold uppercase text-xs tracking-wider">Showroom Utama Surabaya</div>
            <div>Jl. Raya Rungkut Industri No. 45, Surabaya, Jawa Timur</div>
          </div>

          <div class="space-y-1">
            <div class="font-bold uppercase text-xs tracking-wider">Branch & Demo Center Jakarta</div>
            <div>Sentra Bisnis Daan Mogot, Jakarta Barat, DKI Jakarta</div>
          </div>

          <div class="space-y-1">
            <div class="font-bold uppercase text-xs tracking-wider">Jam Operasional</div>
            <div>Senin – Jumat: 08.30 – 17.00 WIB</div>
            <div>Sabtu: 08.30 – 15.00 WIB</div>
            <div>Minggu & Hari Libur Nasional: Tutup (Tetap menerima pesan via WA)</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
