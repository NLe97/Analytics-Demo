import type { FooterClient } from '../@types/customTypes';

import { renderRichText } from '../lib/richText';

export const Footer = ({ fields }: Partial<FooterClient> = {}) => {
  const year = new Date().getFullYear();
  const copyright = fields?.copyright;
  const copyrightContent = copyright ? renderRichText(copyright) : null;

  return (
    <footer>
      <p>{copyrightContent ?? <>&copy; {year} Minimal Website</>}</p>
    </footer>
  );
};
