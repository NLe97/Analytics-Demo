import type { SectionsGroupClient } from '../@types/customTypes';

import { BlockRenderer } from './Renderer/BlockRenderer';

export const SectionsGroup = ({ fields }: SectionsGroupClient) => {
  if (!fields.sections?.length) {
    return null;
  }

  return (
    <section>
      {fields.sections.map((section) => {
        return <BlockRenderer key={section.sys.id} block={section} />;
      })}
    </section>
  );
};
