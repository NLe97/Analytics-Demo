import type { EntryCollection } from 'contentful';

import type { IPageFields } from '../@types/generated/contentful';
import type { PageClient } from '../@types/customTypes';

import { contentfulClient } from './contentful';

const PAGE_INCLUDE_DEPTH = 10;

export async function getPageBySlug(slug: string): Promise<PageClient | null> {
  const entries: EntryCollection<IPageFields> =
    await contentfulClient.getEntries({
      content_type: 'page',
      'fields.slug': slug,
      include: PAGE_INCLUDE_DEPTH,
      limit: 1,
    });

  const entry = entries.items[0];

  if (!entry) {
    return null;
  }

  const page: PageClient = {
    sys: {
      id: entry.sys.id,
      type: entry.sys.type,
      contentType: {
        sys: {
          id: 'page',
          type: 'Link',
          linkType: 'ContentType',
        },
      },
      createdAt: entry.sys.createdAt,
      updatedAt: entry.sys.updatedAt,
      locale: entry.sys.locale,
    },
    fields: entry.fields,
    metadata: {
      tags: entry.metadata.tags,
    },
  };
  return page;
}

export async function getAllPageSlugs(): Promise<string[]> {
  const entries: EntryCollection<IPageFields> =
    await contentfulClient.getEntries({
      content_type: 'page',
      select: 'fields.slug',
      limit: 1000,
    });

  const uniqueSlugs = new Set(entries.items.map((entry) => entry.fields.slug));

  return Array.from(uniqueSlugs);
}
