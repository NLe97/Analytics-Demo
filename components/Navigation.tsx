import Link from 'next/link';
import type { INavigationFields } from '../@types/generated/contentful';

import { toInternalHref } from '../lib/links';

type NavigationProps = {
  fields?: Partial<INavigationFields>;
};

export const Navigation = ({ fields }: NavigationProps = {}) => {
  const links = Array.isArray(fields?.navigationLinks)
    ? fields?.navigationLinks.filter(
        (
          link
        ): link is Extract<
          NonNullable<INavigationFields['navigationLinks']>[number],
          { fields: { name?: unknown; url?: unknown } }
        > =>
          Boolean(
            link && 'fields' in link && link.fields?.name && link.fields?.url
          )
      )
    : [];

  return (
    <nav>
      {links.length ? (
        links.map((link) => (
          <Link key={link.sys.id} href={toInternalHref(link.fields.url)}>
            {link.fields.name}
          </Link>
        ))
      ) : (
        <Link href="/">Home</Link>
      )}
    </nav>
  );
};
