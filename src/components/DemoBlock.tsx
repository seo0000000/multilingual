import type { ReactNode } from 'react';

interface Props {
  label?: string;
  children: ReactNode;
}

/**
 * Wraps a demo content block with a subtle border and label.
 * Mirrors the .container1 style from the original test page.
 */
export function DemoBlock({ label, children }: Props) {
  return (
    <div className="mb-8 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      {label && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
          {label}
        </p>
      )}
      <div className="font-sans text-sm leading-relaxed text-gray-800">
        {children}
      </div>
    </div>
  );
}
