<script lang="ts">
  import type { FormattedProduct } from '$lib/types/product';

  let {
    product,
    cleanModelName
  }: {
    product: FormattedProduct;
    cleanModelName: string;
  } = $props();
</script>

<!-- ========================================================================= -->
<!-- SECTION 2: STORY (LOTUS "FREEDOM TO DRIVE" STYLE)                         -->
<!-- ========================================================================= -->
<section id="story" class="relative w-full bg-black text-white py-28 sm:py-36 lg:py-48 px-6 sm:px-10 lg:px-16 overflow-hidden select-none">
  <!-- Ambient radial backdrop glow -->
  <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,229,0,0.06)_0%,_transparent_70%)] pointer-events-none"></div>

  <div class="relative z-10 max-w-4xl mx-auto text-center space-y-10 sm:space-y-14">
    <!-- Header: Wide letter spacing (Lotus Freedom style) -->
    <div class="space-y-3 sm:space-y-4">
      <div class="font-mono text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#FFE500]">
        THE ENGINEERING PHILOSOPHY
      </div>
      <h2 class="font-heading font-light tracking-[0.22em] sm:tracking-[0.32em] text-2xl sm:text-4xl lg:text-5xl uppercase text-white leading-tight">
        FREEDOM TO CREATE
      </h2>
    </div>

    <!-- Main Narrative Paragraphs (Direct from Database with Lotus Aesthetic) -->
    <div class="story-narrative font-sans text-neutral-300 text-sm sm:text-base lg:text-lg leading-relaxed font-light tracking-wide max-w-3xl mx-auto">
      {#if product.descriptionHtml && product.descriptionHtml.trim() !== ''}
        {@html product.descriptionHtml}
      {:else}
        <p class="story-lead">
          Sebagian mesin menuntut Anda berkompromi dengan batas kemampuan mereka.<br class="hidden sm:inline" />
          <strong>ORIA {cleanModelName}</strong> direkayasa agar Anda dapat sepenuhnya terlarut dalam proses produksi tanpa batasan.
        </p>

        <p>
          Tanpa interupsi. Tanpa keraguan stabilitas warna dan akurasi mekanik. Tanpa rasa cemas akan waktu henti produksi.
          Hanya performa industri presisi tinggi yang konsisten, selalu siap menghasilkan dalam kecepatan penuh—karena keunggulan rekayasa sejati baru bermakna ketika Anda dapat mengandalkannya setiap detik.
        </p>

        {#if product.shortDescription}
          <p class="story-highlight">
            {product.shortDescription}
          </p>
        {/if}
      {/if}
    </div>

    <!-- 3 Pillars of Precision (Minimalist Grid - English Headers) -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-8 sm:pt-12 border-t border-white/10 max-w-3xl mx-auto">
      <div class="space-y-1 text-center">
        <div class="font-heading font-bold text-xl sm:text-2xl text-[#FFE500] tracking-tight">24/7 HEAVY DUTY</div>
        <div class="font-mono text-[10px] uppercase tracking-widest text-neutral-400">INDUSTRIAL STABILITY</div>
        <p class="font-sans text-xs text-neutral-500">Rigid chasis untuk produksi maraton stabil.</p>
      </div>
      <div class="space-y-1 text-center">
        <div class="font-heading font-bold text-xl sm:text-2xl text-white tracking-tight">MICRON PRECISION</div>
        <div class="font-mono text-[10px] uppercase tracking-widest text-neutral-400">MOTOR & GANTRY ACCURACY</div>
        <p class="font-sans text-xs text-neutral-500">Sistem linier pemandu tanpa vibrasi.</p>
      </div>
      <div class="space-y-1 text-center">
        <div class="font-heading font-bold text-xl sm:text-2xl text-[#FFE500] tracking-tight">ZERO COMPROMISE</div>
        <div class="font-mono text-[10px] uppercase tracking-widest text-neutral-400">OFFICIAL WARRANTY & SUPPORT</div>
        <p class="font-sans text-xs text-neutral-500">Teknisi standby & ketersediaan sparepart.</p>
      </div>
    </div>
  </div>
</section>

<style>
  :global(.story-narrative) {
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
  }

  :global(.story-narrative p) {
    margin: 0;
    line-height: 1.85;
    color: #a3a3a3;
    max-width: 44rem;
    margin-left: auto;
    margin-right: auto;
  }

  :global(.story-narrative .story-lead) {
    font-size: 1.15rem;
    line-height: 1.65;
    color: #ffffff;
    font-weight: 300;
    max-width: 48rem;
  }

  @media (min-width: 640px) {
    :global(.story-narrative .story-lead) {
      font-size: 1.35rem;
    }
  }

  @media (min-width: 1024px) {
    :global(.story-narrative .story-lead) {
      font-size: 1.5rem;
    }
  }

  :global(.story-narrative .story-lead strong) {
    color: #FFE500;
    font-weight: 600;
    font-family: var(--font-heading);
    letter-spacing: 0.02em;
  }

  :global(.story-narrative .story-highlight) {
    color: #e5e5e5;
    font-size: 0.925rem;
    padding-top: 1.25rem;
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    font-style: italic;
    max-width: 42rem;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.75;
  }
</style>
