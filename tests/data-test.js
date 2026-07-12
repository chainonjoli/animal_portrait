// ============================================================
// データ整合性テスト — node tests/data-test.js で実行
// ============================================================
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ctx = {};
vm.createContext(ctx);
const source = fs.readFileSync(path.join(__dirname, '../js/data.js'), 'utf8');
// const宣言はコンテキストに載らないため、評価結果として取り出す
const { CHARACTER_TABLE, ANIMAL_PROFILES, GROUPS, CHAR_DETAILS, COMPATIBILITY, getCharacterNumber, getCharacterInfo, diagnoseByBirthday, calculateCompatibility, analyzeGroupBalance } =
  vm.runInContext(source + '\n;({ CHARACTER_TABLE, ANIMAL_PROFILES, GROUPS, CHAR_DETAILS, COMPATIBILITY, getCharacterNumber, getCharacterInfo, diagnoseByBirthday, calculateCompatibility, analyzeGroupBalance });', ctx);

let failures = 0;
function assert(cond, msg) {
  if (cond) {
    console.log(`  ✅ ${msg}`);
  } else {
    console.error(`  ❌ ${msg}`);
    failures++;
  }
}

console.log('▼ キャラクターテーブル');
assert(CHARACTER_TABLE.length === 60, 'テーブルは60件');
assert(CHARACTER_TABLE.every((c, i) => c.n === i + 1), 'No.1〜60が順番に並んでいる');
assert(new Set(CHARACTER_TABLE.map(c => c.name)).size === 60, 'キャラクター名に重複がない');
assert(CHARACTER_TABLE.every(c => ANIMAL_PROFILES[c.animal]), '全キャラの動物プロフィールが存在する');
assert(CHARACTER_TABLE.every(c => c.group === ANIMAL_PROFILES[c.animal].group), 'テーブルとプロフィールのグループが一致');

console.log('▼ グループ定義');
const allMembers = Object.values(GROUPS).flatMap(g => g.members);
assert(allMembers.length === 12 && new Set(allMembers).size === 12, '3グループで12動物をカバー');
assert(Object.keys(ANIMAL_PROFILES).every(a => allMembers.includes(a)), '全動物がいずれかのグループに所属');

console.log('▼ キャラクター個別解説');
assert(Object.keys(CHAR_DETAILS).length === 60, 'CHAR_DETAILSは60件');
assert(CHARACTER_TABLE.every(c => typeof CHAR_DETAILS[c.n] === 'string' && CHAR_DETAILS[c.n].length >= 20), '全キャラに20文字以上の解説がある');

console.log('▼ 診断ロジック');
assert(getCharacterNumber(1926, 1, 1) === 27, '基準日 1926-01-01 は No.27');
assert(getCharacterNumber(1990, 1, 1) === getCharacterNumber(1990, 3, 2), '60日で一周する');
// animal_naviと同一アルゴリズムであること（プリセットの検算）
assert(getCharacterNumber(1999, 1, 23) === 12, '永瀬廉 1999-01-23 → No.12');
assert(getCharacterNumber(1993, 5, 17) === 35, '岩本照 1993-05-17 → No.35');
assert(getCharacterNumber(1997, 1, 29) === 8, '平野紫耀 1997-01-29 → No.8');
assert(getCharacterInfo(0) === null && getCharacterInfo(61) === null, '範囲外の番号はnull');
const r = diagnoseByBirthday(1995, 4, 1);
assert(r && r.profile && r.group && r.name, 'diagnoseByBirthday() が完全な結果を返す');

console.log('▼ 相性ロジック');
const a = getCharacterInfo(13); // 狼 EARTH
const b = getCharacterInfo(11); // こじか MOON
const compat = calculateCompatibility(a, b);
assert(compat.score === 75, '狼×こじか: グループ65 + ボーナス10 = 75');
assert(Object.keys(COMPATIBILITY.groupCompat).length === 9, 'グループ相性は9通り全て定義済み');
const balance = analyzeGroupBalance([a, b, getCharacterInfo(1)]);
assert(balance.counts.EARTH === 1 && balance.counts.MOON === 1 && balance.counts.SUN === 1, 'バランス集計が正しい');

console.log('');
if (failures > 0) {
  console.error(`${failures} 件のテストが失敗しました`);
  process.exit(1);
}
console.log('すべてのテストに合格しました 🎉');
