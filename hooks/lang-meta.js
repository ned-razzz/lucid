// lang-meta.js — per-language activation/UI/NL metadata table + table-driven
// dispatch helpers. The single home for everything that used to be a `ko`/`en`
// branch or regex pair scattered across scrooge-activate.js and nl-activation.js.
//
// Why a table: rule *loading* was already registry-driven (registry.json[lang][dial]),
// but the activation surfaces — the per-turn reminder, the off countermand, the flag
// hints, and the natural-language cues — were binary/ternary branches hardcoded to
// ko/en. Adding another language meant editing every branch. Here each language
// is ONE row of data; the dispatch helpers below are language-agnostic, so a new
// language is a table row + a rule file + a registry entry, no hook surgery.
//
// Behavior contract: the ko/en strings and regexes are moved VERBATIM from the
// original hooks (no rewrite), so every reminder/countermand/NL output stays
// byte-identical — the existing fixtures are the regression guard.

// LANG_META — one row per language.
//   reminder: pieces the per-turn reminder is assembled from (see buildReminder).
//   countermand: the off-turn "return to normal prose" line.
//   flagHint: compact per-flag behavior label map (mirrors each fragment heading).
//   savings: fixed per-dial ratio used only for a counterfactual stats estimate.
//   nlCue: natural-language activation cues (see parseNaturalActivation in
//          nl-activation.js). Each is the language's slice of the original combined
//          regex; `name`/`meta`/`strong`/`off`/`activate`/`negate` test independently
//          and OR across languages, so splitting the combined patterns per-language
//          is behavior-identical (alternation A|B === A.test || B.test; the /i flag
//          only ever mattered for the Latin-script English alternatives).
export const LANG_META = {
  ko: {
    reminder: {
      head: 'SCROOGE 활성',
      modeClose: '. ',
      full: '개조식·음슴체(~함/~됨), 의미 명확 시 조사 드롭, 존대 제거. ',
      suffix: 'code block·error·기술 용어 원문. 보안/되돌릴 수 없는 동작은 normal prose.',
      flag: { prefix: ' flag: ', sep: '·', suffix: ' 활성.' },
    },
    countermand: 'SCROOGE OFF — 압축 모드 해제. 이번 턴부터 평소 register(일반 문체)로 복귀.',
    flagHint: { lean: 'lean(최소 코드)' },
    savings: { full: { ratio: 0.69 } },
    nlCue: {
      name: /스크루지/,
      // Activation triggers: the "scrooge" name plus an explicit action cue. The bare
      // phrases "압축 모드" / "토큰 아껴" are intentionally NOT triggers — without the
      // name they fire on ordinary talk ("이미지 압축 모드로 저장").
      activate: /스크루지\s*(?:처럼|모드|로\s*(?:답|말|얘기|대답)|으로\s*(?:답|말))/,
      // An optional "모드" may sit between the name and the off cue, so "스크루지 모드 꺼"
      // deactivates instead of matching the activation pattern's bare "스크루지 모드".
      off: /스크루지\s*(?:모드\s*)?(?:꺼|끄(?:기|자|줘|는)?|그만|중지|비활성|off)/,
      negate: /지\s*마|지마|말고|말아|마세요|마라|않/,
      meta: /설명|로직|버그|동작|작동|어떻게|원리|의미|무엇|무슨/,
      strong: /스크루지\s*(?:처럼|로\s*(?:답|말|얘기|대답)|으로\s*(?:답|말))/,
    },
  },
  en: {
    reminder: {
      head: 'SCROOGE active',
      modeClose: '. ',
      full: 'Drop articles/filler/pleasantries, fragments OK, short synonyms. ',
      suffix: 'Code blocks, errors, technical terms verbatim. Security / irreversible actions: normal prose.',
      flag: { prefix: ' Flags: ', sep: ', ', suffix: ' active.' },
    },
    countermand: 'SCROOGE OFF — compression mode deactivated. Return to your normal register from this turn on.',
    flagHint: { lean: 'lean (minimal code)' },
    savings: { full: { ratio: 0.67 } },
    nlCue: {
      name: /scrooge/i,
      // The "be a token miser" persona stays on the EN side because it names Scrooge
      // unambiguously even without the literal word.
      activate: /\btalk\s+like\s+(?:a\s+)?scrooge\b|\bscrooge\s+mode\b|\bbe\s+(?:a\s+)?token\s+miser\b|\b(?:activate|enable|turn\s+on)\s+scrooge\b/i,
      off: /\b(?:stop|disable|turn\s+off|deactivate)\s+scrooge\b|\bscrooge(?:\s+mode)?\s+off\b/i,
      // Bare "no" is excluded: it appears in benign phrases ("no rush", "no need").
      negate: /\b(?:don'?t|do\s+not|never)\b/i,
      // EN cues are word-bounded so they don't fire on substrings ("how" inside "show").
      meta: /\b(?:explain|logic|bug|debug|how|what|why|mean(?:s|ing)?)\b/i,
      strong: /\btalk\s+like\s+(?:a\s+)?scrooge\b|\bbe\s+(?:a\s+)?token\s+miser\b/i,
    },
  },
};

// Language lookup. Returns the row, or null for an unknown language (callers below
// degrade to a safe fallback rather than crashing on a registry lang with no meta).
export function langMeta(lang) {
  return LANG_META[lang] || null;
}

// Languages that carry activation metadata, in table order (= ko, en). The NL
// parser and any future N-ary dispatch iterate this, so a new table row joins the
// dispatch automatically; appended rows (e.g. a test-injected `xx`) get lowest
// priority and never disturb the ko→en precedence.
export function metaLangs() {
  return Object.keys(LANG_META);
}

// Fixed savings entry { ratio } for a (lang, dial), or null when absent.
export function savingsMeta(lang, dial) {
  const s = LANG_META[lang] && LANG_META[lang].savings;
  return (s && s[dial]) || null;
}

// Compact per-flag behavior labels for the active language; an unmapped flag (or a
// language with no flagHint map) degrades to the bare flag name.
export function flagHints(lang, flags) {
  const map = (LANG_META[lang] && LANG_META[lang].flagHint) || {};
  return flags.map((f) => map[f] || f);
}

// Per-turn reminder (the high-frequency injection). Assembled language-agnostically
// from the table row: `{head} ({label}/{dial}){modeClose}{body}{suffix}{flagClause}`.
// An unknown language (no table row — guarded against by test_registry_parity, so
// unreachable for a real registry lang) falls back to the en row, label and all,
// exactly matching the original hook's en fallthrough (which hardcoded "en" in the
// header). For ko/en the label IS the lang, so output stays byte-identical.
export function buildReminder(lang, dial, flags = []) {
  // For an unknown lang, every piece — body, suffix, flag hints, AND the header label
  // — comes from the en row, matching the original en fallthrough exactly.
  const effLang = LANG_META[lang] ? lang : 'en';
  const r = LANG_META[effLang].reminder;
  const flagClause = flags.length
    ? `${r.flag.prefix}${flagHints(effLang, flags).join(r.flag.sep)}${r.flag.suffix}`
    : '';
  return `${r.head} (${effLang}/${dial})${r.modeClose}${r[dial]}${r.suffix}${flagClause}`;
}

// Deactivation countermand, localized to the register that was active when off fired.
// Unknown language falls back to the en line (matches the original hook).
export function buildCountermand(lang) {
  return (LANG_META[lang] || LANG_META.en).countermand;
}
