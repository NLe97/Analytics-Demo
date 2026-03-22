'use client';

import type { HeroClient } from '../@types/customTypes';

import { renderHeadingText, renderRichText } from '../lib/richText';
import { resolveImageDimensions } from '../lib/images';

import { Button } from './Button';

function renderButtons(buttons: HeroClient['fields']['buttons']) {
  if (!buttons?.length) {
    return null;
  }

  return (
    <div>
      {buttons.map((btn) => {
        if (!btn?.sys?.id || !btn?.fields) {
          // Skip unresolved entries that Contentful may return as empty shells
          return null;
        }

        return <Button key={btn.sys.id} {...btn} />;
      })}
    </div>
  );
}

function renderImage(image: HeroClient['fields']['image']) {
  const file = image?.fields?.file;
  const url = file?.url;

  if (!url) {
    return null;
  }

  const alt = image?.fields?.title || file?.fileName || 'Hero image';
  const { width, height } = resolveImageDimensions(file?.details, 960);

  return (
    <figure>
      <img
        src={url}
        alt={alt}
        loading="lazy"
        decoding="async"
        width={width}
        height={height}
      />
    </figure>
  );
}

export const Hero = ({ fields }: HeroClient) => {
  const { headline, subline, buttons, image } = fields;

  const headlineContent = renderHeadingText(headline);

  if (!headlineContent) {
    return null;
  }

  const sublineContent = renderRichText(subline);

  return (
    <section>
      <h1>{headlineContent}</h1>
      {sublineContent ? <div>{sublineContent}</div> : null}
      {renderButtons(buttons)}
      {renderImage(image)}
    </section>
  );
};
