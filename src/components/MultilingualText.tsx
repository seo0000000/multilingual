import { useMemo, Fragment } from 'react';
import { parseText } from '../lib/multilingual';
import type { LanguageConfig } from '../lib/types';

interface Props {
  children: string;
  config: LanguageConfig[];
}

/**
 * Renders a plain-text string with language-specific <span> wrappers.
 * Use this component when the content has no nested HTML elements.
 */
export function MultilingualText({ children, config }: Props) {
  const segments = useMemo(
    () => parseText(children, config),
    [children, config]
  );

  return (
    <>
      {segments.map((seg, i) =>
        seg.className ? (
          <span key={i} className={seg.className}>
            {seg.text}
          </span>
        ) : (
          <Fragment key={i}>{seg.text}</Fragment>
        )
      )}
    </>
  );
}
