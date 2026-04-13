import { useEffect, useRef } from 'react';
import { applyToContainer } from '../lib/multilingual';
import type { LanguageConfig } from '../lib/types';

interface Props {
  html: string;
  config: LanguageConfig[];
  className?: string;
}

/**
 * Renders an HTML string and applies multilingual class wrapping
 * via DOM manipulation after mount.
 *
 * Use this component when the content contains nested HTML
 * elements (anchors, spans, tables, etc.).
 */
export function MultilingualHtml({ html, config, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      applyToContainer(ref.current, config);
    }
    // Only run once on mount; config is stable across renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
