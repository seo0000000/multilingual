import type { CustomConfig, LanguageConfig, LanguageKey, TextSegment } from './types';

// ────────────────────────────────────────────────────────────
// Preset regex patterns (mirrors original src/multilingual.js)
// ────────────────────────────────────────────────────────────
const PRESETS: Record<LanguageKey, string> = {
  en: '[A-Za-z]+',
  ko: '[ㄱ-ㅎ가-힣ㅏ-ㅣ]+',
  jp: '[\u3040-\u309F\u30A0-\u30FF]+',
  cn: '[\u4E00-\u9FBF]+',
  ar: '[\u0600-\u06ff\u0750-\u077f\ufb50-\ufc3f\ufe70-\ufefc]+',
  num: '[0-9]+',
  punct: '[（）().\\^\\-&,;:<>\u201C\u201D\u2018\u2019/@%*，、。」]+',
};

// ────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────
function escapeRegex(str: string): string {
  return str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
}

function getClassName(config: LanguageConfig): string {
  return typeof config === 'string' ? `ml-${config}` : config.className;
}

function buildCustomRegex(config: CustomConfig): string {
  return `([${escapeRegex(config.charset)}]+)`;
}

/**
 * Compose a single RegExp from the language configuration array.
 * Each language gets its own capture group so we can identify
 * which language matched via the capture group index.
 */
export function composeRegex(config: LanguageConfig[]): RegExp {
  const parts = config.map((c) =>
    typeof c === 'string' ? `(${PRESETS[c]})` : buildCustomRegex(c)
  );
  return new RegExp(parts.join('|'), 'gm');
}

/**
 * Parse a plain text string and return an array of segments.
 * Each segment is either a raw text run (className: null)
 * or a language-classified run (className: 'ml-en' etc.).
 */
export function parseText(text: string, config: LanguageConfig[]): TextSegment[] {
  const regex = composeRegex(config);
  const segments: TextSegment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    // Text before this match
    if (match.index > lastIndex) {
      segments.push({ text: text.slice(lastIndex, match.index), className: null });
    }

    // Identify which capture group fired (1-based → config[i-1])
    for (let i = 1; i < match.length; i++) {
      if (match[i] !== undefined) {
        segments.push({ text: match[i], className: getClassName(config[i - 1]) });
        break;
      }
    }

    lastIndex = regex.lastIndex;
  }

  // Trailing text after last match
  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), className: null });
  }

  return segments;
}

// ────────────────────────────────────────────────────────────
// DOM-based processing (for containers with nested HTML)
// Mirrors the original recursiveChange() logic
// ────────────────────────────────────────────────────────────

function isAlreadyProcessed(el: Element, config: LanguageConfig[]): boolean {
  const cls = el.className ?? '';
  return config.some((c) => cls.includes(getClassName(c)));
}

function processTextNode(
  textNode: Text,
  config: LanguageConfig[],
  regex: RegExp
): void {
  const parent = textNode.parentElement;
  if (!parent || (parent instanceof Element && isAlreadyProcessed(parent, config))) {
    return;
  }

  const raw = textNode.textContent ?? '';
  // Reset regex state before each run
  regex.lastIndex = 0;

  const wrapped = raw.replace(regex, (...args: unknown[]) => {
    // args: [fullMatch, ...captureGroups, offset, fullString]
    for (let i = 1; i <= config.length; i++) {
      if (args[i] !== undefined) {
        const cls = getClassName(config[i - 1]);
        return `<span class="${cls}">${args[i]}</span>`;
      }
    }
    return String(args[0]);
  });

  if (wrapped === raw) return;

  const template = document.createElement('template');
  template.innerHTML = wrapped;

  const fragment = template.content;
  parent.insertBefore(fragment, textNode);
  parent.removeChild(textNode);
}

function walkAndProcess(node: Node, config: LanguageConfig[], regex: RegExp): void {
  if (node.nodeType === Node.TEXT_NODE) {
    processTextNode(node as Text, config, regex);
    return;
  }

  // Traverse children in reverse to allow safe in-place replacement
  const children = Array.from(node.childNodes);
  for (let i = children.length - 1; i >= 0; i--) {
    walkAndProcess(children[i], config, regex);
  }
}

/**
 * Apply multilingual class wrapping to all text nodes inside `container`.
 * This is the React-friendly equivalent of the original MultiLingual class.
 */
export function applyToContainer(container: HTMLElement, config: LanguageConfig[]): void {
  const regex = composeRegex(config);
  walkAndProcess(container, config, regex);
}
