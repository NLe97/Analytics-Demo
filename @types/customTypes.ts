import type {
  IButton,
  ICta,
  IFeature,
  IFooter,
  IHero,
  INavigation,
  INavigationLink,
  INtAudience,
  INtExperience,
  INtMergetag,
  IPage,
  ISectionsGroup,
} from './generated/contentful';

export type ButtonClient = Omit<IButton, 'toPlainObject' | 'update'>;
export type CtaClient = Omit<ICta, 'toPlainObject' | 'update'>;
export type FeatureClient = Omit<IFeature, 'toPlainObject' | 'update'>;
export type FooterClient = Omit<IFooter, 'toPlainObject' | 'update'>;
export type HeroClient = Omit<IHero, 'toPlainObject' | 'update'>;
export type NavigationClient = Omit<INavigation, 'toPlainObject' | 'update'>;
export type NavigationLinkClient = Omit<
  INavigationLink,
  'toPlainObject' | 'update'
>;
export type NtAudienceClient = Omit<INtAudience, 'toPlainObject' | 'update'>;
export type NtExperienceClient = Omit<
  INtExperience,
  'toPlainObject' | 'update'
>;
export type NtMergetagClient = Omit<INtMergetag, 'toPlainObject' | 'update'>;
export type PageClient = Omit<IPage, 'toPlainObject' | 'update'>;
export type SectionsGroupClient = Omit<
  ISectionsGroup,
  'toPlainObject' | 'update'
>;

export type IEntryClient =
  | ButtonClient
  | CtaClient
  | FeatureClient
  | FooterClient
  | HeroClient
  | NavigationClient
  | NavigationLinkClient
  | NtAudienceClient
  | NtExperienceClient
  | NtMergetagClient
  | PageClient
  | SectionsGroupClient;
