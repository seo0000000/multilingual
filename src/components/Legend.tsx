const ENTRIES = [
  { label: 'English (ml-en)', color: '#dc2626' },
  { label: '한국어 (ml-ko)', color: '#2563eb' },
  { label: '日本語 (ml-jp)', color: '#16a34a' },
  { label: '中文 (ml-cn)',   color: '#ea580c' },
  { label: 'Numbers(ml-num)', color: '#7c3aed' },
  { label: 'Punctuation (ml-punct)', color: '#0d9488' },
];

/**
 * Colour-coded legend that explains what each language class looks like.
 */
export function Legend() {
  return (
    <div className="mb-8 flex flex-wrap gap-3">
      {ENTRIES.map(({ label, color }) => (
        <span
          key={label}
          className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium shadow-sm"
          style={{ color }}
        >
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: color }}
          />
          {label}
        </span>
      ))}
    </div>
  );
}
