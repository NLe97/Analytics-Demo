import type { ReactNode } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import type { Document } from '@contentful/rich-text-types';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';

import type { NtMergetagClient } from '../@types/customTypes';
import { MergeTag } from '../components/MergeTag';

export type RichTextValue = string | Document | undefined;

type RenderOptions = Parameters<typeof documentToReactComponents>[1];

const MERGE_TAG_CONTENT_TYPE_ID = 'nt_mergetag';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value && typeof value === 'object');

const isMergeTagEntry = (entry: unknown): entry is NtMergetagClient => {
  if (!isRecord(entry)) {
    return false;
  }

  const { sys } = entry;
  if (!isRecord(sys)) {
    return false;
  }

  const { contentType } = sys;
  if (!isRecord(contentType)) {
    return false;
  }

  const contentTypeSys = contentType.sys;
  if (!isRecord(contentTypeSys)) {
    return false;
  }

  const contentTypeId = contentTypeSys.id;
  if (typeof contentTypeId !== 'string') {
    return false;
  }

  if (contentTypeId !== MERGE_TAG_CONTENT_TYPE_ID) {
    return false;
  }

  const { fields } = entry;
  if (!isRecord(fields)) {
    return false;
  }

  const mergeTagId = fields.nt_mergetag_id;
  return typeof mergeTagId === 'string' && mergeTagId.length > 0;
};

const withDefaultRenderers = (options?: RenderOptions): RenderOptions => {
  const mergeTagRenderer: NonNullable<RenderOptions>['renderNode'] = {
    [INLINES.EMBEDDED_ENTRY]: (node) => {
      // target type is defined as any by Contentful, we use a type assertion
      // and check it with isMergeTagEntry.
      const target = node?.data?.target as NtMergetagClient;

      if (!isMergeTagEntry(target)) {
        return null;
      }

      return (
        <MergeTag
          id={target.fields.nt_mergetag_id}
          fallback={target.fields.nt_fallback ?? undefined}
        />
      );
    },
  };

  return {
    ...options,
    renderNode: {
      ...mergeTagRenderer,
      ...(options?.renderNode ?? {}),
    },
  };
};

export function renderRichText(
  value: RichTextValue,
  options?: RenderOptions
): ReactNode | undefined {
  if (!value) {
    return undefined;
  }

  if (typeof value === 'string') {
    return value;
  }

  return documentToReactComponents(value, withDefaultRenderers(options));
}

const inlineBlockRenderer = (_node: unknown, children: ReactNode) => children;

const headingOverrides = {
  [BLOCKS.HEADING_1]: inlineBlockRenderer,
  [BLOCKS.HEADING_2]: inlineBlockRenderer,
  [BLOCKS.HEADING_3]: inlineBlockRenderer,
  [BLOCKS.HEADING_4]: inlineBlockRenderer,
  [BLOCKS.HEADING_5]: inlineBlockRenderer,
  [BLOCKS.HEADING_6]: inlineBlockRenderer,
  [BLOCKS.PARAGRAPH]: inlineBlockRenderer,
  [BLOCKS.QUOTE]: inlineBlockRenderer,
};

export function renderHeadingText(
  value: RichTextValue,
  options?: RenderOptions
): ReactNode | undefined {
  const mergedOptions = {
    ...options,
    renderNode: {
      ...headingOverrides,
      ...(options?.renderNode ?? {}),
    },
  };

  return renderRichText(value, mergedOptions);
}
