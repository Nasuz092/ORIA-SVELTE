<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import Navbar from '$lib/components/layout/Navbar.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import favicon from '$lib/assets/favicon.svg';

  let { children } = $props();

  onMount(() => {
    let activeHeading: HTMLElement | null = null;
    let fadingHeading: HTMLElement | null = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let burst = 0;
    let auroraOpacity = 0;
    let targetOpacity = 0;
    let rafId: number;

    const handlePointerMove = (e: PointerEvent) => {
      // Deteksi apakah kursor berada di atas teks heading (h1, h2, h3, h4, h5, h6)
      const heading = (e.target as HTMLElement)?.closest('h1, h2, h3, h4, h5, h6') as HTMLElement | null;

      if (heading) {
        // Jika berpindah ke heading baru, bersihkan efek dari heading lama seketika agar tidak stuck
        if (heading !== fadingHeading) {
          document.querySelectorAll('.cmyk-aurora-active').forEach((el) => {
            if (el !== heading) {
              el.classList.remove('cmyk-aurora-active');
              (el as HTMLElement).style.removeProperty('--aurora-opacity');
              (el as HTMLElement).style.removeProperty('--aurora-x');
              (el as HTMLElement).style.removeProperty('--aurora-y');
            }
          });

          // Reset koordinat langsung ke posisi kursor di heading baru
          const rect = heading.getBoundingClientRect();
          targetX = e.clientX - rect.left;
          targetY = e.clientY - rect.top;
          currentX = targetX;
          currentY = targetY;
          // Pastikan opasitas prima di heading baru
          auroraOpacity = Math.max(auroraOpacity, 0.9);
        } else {
          const rect = heading.getBoundingClientRect();
          targetX = e.clientX - rect.left;
          targetY = e.clientY - rect.top;
        }

        activeHeading = heading;
        fadingHeading = heading;
        targetOpacity = 1;

        if (!heading.classList.contains('cmyk-aurora-active')) {
          heading.classList.add('cmyk-aurora-active');
        }
      } else {
        // Kursor keluar dari heading: jika masih ada heading yang sedang memudar,
        // terus perbarui koordinat kursor relatif terhadap heading tersebut agar sphere terus mengikuti kursor (tidak stuck/membeku di tepi huruf!)
        if (fadingHeading) {
          const rect = fadingHeading.getBoundingClientRect();
          targetX = e.clientX - rect.left;
          targetY = e.clientY - rect.top;
        }
        targetOpacity = 0;
        activeHeading = null;
      }
    };

    const handlePointerLeave = () => {
      targetOpacity = 0;
      activeHeading = null;
    };

    const handlePointerDown = (e: PointerEvent) => {
      const heading = (e.target as HTMLElement)?.closest('h1, h2, h3, h4, h5, h6') as HTMLElement | null;
      if (heading) {
        burst = 160; // Efek riak shockwave membesar saat diklik
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave, { passive: true });

    const animate = (time: number) => {
      // Transisi transparansi halus: fade-out cepat dan anggun (0.16) tanpa lag/stuck
      const fadeSpeed = targetOpacity === 0 ? 0.16 : 0.14;
      auroraOpacity += (targetOpacity - auroraOpacity) * fadeSpeed;

      const currentEl = activeHeading || fadingHeading;

      if (currentEl && auroraOpacity > 0.005) {
        // Mengikuti kursor secara halus dan tenang
        currentX += (targetX - currentX) * 0.16;
        currentY += (targetY - currentY) * 0.16;

        // Rotasi kedalaman 3D & gelombang cairan lambat (slow fluid wave & depth cycling)
        const t = time * 0.0011;

        // Osilasi kedalaman Z (depth): Cyan, Magenta, dan Yellow bergantian menjadi warna teratas / terdepan secara periodik & mulus
        const zc = Math.sin(t * 1.2);
        const zm = Math.sin(t * 1.2 + 2.094);
        const zy = Math.sin(t * 1.2 + 4.188);

        // Opasitas dinamis berdasarkan kedalaman (0.34 s/d 0.98): warna di depan mendominasi visual, warna di belakang melebur
        const ac = 0.66 + zc * 0.32;
        const am = 0.66 + zm * 0.32;
        const ay = 0.66 + zy * 0.32;

        // Radius dinamis: warna yang sedang berada di depan membesar (+24px)
        const rc = zc * 24;
        const rm = zm * 24;
        const ry = zy * 24;

        // Gerakan orbit X/Y organik
        const cx = Math.sin(t * 1.4) * 38;
        const cy = Math.cos(t * 1.6) * 28;
        const mx = Math.cos(t * 1.5 + 2.094) * 38;
        const my = Math.sin(t * 1.3 + 2.094) * 32;
        const yx = Math.sin(t * 1.2 + 4.188) * 35;
        const yy = Math.cos(t * 1.4 + 4.188) * 36;
        // Bouncing/breathing pulse tenang
        const pulse = Math.sin(t * 1.8) * 18;

        if (burst > 0.5) {
          burst *= 0.90;
        } else {
          burst = 0;
        }

        currentEl.style.setProperty('--aurora-x', `${currentX.toFixed(1)}px`);
        currentEl.style.setProperty('--aurora-y', `${currentY.toFixed(1)}px`);
        currentEl.style.setProperty('--aurora-c-x', `${cx.toFixed(1)}px`);
        currentEl.style.setProperty('--aurora-c-y', `${cy.toFixed(1)}px`);
        currentEl.style.setProperty('--aurora-m-x', `${mx.toFixed(1)}px`);
        currentEl.style.setProperty('--aurora-m-y', `${my.toFixed(1)}px`);
        currentEl.style.setProperty('--aurora-y-x', `${yx.toFixed(1)}px`);
        currentEl.style.setProperty('--aurora-y-y', `${yy.toFixed(1)}px`);
        currentEl.style.setProperty('--aurora-a-c', `${ac.toFixed(3)}`);
        currentEl.style.setProperty('--aurora-a-m', `${am.toFixed(3)}`);
        currentEl.style.setProperty('--aurora-a-y', `${ay.toFixed(3)}`);
        currentEl.style.setProperty('--aurora-r-c', `${rc.toFixed(1)}px`);
        currentEl.style.setProperty('--aurora-r-m', `${rm.toFixed(1)}px`);
        currentEl.style.setProperty('--aurora-r-y', `${ry.toFixed(1)}px`);
        currentEl.style.setProperty('--aurora-pulse', `${pulse.toFixed(1)}px`);
        currentEl.style.setProperty('--aurora-burst', `${burst.toFixed(1)}px`);
        currentEl.style.setProperty('--aurora-opacity', `${auroraOpacity.toFixed(3)}`);
      } else if (fadingHeading && auroraOpacity <= 0.005) {
        // Aurora sudah selesai memudar sempurna kembali ke hitam pekat
        fadingHeading.classList.remove('cmyk-aurora-active');
        fadingHeading.style.removeProperty('--aurora-opacity');
        fadingHeading.style.removeProperty('--aurora-x');
        fadingHeading.style.removeProperty('--aurora-y');
        fadingHeading = null;
        auroraOpacity = 0;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('mouseleave', handlePointerLeave);
      cancelAnimationFrame(rafId);
      if (activeHeading) activeHeading.classList.remove('cmyk-aurora-active');
      if (fadingHeading) fadingHeading.classList.remove('cmyk-aurora-active');
    };
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen flex flex-col bg-white text-black font-sans">
  <Navbar />
  <main class="flex-1 w-full bg-white text-black {page.url.pathname === '/' ? '' : 'pt-20'}">
    {@render children()}
  </main>
  <Footer />
</div>
