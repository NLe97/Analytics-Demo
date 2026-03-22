'use client';

import { get } from 'lodash';

import { Experience } from '@ninetailed/experience.js-next';
import { CTA } from '../Cta';
import { Feature } from '../Feature';
import { Footer } from '../Footer';
import { Hero } from '../Hero';
import { Navigation } from '../Navigation';
import { ComponentContentTypes } from '../../lib/constants';

import type { SingularOrArrayBlock } from '../../lib/experiences';
import { parseExperiences } from '../../lib/experiences';

import type {
  CtaClient,
  FeatureClient,
  FooterClient,
  HeroClient,
  NavigationClient,
  SectionsGroupClient,
} from '../../@types/customTypes';

const ContentTypeMap = {
  [ComponentContentTypes.CTA]: CTA,
  [ComponentContentTypes.Feature]: Feature,
  [ComponentContentTypes.Footer]: Footer,
  [ComponentContentTypes.Hero]: Hero,
  [ComponentContentTypes.Navigation]: Navigation,
};

type Component =
  | CtaClient
  | FeatureClient
  | FooterClient
  | HeroClient
  | NavigationClient
  | SectionsGroupClient;

const ComponentRenderer = (props: Component) => {
  const { sys } = props;
  const contentTypeId = sys.contentType.sys.id;
  const Component = ContentTypeMap[contentTypeId];

  if (!Component) {
    return null;
  }

  // @ts-expect-error unreasonable to type this for a demo website
  // not even the reference implementation does this:
  // https://github.com/ninetailed-inc/ninetailed-examples/blob/main/marketing-contentful-next/components/Renderer/BlockRenderer.tsx
  return <Component {...props} />;
};

export const BlockRenderer = ({ block }: { block: SingularOrArrayBlock }) => {
  if (Array.isArray(block)) {
    return (
      <div>
        {block.map((b) =>
          b ? <BlockRenderer key={`block-${b.sys.id}`} block={b} /> : null
        )}
      </div>
    );
  }

  if (!block) {
    return null;
  }

  const contentTypeId = get(block, 'sys.contentType.sys.id');
  const { id } = block.sys;

  if (!contentTypeId) {
    return null;
  }

  const parsedExperiences = parseExperiences(block);

  // I disabled jsx-props-no-spreading because it's not that important for a small
  // demo website.
  return (
    <Experience
      key={`${contentTypeId}-${id}`}
      {...block}
      id={id}
      component={ComponentRenderer}
      experiences={parsedExperiences}
    />
  );
};
