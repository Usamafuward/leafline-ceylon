// Keeps a reference to each decoded image so the browser holds on to its decoded bitmap
const decodedImages = new Map<string, HTMLImageElement>();

// Resolves once the browser has the image downloaded and decoded, so the next element that
// shows it (a morphing modal photo) paints on its first frame instead of flashing an empty box.
// Never rejects, and gives up after `timeoutMs` so a slow network can't hold a modal shut.
export default function predecodeImage(src: string, timeoutMs = 400): Promise<void> {
  if (typeof window === 'undefined' || decodedImages.has(src)) return Promise.resolve();

  const img = new Image();
  img.src = src;
  const decoded = img
    .decode()
    .then(() => {
      decodedImages.set(src, img);
    })
    .catch(() => {});

  return Promise.race([decoded, new Promise<void>((resolve) => setTimeout(resolve, timeoutMs))]);
}
