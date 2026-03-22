'use client';

import { MergeTag as NinetailedMergeTag } from '@ninetailed/experience.js-next';

export interface MergeTagProps {
  id: string;
  fallback?: string;
}

export const MergeTag = ({ id, fallback }: MergeTagProps) => {
  return <NinetailedMergeTag id={id} fallback={fallback} />;
};
