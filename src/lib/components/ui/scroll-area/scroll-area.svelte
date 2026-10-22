<script lang="ts">
  import { ScrollArea as ScrollAreaPrimitive } from 'bits-ui';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    viewportRef = $bindable(null),
    class: className,
    orientation = 'vertical',
    scrollbarClass = '',
    thumbClass = '',
    viewportClass = '',
    onscroll,
    children,
    ...restProps
  }: ScrollAreaPrimitive.RootProps & {
    viewportRef?: HTMLElement | null;
    orientation?: 'vertical' | 'horizontal';
    scrollbarClass?: string;
    thumbClass?: string;
    viewportClass?: string;
    onscroll?: (e: Event) => void;
  } = $props();
</script>

<ScrollAreaPrimitive.Root
  bind:ref
  class={cn('relative overflow-hidden', className)}
  {...restProps}
>
  <ScrollAreaPrimitive.Viewport
    bind:ref={viewportRef}
    {onscroll}
    class={cn('h-full w-full rounded-[inherit]', viewportClass)}
  >
    {@render children?.()}
  </ScrollAreaPrimitive.Viewport>
  <ScrollAreaPrimitive.Scrollbar
    {orientation}
    class={cn(
      'flex touch-none select-none transition-colors p-0 z-50 bg-[#e5e5e5]',
      orientation === 'vertical' && 'h-full w-1.5',
      orientation === 'horizontal' && 'h-1.5 flex-col',
      scrollbarClass
    )}
  >
    <ScrollAreaPrimitive.Thumb
      class={cn(
        'relative w-full flex-1 transition-colors rounded-none bg-black hover:bg-neutral-800',
        thumbClass
      )}
    />
  </ScrollAreaPrimitive.Scrollbar>
  <ScrollAreaPrimitive.Corner />
</ScrollAreaPrimitive.Root>

