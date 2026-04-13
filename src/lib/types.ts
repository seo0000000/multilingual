export type LanguageKey = 'en' | 'ko' | 'jp' | 'cn' | 'ar' | 'num' | 'punct';

export interface CustomConfig {
  className: string;
  charset: string;
}

export type LanguageConfig = LanguageKey | CustomConfig;

export interface TextSegment {
  text: string;
  className: string | null;
}
