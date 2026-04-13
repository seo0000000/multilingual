import { GitHubCorner } from './components/GitHubCorner';
import { MultilingualHtml } from './components/MultilingualHtml';
import type { LanguageConfig } from './lib/types';

const REPO = 'https://github.com/multilingualjs/multilingual.js';

// 원본 사이트와 동일한 설정
const CONFIG: LanguageConfig[] = [
  'en', 'ko', 'jp', 'cn', 'num', 'ar', 'punct',
  { className: 'ml-parentheses', charset: '()' },
];

// 원본 사이트의 .bodytext 내용 그대로
const BODY_HTML = `
<hr>
<p>
Quantum mechanics (QM; also known as quantum physics or quantum theory), including quantum field theory, is a fundamental branch of physics concerned with processes involving, for example, atoms and photons. Systems such as these which obey quantum mechanics can be in a quantum superposition of different states, unlike in classical physics.
</p>
<p>
양자역학(量子力學, Quantum Mechanics)은 분자, 원자, 전자와 같은 작은 크기를 갖는 계의 물리학을 연구하는 분야이다. 19세기 중반까지의 실험은 뉴턴의 고전역학으로 설명할 수 있었다. 그러나, 19세기 후반부터 20세기 초반까지 이루어진 전자, 양성자, 중성자 등의 아원자입자에 관련된 실험들의 결과는 고전역학으로 설명을 시도할 경우 모순이 발생하여 이를 해결하기 위한 새로운 역학 체계가 필요하게 되었다. 이 양자역학은 플랑크의 양자 가설을 계기로 하여 슈뢰딩거, 하이젠베르크, 디랙 등에 의해 만들어진 전적으로 20세기에 이루어진 학문이다.
</p>
<p>
量子力学（りょうしりきがく、英: Quantum mechanics）は、一般相対性理論と同じく現代物理学の根幹を成す理論として知られ、主として分子や原子、あるいはそれを構成する電子など、微視的な物理現象を記述する。 量子力学自身は前述のミクロな系における力学を記述する理論だが、取り扱う系をそうしたミクロな系の集まりとして解析することによって、ニュートン力学に代表される古典論では説明が困難であった巨視的な現象についても記述することができる。たとえば量子統計力学はそのような応用例の一つである。従って、生物や宇宙のようなあらゆる自然現象もその記述の対象となり得る。
</p>
<p>
量子力学是描写微观物质的一个物理学分支，与相对论一起被认为是现代物理学的两大基本支柱，许多物理学理论和科学，如原子物理学、固体物理学、核物理学和粒子物理学以及其它相关的學科，都是以其为基础。19世纪末，經典力學和經典电动力学在描述微观系统时的不足與矛盾越来越明显。量子力学是在20世纪初，由马克斯·普朗克、尼尔斯·玻尔、沃纳·海森堡、埃尔温·薛定谔、沃尔夫冈·泡利、路易·德布罗意、马克斯·玻恩、恩里科·费米、保罗·狄拉克、阿尔伯特·爱因斯坦等一大群物理学家所共同创立。透过量子力学，人们对物质的结构以及其相互作用的见解被根本地改变，同时，许多现象也得以真正地被解释。
</p>
<p style="direction: rtl;">
مکانیک کوانتومی شاخه‌ای بنیادی از فیزیک نظری است که با پدیده‌های فیزیکی در مقیاس میکروسکوپی سر و کار دارد. در این مقیاس، کُنِش‌های فیزیکی در حد و اندازه‌های ثابت پلانک هستند. مقدار عددی ثابت پلانک نیز بسیار کوچک و برابر است با 6.626x10^-34
</p>
`;

const LANGUAGE_ITEMS = [
  { cls: 'en',          label: 'ml-en',           lang: 'English'      },
  { cls: 'ko',          label: 'ml-ko',           lang: 'Korean'       },
  { cls: 'jp',          label: 'ml-jp',           lang: 'Japanese'     },
  { cls: 'cn',          label: 'ml-cn',           lang: 'Chinese'      },
  { cls: 'ar',          label: 'ml-ar',           lang: 'Arabic'       },
  { cls: 'num',         label: 'ml-num',          lang: 'Numeric'      },
  { cls: 'punct',       label: 'ml-punct',        lang: 'Punctuations' },
  { cls: 'parentheses', label: 'ml-parentheses',  lang: 'Custom'       },
];

export default function App() {
  return (
    <div style={{ position: 'relative' }}>
      <GitHubCorner href={REPO} />

      <div className="content">
        <h1>multilingual.js</h1>
        <h2>A javascript library for multilingual typesetting</h2>

        <ul>
          {LANGUAGE_ITEMS.map(({ cls, label, lang }) => (
            <li key={cls} className={cls}>
              {label}<span className="lang">:{lang}</span>
            </li>
          ))}
        </ul>

        <MultilingualHtml
          html={BODY_HTML}
          config={CONFIG}
          className="bodytext"
        />
      </div>

      <h3>
        <a href={REPO} target="_blank" rel="noreferrer">
          {REPO}
        </a>
      </h3>
    </div>
  );
}
