// Motion props for items in a filterable grid. Use inside
// <AnimatePresence mode="popLayout"> on a motion element keyed by the item's id:
// items rise in as they scroll into view, and when a filter changes the removed ones
// fade out while the rest glide to their new positions.
export function gridItemMotion(index: number, columns = 3) {
  return {
    layout: true,
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '0px 0px -60px 0px' },
    exit: { opacity: 0, scale: 0.96, transition: { duration: 0.25, ease: 'easeOut' as const } },
    transition: {
      layout: { type: 'spring' as const, bounce: 0, visualDuration: 0.5 },
      opacity: { duration: 0.6, delay: (index % columns) * 0.08 },
      y: { duration: 0.7, delay: (index % columns) * 0.08, ease: [0.16, 1, 0.3, 1] as const },
    },
  };
}
