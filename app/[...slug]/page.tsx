import { notFound } from 'next/navigation';
import type { PageClient } from '../../@types/customTypes';

import { BlockRenderer } from '../../components/Renderer/BlockRenderer';
import { Footer } from '../../components/Footer';
import { Navigation } from '../../components/Navigation';
import { getAllPageSlugs, getPageBySlug } from '../../lib/contentful-page';
import { getNavigation } from '../../lib/contentful-navigation';

type PageRouteParams = {
  slug: string[];
};

interface PageProps {
  params: PageRouteParams;
}

function normalizeSlug(segments: string[]): string {
  const joined = segments.join('/');

  return joined;
}

async function resolvePage(segments: string[]): Promise<PageClient | null> {
  const normalized = normalizeSlug(segments);
  const candidates = normalized.startsWith('/')
    ? [normalized, normalized.slice(1)]
    : [normalized, `/${normalized}`];

  for (const candidate of candidates) {
    if (candidate) {
      return getPageBySlug(candidate);
    }
  }

  return null;
}

const Page = async ({ params }: PageProps) => {
  const [page, navigation] = await Promise.all([
    resolvePage(params.slug),
    getNavigation(),
  ]);

  if (!page) {
    notFound();
  }

  return (
    <div id="my-app">
      <Navigation fields={navigation?.fields} />
      <main>
        {page.fields.sections?.length ? (
          <BlockRenderer block={page.fields.sections} />
        ) : (
          <p>No sections available for this page.</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export async function generateStaticParams(): Promise<PageRouteParams[]> {
  const slugs = await getAllPageSlugs();

  return slugs
    .filter((slug): slug is string => Boolean(slug) && slug !== '/')
    .map((slug) => {
      const cleaned = slug.startsWith('/') ? slug.slice(1) : slug;
      const segments = cleaned.split('/').filter(Boolean);

      return {
        slug: segments,
      };
    });
}

export default Page;
