import type { CtaClient } from '../@types/customTypes';

import { renderHeadingText, renderRichText } from '../lib/richText';

import { Button } from './Button';

export const CTA = ({ fields }: CtaClient) => {
  const { headline, subline, buttons } = fields;

  const headlineContent = renderHeadingText(headline);

  if (!headlineContent) {
    return null;
  }

  const sublineContent = renderRichText(subline);

  return (
    <section>
      <h2>{headlineContent}</h2>
      {sublineContent ? <div>{sublineContent}</div> : null}
      {buttons?.length ? (
        <div>
          {buttons.map((btn) => {
            if (!btn?.sys?.id || !btn?.fields) {
              // Skip unresolved entries that Contentful may return as empty shells
              return null;
            }

            return <Button key={btn.sys.id} {...btn} />;
          })}
        </div>
      ) : null}
    </section>
  );
};
