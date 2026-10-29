<script lang="ts">
  import { beforeNavigate, afterNavigate } from '$app/navigation';

  // Status visibilitas overlay: fade in halus saat mulai navigasi, dan langsung fade out saat selesai
  let isVisible = $state(false);
  let hideTimer: ReturnType<typeof setTimeout> | null = null;

  function clearHideTimer() {
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }
  }

  beforeNavigate(({ to, from, willUnload }) => {
    if (willUnload || !to?.url) return;
    // Abaikan jika hanya klik anchor/hash di halaman yang sama
    if (from?.url && to.url.pathname === from.url.pathname && to.url.search === from.url.search) {
      return;
    }

    clearHideTimer();
    isVisible = true;
  });

  afterNavigate(() => {
    if (!isVisible) return;

    clearHideTimer();
    // Langsung fade out halus begitu halaman selesai dimuat
    hideTimer = setTimeout(() => {
      isVisible = false;
    }, 80);
  });
</script>

<div
  class="fixed inset-0 z-[100] pointer-events-none select-none bg-[#FFE500] flex items-center justify-center transition-opacity duration-200 ease-out {isVisible
    ? 'opacity-100'
    : 'opacity-0'}"
  aria-hidden="true"
>
  <img
    src="/images/oria-logo-hd.png"
    alt="ORIA"
    class="h-10 sm:h-12 md:h-14 w-auto object-contain brightness-0 pointer-events-none select-none"
  />
</div>
