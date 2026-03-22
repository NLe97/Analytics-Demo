import type { FeatureClient } from '../@types/customTypes';

import { renderHeadingText, renderRichText } from '../lib/richText';
import { resolveImageDimensions } from '../lib/images';

import { Button } from './Button';

function renderImage(
  image: FeatureClient['fields']['image'],
  position: FeatureClient['fields']['imagePosition']
) {
  const file = image?.fields?.file;
  const url = file?.url;

  if (!url) {
    return null;
  }

  const alt = image?.fields?.title || file?.fileName || 'Feature image';
  const { width, height } = resolveImageDimensions(file?.details, 720);

  return (
    <figure data-position={position || 'right'}>
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

export const Feature = ({ fields }: FeatureClient) => {
  const { headline, subline, button, image, imagePosition } = fields;

  if (!headline) {
    return null;
  }

  const headlineContent = renderHeadingText(headline);
  const sublineContent = renderRichText(subline);

  return (
    <section>
      <div>
        {headlineContent ? <h2>{headlineContent}</h2> : null}
        {sublineContent ? <div>{sublineContent}</div> : null}
        {button?.length ? (
          <div>
            {button.map((btn) => (
              <Button key={btn.sys.id} {...btn} />
            ))}
          </div>
        ) : null}
      </div>
      {renderImage(image, imagePosition)}
    </section>
  );
};
