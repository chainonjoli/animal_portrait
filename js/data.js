// ============================================================
// MY推し関係性相関図 - データ & 算出ロジック
// ============================================================

// ---- グループ定義（三分類：MOON/EARTH/SUN）----
const GROUPS = {
  MOON: {
    id: 'MOON', name: '月グループ', emoji: '🌙',
    color: '#a78bfa', gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
    description: '「誰と」を大切にする、心の絆を重んじるチーム。',
    howToTalk: 'とにかく話が長い！頭に浮かんだことを整理することなく、そのまま口に出すので、どんどん時間だけが過ぎていきます。句点がなく「〜でね〜でね」と果てしなく続く話を、最後まで聞いてもらえると大満足。',
    eatingValue: '「誰と」食べるかが大事。食事は会話が目的。相手次第で料理の味も変わって感じるほどです。気の合った友達と楽しくおしゃべりしながら食事を共にするのは至福のひととき。',
    members: ['こじか', 'たぬき', '黒ひょう', 'ひつじ'],
  },
  EARTH: {
    id: 'EARTH', name: '地球グループ', emoji: '🌍',
    color: '#34d399', gradient: 'linear-gradient(135deg, #059669, #34d399)',
    description: '「何を」重視する、実力と実績のしっかり者チーム。',
    howToTalk: '話は要点のみ。結論から。回りくどい言い方や建前だけの話をするのは時間の無駄。自分の意見はハッキリと伝え、相手にもそれを求めます。短いセンテンスの箇条書きのような話し方。',
    eatingValue: '「何を」食べるかが大事。文字通り「食事」をすることが最大目的。効率的に栄養を摂取することがゴール。費用対効果を重要視。',
    members: ['猿', '虎', '子守熊', '狼'],
  },
  SUN: {
    id: 'SUN', name: '太陽グループ', emoji: '☀️',
    color: '#fbbf24', gradient: 'linear-gradient(135deg, #d97706, #fbbf24)',
    description: '「どこで」にこだわる、直感と感性の天才チーム。',
    howToTalk: '心に浮かんだことを感情のままに表現。感覚で話すのでMOONやEARTHにはイマイチ理解できません。擬音が多く、なんでも大げさに伝えます。',
    eatingValue: '「どこで」食べるかが大事。場所やシチュエーションといった「環境」重視。どんな雰囲気で食べるかを大切にします。外食も大好き。TPOが命。',
    members: ['チータ', 'ライオン', 'ゾウ', 'ペガサス'],
  }
};

// ---- 12動物キャラクター詳細プロフィール ----
const ANIMAL_PROFILES = {
  '狼': {
    emoji: '🐺', color: '#546e7a', bgColor: '#eceff1', group: 'EARTH',
    keyword: '一匹狼のこだわり派',
    catchphrase: 'やっぱり変わってるね',
    personality: '自分だけの世界を大切にするこだわり人間。ペースを乱されることを嫌い、独自の時間配分で動く。不器用だが情は深い。',
    love: '一目惚れタイプ。気になるとずっと見ている。',
    money: '自分が納得したものにだけお金をかける。',
    vocation: '職人・プログラマー・研究者・カメラマン',
    lucky: '脱器用貧乏。好きなことを見つけてトコトン打ち込んでみる',
    onePhrase: 'やっぱり変わってるね（人と違うことを指摘されるのが無上の喜び）',
    responsibility: '会社や仕事に対する責任感ではなく、人としてすべきことをしようとするタイプ。自分で納得しない限り責任は感じない。',
  },
  'こじか': {
    emoji: '🦌', color: '#e65100', bgColor: '#fff3e0', group: 'MOON',
    keyword: 'いつも人のそばにいたい',
    catchphrase: 'どんなときも味方だよ',
    personality: '甘え上手で人懐こい。初対面は警戒するが、慣れるとべったり。情が深く、裏切りにはめっぽう弱い。',
    love: '好意は大胆にストレート。ただし人見知りでなかなか前に出られないことも。',
    money: '計画的に貯めるが、友人との交際費は惜しまない。',
    vocation: '保育士・看護師・カウンセラー・動物関連',
    lucky: '本物に接する。美術品、自然、その道の達人まで"本物"が道を開く',
    onePhrase: 'どんなときも味方だよ（大事なのは絆と安心感）',
    responsibility: '仕事は堅実に取り組むが、特に責任感という意識はない。真面目で几帳面なだけ。困った時は、可愛がってくれる上司や幕に助けてくれる。',
  },
  '猿': {
    emoji: '🐵', color: '#f57f17', bgColor: '#fff9c4', group: 'EARTH',
    keyword: '目の前のものに食らいつけ',
    catchphrase: '一緒にいると楽しい',
    personality: 'おだてに乗りやすいノリのいい人気者。器用貧乏になりがちだが、頭の回転が早く臨機応変力はピカイチ。',
    love: 'おだてに乗りやすいので、褒め言葉はおいしい。',
    money: '臨機応変に稼ぐ。アイデアで勝負。',
    vocation: '営業・企画・芸能マネージャー・飲食店経営',
    lucky: '瞑想。ひとりで静かに内観すると目標が明確になる',
    onePhrase: '一緒にいると楽しい（おだてに乗りやすいので褒め言葉はおいしい）',
    responsibility: '責任感というより、ただ目前のものに食いついていくタイプ。攻めには強いが、守りになると逃げ腰。責任の所在もうやむやに。',
  },
  'チータ': {
    emoji: '🐆', color: '#ffa000', bgColor: '#fff8e1', group: 'SUN',
    keyword: '超ポジティブ',
    catchphrase: 'キミならきっと成功する',
    personality: 'まさにポジティブの塊。超プラス思考で前向き。諦めも早いが、切り替えの早さは天才的。新しいもの好き。',
    love: '「成功」という言葉が世界でいちばん好き。ロマンチストな情熱家。',
    money: '入ってきたぶんだけ使う。宵越しの銭は持たない。',
    vocation: 'ベンチャー起業家・営業・スポーツ選手・冒険家',
    lucky: '恋愛成就。恋がうまくいっていれば万事よし',
    onePhrase: 'キミならきっと成功する（"成功"という言葉が世界でいちばん好き）',
    responsibility: '成功願望や好奇心から仕事に着手、責任感からではない。攻撃の時はパワフルに立ち向かうが、守備の時は根気が続かず、意欲を失う。',
  },
  '黒ひょう': {
    emoji: '🐈‍⬛', color: '#2c3e50', bgColor: '#e8eaf6', group: 'MOON',
    keyword: 'スマートでおしゃれな自信家',
    catchphrase: 'センスいいね',
    personality: 'メンツやプライドを重んじる。おしゃれで美意識が高い。正義感が強く不正を許さない。',
    love: '「センスいいね」が最高の褒め言葉。努力は人に見せないクールな一面も。',
    money: '気がついたら「ない！」タイプ。お金は使ってこそ輝く。',
    vocation: 'アナウンサー・ファッションデザイナー・マスコミ・デザイナー',
    lucky: '人生の師を見つける。良き師との出会いで人生が大きく豊かに変わる',
    onePhrase: 'センスいいね（これに尽きる）',
    responsibility: '密かにトップを狙う自信家ゆえ仕事はきちんとこなし、任せて安心。プライドの高さから、ミスを認めたり、失敗の責任を取りたがらない。',
  },
  'ライオン': {
    emoji: '🦁', color: '#935116', bgColor: '#fff7ed', group: 'SUN',
    keyword: 'オンリーワンよりナンバーワン',
    catchphrase: '特別な人だもん',
    personality: '徹底的にこだわる完璧主義者。責任感が強く、自分の味方は最後まで守る。王様扱いに弱い。',
    love: '「特別な人だもん」が最高の言葉。漠然と愛してくれる人を求める。',
    money: '「釣りはいらない」な大物感。節約も貯蓄もさらっとこなす。',
    vocation: '大手企業・国家公務員・経営幹部・医師',
    lucky: '自分の感性に響いたものの情報を惜しみなく人に伝えると世界が広がる',
    onePhrase: '特別な人だもん（"選ばれし民"的ワードが大好物。センスを褒めて）',
    responsibility: '仕事に対する責任感が強く、けじめのない人が許せない完璧主義者。リスクをものともせず、何が起きても弱音は吐かない。ただ、人を振り回す。',
  },
  '虎': {
    emoji: '🐯', color: '#e67e22', bgColor: '#fff3e0', group: 'EARTH',
    keyword: '有言実行',
    catchphrase: 'キミにしか相談できない',
    personality: '自由・平等・博愛主義。面倒見がよく、親分肌。仕事とプライベートをきっちり分ける。バランス感覚に優れた親分。',
    love: '頼られると親分肌・姉御肌が爆発！「キミにしか相談できない」が一番刺さる。',
    money: 'マネーの虎。抜群の金銭感覚の持ち主。',
    vocation: '実業家・企業経営・会計士・プロスポーツ選手',
    lucky: '逆境がバネになる。逃げず、ひるまず、迎え撃って吉！',
    onePhrase: 'キミにしか相談できない（頼られると親分肌・姉御肌が爆発）',
    responsibility: '責任感の強さは12キャラ中トップ。真摯な責任感だけでなく、人に迷惑をかけたくない思いで、自分を追い詰めて、部下の責任もしっかり取るタイプ。',
  },
  'たぬき': {
    emoji: '🦝', color: '#795548', bgColor: '#efebe9', group: 'MOON',
    keyword: '笑顔は敵をつくらない',
    catchphrase: '一緒にいるとほっとする',
    personality: 'どんな相手とも上手く合わせられる。いつも笑顔で場を和ませ、敵を作りにくい。古いものや歴史、実績を重んじる。',
    love: '「一緒にいるとほっとする」が一番のプロポーズ。じわじわ愛が深まるタイプ。',
    money: '財運があるのでお金はまわる。蓄える才能あり。',
    vocation: '司会者・アナウンサー・教師・コンサルタント',
    lucky: '人と会う。老若男女問わず交流すると運気UP',
    onePhrase: '一緒にいるとほっとする（和みのプロなのでその技を称える）',
    responsibility: '責任感というより、真面目で適当ができないタイプ。期限の管理が甘く、頼まれると何でも引き受けてパニックになるため、無責任と思われることも。',
  },
  '子守熊': {
    emoji: '🐨', color: '#7f8c8d', bgColor: '#f0f4f8', group: 'EARTH',
    keyword: '最後に勝つのは自分',
    catchphrase: '夢は叶うよ',
    personality: 'サービス精神旺盛で人が喜ぶ顔を見るのが好き。損得勘定に長け、倹約家で無駄が嫌い。ロマンチストだが超現実的。',
    love: '先制攻撃が一番効果的。すぐに結論を出さないのでじっくり待って。',
    money: '経済観念抜群で財テクも得意。コツコツ型。',
    vocation: 'ミュージシャン・作曲家・声優・アロマセラピスト',
    lucky: 'いつも心に太陽と芸術を。音楽や映画、美術に接していると才能が開花',
    onePhrase: '夢は叶うよ',
    responsibility: '責任感ではなく、評価のための仕事の完遂こそ第一。負ける勝負はしないので、失敗もなし。苦手な仕事は能力のある部下にご馳走してでも任せてしまう。',
  },
  'ゾウ': {
    emoji: '🐘', color: '#1565c0', bgColor: '#e3f2fd', group: 'SUN',
    keyword: '努力と根性のムードメーカー',
    catchphrase: 'よく頑張ったね',
    personality: '根は真面目で正直。力強い行動力とリーダーシップがある。デリケートな一面も隠し持つ努力家。',
    love: '正面から堂々と攻めましょう。見てくれている人がいるとしみじみ嬉しい。',
    money: '一攫千金のギャンブラー精神。大きな数字に強い。',
    vocation: '国家公務員・政治家・警察官・医師・パイロット',
    lucky: '精神世界に触れる。努力や根性とは違う世界をのぞいてみる',
    onePhrase: 'よく頑張ったね（見てくれてる人がいるとしみじみ嬉しい）',
    responsibility: '手抜きせず今日のことは今日のうちに済ませるタイプ。プライドの高さから、受けた仕事は後には引けず、自分を追い詰めて慎重に熱心に打ち込む。',
  },
  'ひつじ': {
    emoji: '🐑', color: '#d63384', bgColor: '#fce4ec', group: 'MOON',
    keyword: '仲よきことは美しきかな',
    catchphrase: 'みんなも行くよ',
    personality: '「みんな仲良く」がテーマ。寂しがり屋で一人ぼっちが嫌い。客観的に人間関係を観察でき、情報を収集する。',
    love: '「みんなも行くよ」が背中を押す魔法の言葉。フレンドリーな対応が基本。',
    money: '小銭より紙幣が好き。蓄財の達人。',
    vocation: '内科医・心理学者・冠婚葬祭業・カウンセラー',
    lucky: '先祖との縁が深くその加護が強い人。ちゃんとお墓参りをして感謝',
    onePhrase: 'みんなも行くよ（"みんな"がつくと腰が上がる）',
    responsibility: '組織を重んじ、律儀で義理堅く世間体を大切にする責任感の強いタイプ。無責任な人は嫌い。責任は自分に非がないと思ったら絶対とらない。',
  },
  'ペガサス': {
    emoji: '🦄', color: '#e91e8c', bgColor: '#fce4ec', group: 'SUN',
    keyword: '自由奔放',
    catchphrase: 'あなたの感性はスゴイ',
    personality: '感情の落差が激しい気分屋。天才肌で長所はすごいが後は平凡。束縛を極度に嫌い、ひらめきで飛び回る。',
    love: '「あなたの感性はスゴイ」が刺さる。具体的に何がスゴイかは言わなくてよい。自由を奪わないこと。',
    money: '財布にも羽が生えている。でもなぜかまわってくる。',
    vocation: 'クリエイティブ・CGデザイナー・新規開拓リーダー・芸術家',
    lucky: '多忙に過ごす。忙しく飛び回ることで個性も才能も開花する',
    onePhrase: 'あなたの感性はスゴイ（何がどうスゴイかは言わなくてもよし）',
    responsibility: '働くことは苦ではないが、頼まれると安請け合いをする。成り行き任せで無理はしないので、結果が出ないことも。自分に責任があるかどうかわからない。',
  },
};

// ---- 全60キャラクターデータ（番号順） ----
const CHARACTER_TABLE = [
  { n:1,  animal:'チータ',  group:'SUN',   name:'長距離ランナーのチータ', spell:'草花' },
  { n:2,  animal:'たぬき',  group:'MOON',  name:'社交家のたぬき', spell:'大樹' },
  { n:3,  animal:'猿',      group:'EARTH', name:'落ち着きのない猿', spell:'太陽' },
  { n:4,  animal:'子守熊',  group:'EARTH', name:'フットワークの軽い子守熊', spell:'ろうそく' },
  { n:5,  animal:'黒ひょう',group:'MOON',  name:'面倒見のいい黒ひょう', spell:'山' },
  { n:6,  animal:'虎',      group:'EARTH', name:'愛情あふれる虎', spell:'大地' },
  { n:7,  animal:'チータ',  group:'SUN',   name:'全力疾走するチータ', spell:'金属' },
  { n:8,  animal:'たぬき',  group:'MOON',  name:'磨き上げられたたぬき', spell:'宝石' },
  { n:9,  animal:'猿',      group:'EARTH', name:'大きな志をもった猿', spell:'海' },
  { n:10, animal:'子守熊',  group:'EARTH', name:'母性豊かな子守熊', spell:'雨露' },
  { n:11, animal:'こじか',  group:'MOON',  name:'正直なこじか', spell:'草花' },
  { n:12, animal:'ゾウ',    group:'SUN',   name:'人気者のゾウ', spell:'大樹' },
  { n:13, animal:'狼',      group:'EARTH', name:'ネアカの狼', spell:'太陽' },
  { n:14, animal:'ひつじ',  group:'MOON',  name:'協調性のないひつじ', spell:'ろうそく' },
  { n:15, animal:'猿',      group:'EARTH', name:'どっしりとした猿', spell:'山' },
  { n:16, animal:'子守熊',  group:'EARTH', name:'コアラのなかの子守熊', spell:'大地' },
  { n:17, animal:'こじか',  group:'MOON',  name:'強い意志をもったこじか', spell:'金属' },
  { n:18, animal:'ゾウ',    group:'SUN',   name:'デリケートなゾウ', spell:'宝石' },
  { n:19, animal:'狼',      group:'EARTH', name:'放浪の狼', spell:'海' },
  { n:20, animal:'ひつじ',  group:'MOON',  name:'物静かなひつじ', spell:'雨露' },
  { n:21, animal:'ペガサス',group:'SUN',   name:'落ち着きのあるペガサス', spell:'草花' },
  { n:22, animal:'ペガサス',group:'SUN',   name:'強靱な翼をもつペガサス', spell:'大樹' },
  { n:23, animal:'ひつじ',  group:'MOON',  name:'無邪気なひつじ', spell:'太陽' },
  { n:24, animal:'狼',      group:'EARTH', name:'クリエイティブな狼', spell:'ろうそく' },
  { n:25, animal:'狼',      group:'EARTH', name:'穏やかな狼', spell:'山' },
  { n:26, animal:'ひつじ',  group:'MOON',  name:'粘り強いひつじ', spell:'大地' },
  { n:27, animal:'ペガサス',group:'SUN',   name:'波乱に満ちたペガサス', spell:'金属' },
  { n:28, animal:'ペガサス',group:'SUN',   name:'優雅なペガサス', spell:'宝石' },
  { n:29, animal:'ひつじ',  group:'MOON',  name:'チャレンジ精神旺盛なひつじ', spell:'海' },
  { n:30, animal:'狼',      group:'EARTH', name:'順応性のある狼', spell:'雨露' },
  { n:31, animal:'こじか',  group:'MOON',  name:'リーダーとなるこじか', spell:'草花' },
  { n:32, animal:'猿',      group:'EARTH', name:'気分屋の猿', spell:'大樹' },
  { n:33, animal:'チータ',  group:'SUN',   name:'足腰の強いチータ', spell:'太陽' },
  { n:34, animal:'たぬき',  group:'MOON',  name:'大器晩成のたぬき', spell:'ろうそく' },
  { n:35, animal:'ゾウ',    group:'SUN',   name:'悠然と構えるゾウ', spell:'山' },
  { n:36, animal:'虎',      group:'EARTH', name:'慈悲深い虎', spell:'大地' },
  { n:37, animal:'こじか',  group:'MOON',  name:'しっかり者のこじか', spell:'金属' },
  { n:38, animal:'猿',      group:'EARTH', name:'つき合い上手な猿', spell:'宝石' },
  { n:39, animal:'チータ',  group:'SUN',   name:'品格のあるチータ', spell:'海' },
  { n:40, animal:'たぬき',  group:'MOON',  name:'頼りになるたぬき', spell:'雨露' },
  { n:41, animal:'ライオン',group:'SUN',   name:'感情的なライオン', spell:'草花' },
  { n:42, animal:'ゾウ',    group:'SUN',   name:'まっしぐらに突き進むゾウ', spell:'大樹' },
  { n:43, animal:'虎',      group:'EARTH', name:'動きまわる虎', spell:'太陽' },
  { n:44, animal:'黒ひょう',group:'MOON',  name:'情熱的な黒ひょう', spell:'ろうそく' },
  { n:45, animal:'子守熊',  group:'EARTH', name:'サービス精神旺盛な子守熊', spell:'山' },
  { n:46, animal:'猿',      group:'EARTH', name:'守りの猿', spell:'大地' },
  { n:47, animal:'たぬき',  group:'MOON',  name:'人間味あふれるたぬき', spell:'金属' },
  { n:48, animal:'チータ',  group:'SUN',   name:'品格のあるチータ', spell:'宝石' },
  { n:49, animal:'虎',      group:'EARTH', name:'ゆったりとした悠然の虎', spell:'海' },
  { n:50, animal:'黒ひょう',group:'MOON',  name:'落ち込みの激しい黒ひょう', spell:'雨露' },
  { n:51, animal:'ライオン',group:'SUN',   name:'我が道を行くライオン', spell:'草花' },
  { n:52, animal:'ライオン',group:'SUN',   name:'統率力のあるライオン', spell:'大樹' },
  { n:53, animal:'黒ひょう',group:'MOON',  name:'感情豊かな黒ひょう', spell:'太陽' },
  { n:54, animal:'虎',      group:'EARTH', name:'楽天的な虎', spell:'ろうそく' },
  { n:55, animal:'虎',      group:'EARTH', name:'パワフルな虎', spell:'山' },
  { n:56, animal:'黒ひょう',group:'MOON',  name:'気取らない黒ひょう', spell:'大地' },
  { n:57, animal:'ライオン',group:'SUN',   name:'悠然と構えるライオン', spell:'金属' },
  { n:58, animal:'ライオン',group:'SUN',   name:'華やかなライオン', spell:'宝石' },
  { n:59, animal:'黒ひょう',group:'MOON',  name:'束縛を嫌う黒ひょう', spell:'海' },
  { n:60, animal:'虎',      group:'EARTH', name:'コートのなかの虎', spell:'雨露' },
];

// ---- 相性マトリクス（三分類ベース + 12動物別） ----
const COMPATIBILITY = {
  // 三分類相性
  groupCompat: {
    'MOON-MOON': { score: 85, label: '安心感抜群', desc: '話が尽きない最高の共感コンビ。一緒にいるとホッとする空気感。' },
    'MOON-EARTH': { score: 65, label: '学び合い', desc: 'MOONの感性とEARTHの実行力が補い合う。テンポの違いを楽しめたら最強。' },
    'MOON-SUN': { score: 70, label: 'ワクワク', desc: 'SUNの華やかさにMOONが癒やされる。刺激と安心のバランスが鍵。' },
    'EARTH-EARTH': { score: 80, label: '実力派タッグ', desc: '互いの実力を認め合う最強のビジネスパートナー。目標に向かって一直線。' },
    'EARTH-SUN': { score: 75, label: '化学反応', desc: 'SUNのひらめきをEARTHが形にする。化学反応が起きたら無敵。' },
    'SUN-SUN': { score: 90, label: '爆発的シナジー', desc: '感性×感性で誰にも真似できない世界を生む。ノリと勢いは宇宙級。' },
    'EARTH-MOON': { score: 65, label: '学び合い', desc: 'MOONの感性とEARTHの実行力が補い合う。テンポの違いを楽しめたら最強。' },
    'SUN-MOON': { score: 70, label: 'ワクワク', desc: 'SUNの華やかさにMOONが癒やされる。刺激と安心のバランスが鍵。' },
    'SUN-EARTH': { score: 75, label: '化学反応', desc: 'SUNのひらめきをEARTHが形にする。化学反応が起きたら無敵。' },
  },
  // 個別動物相性ボーナス
  animalBonus: {
    '狼-こじか': 10,   'こじか-狼': 10,
    'たぬき-ひつじ': 8, 'ひつじ-たぬき': 8,
    '虎-ゾウ': 7,       'ゾウ-虎': 7,
    'ライオン-チータ': 9, 'チータ-ライオン': 9,
    '猿-子守熊': 6,     '子守熊-猿': 6,
    '黒ひょう-ペガサス': 8, 'ペガサス-黒ひょう': 8,
    '狼-虎': 5,         '虎-狼': 5,
    'こじか-ひつじ': 7, 'ひつじ-こじか': 7,
    'ペガサス-ライオン': 6, 'ライオン-ペガサス': 6,
  }
};

// ---- 関係性タイプ定義 ----
const RELATIONSHIP_TYPES = {
  soulmate: { label: '✨ 魂の共鳴', color: '#e91e63', minScore: 90 },
  bestPartner: { label: '💕 最強コンビ', color: '#9c27b0', minScore: 80 },
  goodVibes: { label: '🌈 いい空気感', color: '#2196f3', minScore: 70 },
  learning: { label: '📚 成長し合える', color: '#4caf50', minScore: 60 },
  challenge: { label: '⚡ スパイス関係', color: '#ff9800', minScore: 0 },
};

// ============================================================
// 算出ロジック
// ============================================================

/**
 * 生年月日から本質キャラクター番号 (1〜60) を取得
 */
function getCharacterNumber(year, month, day) {
  const base = Date.UTC(1926, 0, 1);
  const target = Date.UTC(year, month - 1, day);
  const diffMs = target - base;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const idx0 = ((26 + diffDays) % 60 + 60) % 60;
  return idx0 + 1;
}

/**
 * キャラクター番号から詳細情報を取得
 */
function getCharacterInfo(charNum) {
  const num = parseInt(charNum, 10);
  if (isNaN(num) || num < 1 || num > 60) return null;
  const data = CHARACTER_TABLE[num - 1];
  const profile = ANIMAL_PROFILES[data.animal];
  const group = GROUPS[data.group];
  return { number: num, ...data, profile, group };
}

/**
 * 生年月日から診断
 */
function diagnoseByBirthday(year, month, day) {
  const charNum = getCharacterNumber(year, month, day);
  return getCharacterInfo(charNum);
}

/**
 * 2人の相性スコアを算出
 */
function calculateCompatibility(char1, char2) {
  const groupKey = `${char1.group.id}-${char2.group.id}`;
  const baseCompat = COMPATIBILITY.groupCompat[groupKey] || { score: 50, label: '未知', desc: '' };
  
  const animalKey = `${char1.profile ? char1.animal : ''}-${char2.profile ? char2.animal : ''}`;
  const bonus = COMPATIBILITY.animalBonus[animalKey] || 0;
  
  const finalScore = Math.min(100, baseCompat.score + bonus);
  
  let relType = RELATIONSHIP_TYPES.challenge;
  for (const [key, type] of Object.entries(RELATIONSHIP_TYPES)) {
    if (finalScore >= type.minScore) {
      relType = type;
      break;
    }
  }
  
  return {
    score: finalScore,
    label: baseCompat.label,
    description: baseCompat.desc,
    relationship: relType,
    bonus: bonus > 0 ? `${char1.name || char1.animal}×${char2.name || char2.animal}の特別ボーナス +${bonus}` : null,
  };
}

/**
 * グループ全体の三分類バランスを分析
 */
function analyzeGroupBalance(members) {
  const balance = { MOON: 0, EARTH: 0, SUN: 0 };
  members.forEach(m => {
    if (m && m.group) balance[m.group.id]++;
  });
  const total = members.length;
  return {
    counts: balance,
    percentages: {
      MOON: Math.round((balance.MOON / total) * 100),
      EARTH: Math.round((balance.EARTH / total) * 100),
      SUN: Math.round((balance.SUN / total) * 100),
    },
    dominant: Object.entries(balance).sort((a, b) => b[1] - a[1])[0][0],
  };
}
