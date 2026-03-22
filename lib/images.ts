export function resolveImageDimensions(
  details: unknown,
  fallbackWidth: number
): { width: number; height?: number } {
  const imageDetails = (
    details as { image?: { width?: number; height?: number } }
  ).image;

  if (!imageDetails?.width || !imageDetails?.height) {
    return { width: fallbackWidth };
  }

  const width = Math.min(imageDetails.width, fallbackWidth);
  const aspectRatio = imageDetails.height / imageDetails.width;
  const height = Number.isFinite(aspectRatio)
    ? Math.round(width * aspectRatio)
    : undefined;

  return { width, height };
}
