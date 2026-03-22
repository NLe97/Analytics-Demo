export function toInternalHref(slug: string | undefined | null): string {
  if (!slug) {
    return '#';
  }

  if (slug.startsWith('http://') || slug.startsWith('https://')) {
    return slug;
  }

  if (!slug.startsWith('/')) {
    return `/${slug}`;
  }

  return slug;
}
