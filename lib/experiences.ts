import type {
  BaselineWithExperiencesEntry,
  Entry as NinetailedEntry,
} from '@ninetailed/experience.js-utils-contentful';
import { ExperienceMapper } from '@ninetailed/experience.js-utils-contentful';

export type SingularBlock =
  | NinetailedEntry
  | BaselineWithExperiencesEntry
  | undefined;
export type SingularOrArrayBlock = SingularBlock | SingularBlock[];

export const hasExperiences = (
  entry: unknown
): entry is BaselineWithExperiencesEntry =>
  (entry as BaselineWithExperiencesEntry).fields.nt_experiences !== undefined;

export const parseExperiences = (entry: unknown) =>
  hasExperiences(entry)
    ? entry.fields.nt_experiences
        .filter((experience) => ExperienceMapper.isExperienceEntry(experience))
        .map((experience) => ExperienceMapper.mapExperience(experience))
    : [];

export const hoistId = (entry: SingularBlock) => {
  if (entry) {
    return {
      ...entry,
      id: entry.sys.id,
    };
  }
  return {
    id: '',
  };
};
