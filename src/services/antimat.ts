const badPatterns = [
  '.*(о|а)н(о|а)нист.*',
  '.*лошар.*',
  '.*к(а|о)злина.*',
  '.*сволоч(ь|ъ|и|уга|ам|ами).*',
  '.*урод(ы|у|ам|ина|ины).*',
  '.*бля(т|д).*',
  '.*г(а|о)ндо.*',
  '.*м(а|о)нд(а|о).*',
  '.*сучк(а|у|и|е|ой|ай).*',
  '.*придур(ок|ки).*',
  '.*д(е|и)би(л|лы).*',
  '.*сос(ать|и|ешь|у).*',
  '.*залуп.*',
  '.*мудак.*',
  '.*мудил.*',
  '.*шалав(а|ы|ам|е|ами).*',
  '.*пр(а|о)ст(и|е)т(у|е)тк(а|и|ам|е|ами).*',
  '.*шлюх(а|и|ам|е|ами).*',
  '.*ху(й|и|я|е|л(и|е)).*',
  '.*п(и|е|ы)зд.*',
  '.*бл(я|т|д).*',
  '.*(с|сц)ук(а|о|и|у).*',
  '.*(е|ё)б(а|н).*',
  '.*(д(о|а)лб(о|а)|разъ|разь|за|вы|по)ебы*.*',
  '.*пид(а|о|е)р.*',
  '.*хер(н|о).*',
  '.*траха(л|т).*',
  '.*падл(а|у|е|ы).*',
  '.*мурло.*',
  '^ёб$',
  '.*г(о|а)вно.*',
  '.*дерьм(о|а).*',
  '.*еблан.*',
  '.*мозг(о|а)еб.*',
  '.*осл(о|а)еб.*',
  '.*у(ё|е)б.*',
  '^на(ё|е)б.*',
];

const goodPatterns = [
  '.*психу.*',
  '.*к(о|а)манд.*',
  '.*истр(е|и)блять.*',
  '.*л(о|а)х(о|а)трон.*',
  '.*(о|а)ск(о|а)рблять.*',
  'хул(е|и)ган',
  '.*м(а|о)нд(а|о)рин.*',
  '.*р(а|о)ссл(а|о)блять.*',
  '.*п(о|а)тр(е|и)блять.*',
  '.*@.*\\.(ру|сом|нет).*',
  '.*страхуй.*',
  '.*одномандатн.*',
  '.*психуй.*',
  '.*махер.*',
];

const lettersLatin2Ru: Record<string, string> = {
  a: 'а',
  b: 'в',
  c: 'с',
  e: 'е',
  f: 'ф',
  g: 'д',
  h: 'н',
  i: 'и',
  k: 'к',
  l: 'л',
  m: 'м',
  n: 'н',
  o: 'о',
  p: 'р',
  r: 'р',
  s: 'с',
  t: 'т',
  u: 'у',
  v: 'в',
  x: 'х',
  y: 'у',
  w: 'ш',
  z: 'з',
};

const convertLatinLettersToRu = (word: string) => {
  let converted = word;

  for (let j = 0; j < converted.length; j++) {
    for (const latinChar of Object.keys(lettersLatin2Ru)) {
      if (converted.charAt(j) === latinChar)
        converted =
          converted.slice(0, j) +
          lettersLatin2Ru[latinChar] +
          // eslint-disable-next-line unicorn/prefer-string-slice
          converted.substring(j + 1, converted.length);
    }
  }

  return converted;
};

const removeBadSymbols = (text: string) =>
  text.replace(/[^\d\sA-Za-zЁА-яё]/g, '');

const isInGoodPatterns = (word: string) =>
  goodPatterns.some(pattern => {
    const re = new RegExp(pattern);
    return re.test(word);
  });

const isInBadPatterns = (word: string) =>
  badPatterns.some(pattern => {
    const re = new RegExp(pattern);
    return re.test(word);
  });

export const containsMat = (originalText: string): [boolean, string[]] => {
  const text = removeBadSymbols(originalText.toLowerCase());
  const words = text
    .split(' ')
    .filter(w => !!w)
    .map(w => convertLatinLettersToRu(w));
  let hasMat = false;
  const suspiciousWords = [];

  for (const word of words) {
    if (isInGoodPatterns(word)) {
      continue;
    }

    if (isInBadPatterns(word)) {
      suspiciousWords.push(word);
      hasMat = true;
    }
  }

  return [hasMat, suspiciousWords];
};
