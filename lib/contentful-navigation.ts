import type { EntryCollection } from 'contentful';

import type { INavigationFields } from '../@types/generated/contentful';

import type { NavigationClient } from '../@types/customTypes';

import { contentfulClient } from './contentful';

const NAVIGATION_INCLUDE_DEPTH = 5;
const NAVIGATION_INTERNAL_TITLE = 'Main Navigation';

export async function getNavigation(): Promise<NavigationClient | null> {
  const entries: EntryCollection<INavigationFields> =
    await contentfulClient.getEntries({
      content_type: 'navigation',
      include: NAVIGATION_INCLUDE_DEPTH,
      'fields.internalTitle': NAVIGATION_INTERNAL_TITLE,
      limit: 1,
    });

  const entry = entries.items[0];

  if (!entry) {
    return null;
  }

  const navigation: NavigationClient = {
    sys: {
      id: entry.sys.id,
      type: entry.sys.type,
      contentType: {
        sys: {
          id: 'navigation',
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

  return navigation;
}
