// ============================================================
// OSHI PORTRAIT - メインアプリケーションロジック
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initNavigation();
  initTabs();
  initMenuTabs();
  initDiagnosis();
  initGroupDiagnosis();
  initEncyclopedia();
  initScrollAnimations();
});

// ============================================================
// Particles (Soft Pastel Circles)
// ============================================================
function initParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  
  // Soft pastel colors
  const colors = ['#a294c6', '#84a991', '#dfab76', '#df9892', '#f2ddaa'];
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    
    // Soft bubble-like circles
    const size = Math.random() * 15 + 8;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.opacity = (Math.random() * 0.15 + 0.05).toString();
    
    // Slow, drifting animation
    p.style.animationDuration = (Math.random() * 25 + 20) + 's';
    p.style.animationDelay = (Math.random() * 15) + 's';
    
    container.appendChild(p);
  }
}

// ============================================================
// Navigation
// ============================================================
function initNavigation() {
  const hamburger = document.getElementById('navHamburger');
  const links = document.getElementById('navLinks');
  if (hamburger && links) {
    hamburger.addEventListener('click', () => {
      links.classList.toggle('open');
      hamburger.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        hamburger.classList.remove('open');
      });
    });
  }
  
  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 200;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const h = sec.offsetHeight;
      const id = sec.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < top + h) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  });
}

// ============================================================
// Tabs (For Encyclopedia Filter)
// ============================================================
function initTabs() {
  document.querySelectorAll('.tabs').forEach(tabGroup => {
    tabGroup.querySelectorAll('.tab-btn').forEach(btn => {
      // Skip menu switcher tab buttons
      if (btn.id === 'tabBtnIndividual' || btn.id === 'tabBtnGroup') return;
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        const scope = btn.closest('section') || document;
        // Update buttons
        tabGroup.querySelectorAll('.tab-btn').forEach(b => {
          if (b.id !== 'tabBtnIndividual' && b.id !== 'tabBtnGroup') b.classList.remove('active');
        });
        btn.classList.add('active');
        // Update panels
        scope.querySelectorAll('.tab-panel').forEach(panel => {
          panel.classList.toggle('hidden', panel.id !== target);
        });
      });
    });
  });
}

// ============================================================
// Diagnosis Menu Tabs Switcher
// ============================================================
function initMenuTabs() {
  const btnIndividual = document.getElementById('tabBtnIndividual');
  const btnGroup = document.getElementById('tabBtnGroup');
  const panelIndividual = document.getElementById('panelIndividual');
  const panelGroup = document.getElementById('panelGroup');

  if (btnIndividual && btnGroup && panelIndividual && panelGroup) {
    btnIndividual.addEventListener('click', () => {
      btnIndividual.classList.add('active');
      btnGroup.classList.remove('active');
      panelIndividual.classList.remove('hidden');
      panelGroup.classList.add('hidden');
    });

    btnGroup.addEventListener('click', () => {
      btnGroup.classList.add('active');
      btnIndividual.classList.remove('active');
      panelGroup.classList.remove('hidden');
      panelIndividual.classList.add('hidden');
    });
  }
}

// ============================================================
// Individual Diagnosis (Menu A)
// ============================================================
function initDiagnosis() {
  const form = document.getElementById('diagnosisForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const year = parseInt(document.getElementById('birthYear').value);
    const month = parseInt(document.getElementById('birthMonth').value);
    const day = parseInt(document.getElementById('birthDay').value);
    if (!year || !month || !day) return;
    const result = diagnoseByBirthday(year, month, day);
    if (result) showDiagnosisResult(result);
  });
}

function showDiagnosisResult(info) {
  const container = document.getElementById('diagnosisResult');
  if (!container) return;
  const groupClass = info.group.id.toLowerCase();
  
  container.innerHTML = `
    <div class="result-animal-card glass-card" style="margin-top: 32px; border: 1px solid rgba(217, 167, 82, 0.25); background: #fff;">
      <span class="result-emoji">${info.profile.emoji}</span>
      <div class="result-name">${info.animal}</div>
      <div class="result-full-name font-playfair">${info.name}</div>
      <span class="result-group-badge ${groupClass}">
        ${info.group.emoji} ${info.group.name}
      </span>
      
      <div class="result-details">
        <div class="detail-item">
          <div class="detail-label">✦ MY THEME / キーワード</div>
          <div class="detail-text">${info.profile.keyword}</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">✦ PROFILE / 基本性格</div>
          <div class="detail-text">${info.profile.personality}</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">✦ TRIGGER WORD / キュンとする言葉</div>
          <div class="detail-text">${info.profile.onePhrase || info.profile.catchphrase}</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">✦ LOVE STYLE / 恋愛傾向</div>
          <div class="detail-text">${info.profile.love}</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">✦ MONEY MIND / お金センス</div>
          <div class="detail-text">${info.profile.money}</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">✦ RESPONSIBILITY / 責任感のカタチ</div>
          <div class="detail-text">${info.profile.responsibility || '—'}</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">✦ HAPPY ACTION / ハッピーアクション</div>
          <div class="detail-text">${info.profile.lucky || '—'}</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">✦ VOCATION / 向いていること</div>
          <div class="detail-text">${info.profile.vocation || '—'}</div>
        </div>
      </div>
      
      <div class="share-area" style="margin-top: 24px; display: flex; justify-content: center;">
        <button class="btn btn-gold" onclick="shareResult('${info.animal}', '${info.name}')" style="padding: 10px 28px;">
          <span>SHARE PORTRAIT</span>
          <span class="btn-sub-text">診断結果をシェアする</span>
        </button>
      </div>
    </div>

    <!-- Promotion Card (中盤CTA) -->
    <div class="glass-card text-center mt-32" style="border: 1px solid rgba(212, 175, 55, 0.25); padding: 32px 24px; background: #fff;">
      <p style="font-size: 1.1rem; color: var(--primary); font-weight: bold; margin-bottom: 16px;">
        無料診断はここまでです🐾
      </p>
      <p style="font-size: 0.85rem; color: var(--text-sub); line-height: 1.8; margin-bottom: 20px;">
        もっと詳しく知りたい方には、<br>
        あなた専用の<strong>「保存版アニマル気質レポート」</strong>をご用意しています。
      </p>
      <div style="display: inline-block; text-align: left; font-size: 0.85rem; color: var(--text-sub); line-height: 1.8; margin-bottom: 20px; border-left: 2px solid var(--primary); padding-left: 16px;">
        ✔ 才能<br>
        ✔ 恋愛傾向<br>
        ✔ 人間関係のクセ<br>
        ✔ 仕事での強み<br>
        ✔ 相性の良いタイプ<br>
        ✔ 気をつけたいポイント
      </div>
      <p style="font-size: 0.85rem; color: var(--text-sub); line-height: 1.8; margin-bottom: 24px;">
        を、読みやすいPDFにまとめてお届けします。
      </p>
      <p style="font-size: 0.9rem; color: var(--text-main); font-weight: bold; margin-bottom: 24px;">
        気になる方は公式ラインで<br>
        <span style="color: #e91e63;">「レポート希望」</span>と送ってください♡
      </p>
      <a href="https://lin.ee/YqRN22R" target="_blank" rel="noopener noreferrer" class="btn btn-gold" style="width: 100%; max-width: 320px; padding: 12px 24px; margin: 0 auto; display: block; text-decoration: none;">
        <span>無料診断をLINEで体験する</span>
      </a>
    </div>
  `;
  container.classList.add('active');
  container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function shareResult(animal, name) {
  const text = `✦ OSHI PORTRAIT - 12アニマル気質診断結果 ✦\n私の本質キャラは「${name}」(${animal})でした。\n#推し関係性相関図 #自分取扱説明書`;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('結果をクリップボードにコピーしました ✦');
    });
  }
}

// ============================================================
// Group Diagnosis (Menu B, C, D)
// ============================================================
let memberCount = 2;
const MAX_MEMBERS = 12;

function initGroupDiagnosis() {
  const addBtn = document.getElementById('addMemberBtn');
  if (addBtn) addBtn.addEventListener('click', addMemberRow);

  const analyzeBtn = document.getElementById('analyzeGroupBtn');
  if (analyzeBtn) analyzeBtn.addEventListener('click', analyzeGroup);

  // Preset buttons
  document.querySelectorAll('.btn-preset').forEach(btn => {
    btn.addEventListener('click', () => loadPreset(btn.dataset.preset));
  });
}

function addMemberRow() {
  if (memberCount >= MAX_MEMBERS) {
    showToast('メンバーの登録は最大12人までです');
    return;
  }
  memberCount++;
  const container = document.getElementById('memberInputs');
  const row = document.createElement('div');
  row.className = 'member-row';
  row.id = `memberRow${memberCount}`;
  row.style.cssText = 'display: flex; gap: 10px; align-items: center; padding: 12px 16px; background: var(--bg-dark); border-radius: var(--radius); border: 1px solid rgba(181,172,159,0.25);';
  
  const formattedNum = String(memberCount).padStart(2, '0');
  
  row.innerHTML = `
    <span class="member-num font-playfair" style="font-size: 0.95rem; font-weight: bold; color: var(--primary); width: 24px; text-align: center;">${formattedNum}</span>
    <input type="text" class="form-input name-input" placeholder="名前" data-idx="${memberCount}" style="flex: 2; padding: 8px 12px; font-size: 0.85rem; border: 1px solid rgba(181,172,159,0.3); border-radius: var(--radius-sm);">
    <input type="number" class="form-input number-input" placeholder="番号(1-60)" min="1" max="60" data-idx="${memberCount}" style="flex: 1; max-width: 100px; padding: 8px 12px; font-size: 0.85rem; border: 1px solid rgba(181,172,159,0.3); border-radius: var(--radius-sm);">
    <button type="button" class="remove-btn" onclick="removeMemberRow(${memberCount})" style="width: 28px; height: 28px; border-radius: 50%; border: none; background: rgba(223,152,146,0.1); color: var(--secondary); cursor: pointer; font-size: 0.95rem; display: flex; align-items: center; justify-content: center;">×</button>
  `;
  container.appendChild(row);
  updateAddButton();
}

function removeMemberRow(idx) {
  const row = document.getElementById(`memberRow${idx}`);
  if (row) row.remove();
  renumberMembers();
  updateAddButton();
}

function renumberMembers() {
  const rows = document.querySelectorAll('#memberInputs .member-row');
  memberCount = rows.length;
  rows.forEach((row, i) => {
    const num = i + 1;
    const formattedNum = String(num).padStart(2, '0');
    row.querySelector('.member-num').textContent = formattedNum;
    row.id = `memberRow${num}`;
    const nameInput = row.querySelector('.name-input');
    const numInput = row.querySelector('.number-input');
    if (nameInput) nameInput.dataset.idx = num;
    if (numInput) numInput.dataset.idx = num;
    const removeBtn = row.querySelector('.remove-btn');
    if (removeBtn) {
      removeBtn.onclick = () => removeMemberRow(num);
    }
  });
}

function updateAddButton() {
  const btn = document.getElementById('addMemberBtn');
  if (btn) {
    btn.disabled = memberCount >= MAX_MEMBERS;
    btn.textContent = memberCount >= MAX_MEMBERS ? 'MAX MEMBERS REACHED' : `＋ メンバーを追加 (${memberCount}/${MAX_MEMBERS})`;
  }
}

function loadPreset(presetName) {
  const presets = {
    'kinpri': [
      { name: '永瀬廉', number: 12 },
      { name: '髙橋海人', number: 22 },
    ],
    'snowman': [
      { name: '岩本照', number: 35 },
      { name: '深澤辰哉', number: 18 },
      { name: 'ラウール', number: 8 },
      { name: '渡辺翔太', number: 22 },
      { name: '向井康二', number: 15 },
      { name: '阿部亮平', number: 49 },
      { name: '目黒蓮', number: 26 },
      { name: '宮舘涼太', number: 42 },
      { name: '佐久間大介', number: 19 },
    ],
  };

  const preset = presets[presetName];
  if (!preset) return;
  
  const container = document.getElementById('memberInputs');
  container.innerHTML = '';
  memberCount = 0;
  
  preset.forEach((member, i) => {
    memberCount = i + 1;
    const formattedNum = String(memberCount).padStart(2, '0');
    const row = document.createElement('div');
    row.className = 'member-row';
    row.id = `memberRow${memberCount}`;
    row.style.cssText = 'display: flex; gap: 10px; align-items: center; padding: 12px 16px; background: var(--bg-dark); border-radius: var(--radius); border: 1px solid rgba(181,172,159,0.25);';
    row.innerHTML = `
      <span class="member-num font-playfair" style="font-size: 0.95rem; font-weight: bold; color: var(--primary); width: 24px; text-align: center;">${formattedNum}</span>
      <input type="text" class="form-input name-input" placeholder="名前" value="${member.name}" data-idx="${memberCount}" style="flex: 2; padding: 8px 12px; font-size: 0.85rem; border: 1px solid rgba(181,172,159,0.3); border-radius: var(--radius-sm);">
      <input type="number" class="form-input number-input" placeholder="番号(1-60)" value="${member.number}" min="1" max="60" data-idx="${memberCount}" style="flex: 1; max-width: 100px; padding: 8px 12px; font-size: 0.85rem; border: 1px solid rgba(181,172,159,0.3); border-radius: var(--radius-sm);">
      <button type="button" class="remove-btn" onclick="removeMemberRow(${memberCount})" style="width: 28px; height: 28px; border-radius: 50%; border: none; background: rgba(223,152,146,0.1); color: var(--secondary); cursor: pointer; font-size: 0.95rem; display: flex; align-items: center; justify-content: center;">×</button>
    `;
    container.appendChild(row);
  });
  updateAddButton();
  const displayName = presetName === 'kinpri' ? 'King & Prince' : 'Snow Man';
  showToast(`${displayName} のポートレートデータをロードしました ✦`);
}

function analyzeGroup() {
  const rows = document.querySelectorAll('#memberInputs .member-row');
  const members = [];
  
  rows.forEach(row => {
    const name = row.querySelector('.name-input').value.trim();
    const num = parseInt(row.querySelector('.number-input').value);
    if (name && num >= 1 && num <= 60) {
      const info = getCharacterInfo(num);
      if (info) members.push({ ...info, name });
    }
  });
  
  if (members.length < 2) {
    showToast('分析には2人以上のメンバー情報が必要です');
    return;
  }
  
  showGroupResult(members);
}

function generatePremiumReportHTML(members, balance, pairs) {
  const namesList = members.map(m => m.name).join('・');
  const count = members.length;
  let groupName = 'チーム';
  const nameJoined = members.map(m => m.name).join('');
  if (nameJoined.includes('廉') || nameJoined.includes('海人') || nameJoined.includes('紫耀') || nameJoined.includes('神宮寺') || nameJoined.includes('岸')) {
    groupName = 'キンプリ';
  } else if (nameJoined.includes('岩本') || nameJoined.includes('深澤') || nameJoined.includes('ラウール') || nameJoined.includes('渡辺') || nameJoined.includes('目黒') || nameJoined.includes('向井') || nameJoined.includes('阿部') || nameJoined.includes('宮舘') || nameJoined.includes('佐久間')) {
    groupName = 'Snow Man';
  }
  
  // Dynamic Title Suffix Generation
  let suffix = '最強だった。';
  const dominant = balance.dominant;
  const counts = balance.counts;
  const topScore = pairs.length > 0 ? pairs[0].score : 0;
  
  if (counts.MOON > 0 && counts.EARTH > 0 && counts.SUN > 0) {
    suffix = '奇跡のバランスだった。';
  } else if (topScore >= 90) {
    suffix = '尊さの極みだった。';
  } else if (dominant === 'MOON') {
    suffix = '運命の絆で結ばれていた。';
  } else if (dominant === 'EARTH') {
    suffix = 'プロフェッショナルの集団だった。';
  } else if (dominant === 'SUN') {
    suffix = '可能性が無限大だった。';
  } else {
    const hash = nameJoined.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const options = ['唯一無二のチームだった。', '最強のチームだった。', '圧倒的な無敵感だった。'];
    suffix = options[hash % options.length];
  }
  
  const mainTitle = `${count}人の${groupName}は、${suffix}`;
  
  const cardsHTML = members.map(m => {
    const groupNameJP = m.group.name;
    const groupClass = m.group.id.toLowerCase();
    
    let highlight = m.profile.keyword;
    if (m.animal === 'チータ') highlight = '常に高い目標へスマートに突き進むチャレンジャー';
    else if (m.animal === 'ゾウ') highlight = '陰の努力を見せないプロの職人肌';
    else if (m.animal === 'ペガサス') highlight = '誰も真似できない唯一無二の天才肌';
    else if (m.animal === 'たぬき') highlight = '普段のお茶目さと、ステージでの覇王感のギャップ（大化けする天才）';
    else if (m.animal === '虎') highlight = '裏表が一切ない、圧倒的な誠実さとピュアな生き方';
    
    let nameFontSize = '0.75rem';
    let namePadding = '4px 12px';
    if (count >= 8 || m.name.length >= 5) {
      nameFontSize = '0.62rem';
      namePadding = '4px 4px';
    } else if (count >= 6 || m.name.length >= 4) {
      nameFontSize = '0.68rem';
      namePadding = '4px 8px';
    }
    
    return `
      <div class="premium-member-card">
        <div class="premium-member-name-tag" style="font-size: ${nameFontSize}; padding: ${namePadding};">${m.name}さん</div>
        <div class="premium-member-avatar-box">
          <div class="premium-member-avatar-bg">${m.profile.emoji}</div>
          <div class="premium-member-avatar-badge font-playfair">${m.number}</div>
        </div>
        <div class="premium-member-animal-num">${m.animal}</div>
        <div class="premium-member-group-label ${groupClass}">${groupNameJP}</div>
        <div class="premium-member-desc">${highlight}</div>
      </div>
    `;
  }).join('');

  const animalNames = members.map(m => m.animal);
  const hasDuplicates = new Set(animalNames).size !== animalNames.length;
  
  const col2Title = hasDuplicates 
    ? '才能のポジショニング<br>お互いの強みを活かし合う' 
    : '才能のポジショニング<br>すべての個性が被らない';

  const listClass = count >= 6 ? 'premium-roles-list grid-2col' : 'premium-roles-list';

  const rolesListHTML = members.map(m => {
    const roleText = ANIMAL_ROLES[m.animal] || 'グループに貢献する大切な才能';
    return `
      <li class="premium-roles-item">
        <strong>${m.name}さん (${m.animal})</strong><br>
        ${roleText}
      </li>
    `;
  }).join('');

  const topPair = pairs[0];
  let connectionTitle = '言葉を超えた、圧倒的な「自立と信頼」の絆';
  let connectionText = `メンバー全員がお互いに「自分にないもの」を持っているからこそ、無駄な衝突がなく、純粋なリスペクトで繋がることができます。<br>誰か一人が欠けても成り立たない、奇跡的なバランスがここに完成しています。`;
  if (topPair) {
    connectionTitle = `尊すぎる！${topPair.member1.name} × ${topPair.member2.name}`;
    connectionText = `${topPair.member1.name}さんと${topPair.member2.name}さんは、グループの結びつきをより強固にする特別なシナジー（${topPair.relationship.label}）を放ちます。<br>お互いの長所を引き出し合う二人の存在が、グループ全体の無敵感をさらに引き上げています。`;
  }
  
  const balanceText = getBalanceComment(balance);
  const footerMainText = `だから、${count}人の${groupName}は、永遠に特別。`;

  return `
    <div class="premium-report-wrapper" id="premiumReportWrapper">
      <div class="premium-report" id="premiumReport">
        <div class="premium-report-header">
          <div class="premium-report-names font-playfair">${namesList}</div>
          <h2 class="premium-report-title">${mainTitle}</h2>
          <div class="premium-report-subtitle-badge">アニマル気質（動物占い）から見る、奇跡の最強バランス！</div>
        </div>
        
        <div class="premium-members-row">
          ${cardsHTML}
        </div>
        
        <div class="premium-divider">
          <span class="premium-divider-icon">✦ ✦ ✦</span>
        </div>
        
        <div class="premium-details-grid">
          <div class="premium-details-col">
            <div class="premium-col-header">
              <span class="premium-col-num">1</span>
              <h3 class="premium-col-title">3つのグループの<br>完璧な黄金比率</h3>
            </div>
            <div class="premium-balance-visual">
              <div class="premium-balance-item">
                <span class="premium-balance-badge">🌙</span>
                <span class="premium-balance-count">${balance.counts.MOON}人</span>
              </div>
              <div class="premium-balance-item">
                <span class="premium-balance-badge">🌍</span>
                <span class="premium-balance-count">${balance.counts.EARTH}人</span>
              </div>
              <div class="premium-balance-item">
                <span class="premium-balance-badge">☀️</span>
                <span class="premium-balance-count">${balance.counts.SUN}人</span>
              </div>
            </div>
            <p class="premium-col-desc">
              月（MOON）が共感と絆を、地球（EARTH）がプロ意識と実行力を、太陽（SUN）が直感と華をもたらします。<br>
              ${balanceText}
            </p>
          </div>
          
          <div class="premium-details-col">
            <div class="premium-col-header">
              <span class="premium-col-num">2</span>
              <h3 class="premium-col-title">${col2Title}</h3>
            </div>
            <ul class="${listClass}">
              ${rolesListHTML}
            </ul>
            <div class="premium-bubble-card">
              お互いに「自分にないもの」を相手が持っているから、純粋なリスペクトだけで繋がれる！
            </div>
          </div>
          
          <div class="premium-details-col">
            <div class="premium-col-header">
              <span class="premium-col-num">3</span>
              <h3 class="premium-col-title">関係性が生み出す<br>圧倒的な化学反応</h3>
            </div>
            <div class="premium-connection-headline font-serif">${connectionTitle}</div>
            <p class="premium-col-desc">
              ${connectionText}
              <br><br>
              個々の美学と特性が重なり合うことで、グループ全体として美しく調和されたエッセンスが醸し出されています。
            </p>
          </div>
        </div>
        
        <div class="premium-footer-msg">
          <p class="premium-footer-text-small">グループが揃ったときの無敵感や、放たれるハッピーで圧倒的なオーラは…</p>
          <h4 class="premium-footer-text-main">${footerMainText} ♡</h4>
        </div>
      </div>
    </div>
    
    <div class="premium-actions">
      <button class="btn btn-gold" id="btnDownloadReport" style="padding: 14px 28px; box-shadow: 0 4px 15px rgba(217, 167, 82, 0.3);">
        <span style="display: flex; align-items: center; gap: 8px; justify-content: center;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 16l-5-5h3V4h4v7h3l-5 5zm9 2v2H3v-2h18z"/></svg>
          レポートを画像として保存 (SNSシェア用)
        </span>
      </button>
    </div>
    
    <div class="capture-modal-overlay" id="captureModalOverlay">
      <div class="capture-modal">
        <button class="capture-modal-close" id="captureModalClose">×</button>
        <h3 class="capture-modal-title">画像が生成されました ✦</h3>
        <p class="capture-modal-desc">スマホで保存する場合は、下の画像を長押しして「写真に保存」を選択してください。</p>
        <div class="capture-modal-image-container" id="captureModalImageContainer"></div>
      </div>
    </div>
  `;
}

function initPremiumReportCapture() {
  const downloadBtn = document.getElementById('btnDownloadReport');
  if (!downloadBtn) return;
  
  downloadBtn.addEventListener('click', () => {
    const reportElement = document.getElementById('premiumReport');
    if (!reportElement) return;
    
    showToast('レポート画像を生成中... ⏳');
    
    // Temporarily add capture class to force desktop layout
    reportElement.classList.add('is-capturing');
    
    // Wait for DOM to adjust styles before capturing
    requestAnimationFrame(() => {
      setTimeout(() => {
        const options = {
          scale: 2,
          allowTaint: true, // Avoid CORS taint errors on local file:// execution
          backgroundColor: '#faf6f0',
          logging: false
        };
        
        html2canvas(reportElement, options).then(canvas => {
          // Remove capturing class right after
          reportElement.classList.remove('is-capturing');
          
          const dataUrl = canvas.toDataURL('image/png');
          const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
          
          const overlay = document.getElementById('captureModalOverlay');
          const container = document.getElementById('captureModalImageContainer');
          const closeBtn = document.getElementById('captureModalClose');
          
          if (overlay && container) {
            let actionHTML = '';
            if (!isMobile) {
              // Add a direct download button inside the modal for PC users
              actionHTML = `
                <div style="margin-top: 16px; display: flex; justify-content: center;">
                  <a href="${dataUrl}" download="oshi_chemistry_report_${Date.now()}.png" class="btn btn-gold" style="padding: 10px 24px; text-decoration: none; display: inline-block;">
                    <span>画像をPCに保存（ダウンロード）する</span>
                  </a>
                </div>
              `;
            } else {
              actionHTML = `
                <p style="font-size: 0.75rem; color: var(--text-sub); margin-top: 8px;">画像を長押しして「写真に保存」を選択してください。</p>
              `;
            }
            
            container.innerHTML = `
              <img src="${dataUrl}" alt="診断レポート画像" style="width: 100%; height: auto; border-radius: var(--radius-sm);">
              ${actionHTML}
            `;
            
            // Update description text based on device
            const descEl = overlay.querySelector('.capture-modal-desc');
            if (descEl) {
              descEl.innerHTML = isMobile 
                ? 'スマホで保存する場合は、下の画像を長押しして「写真に保存」を選択してください。'
                : '生成されたレポート画像です。下のボタンから画像をPCに保存できます。';
            }
            
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            const closeModal = () => {
              overlay.classList.remove('active');
              document.body.style.overflow = '';
            };
            
            if (closeBtn) closeBtn.onclick = closeModal;
            overlay.onclick = (e) => {
              if (e.target === overlay) closeModal();
            };
          }
          showToast('レポート画像が生成されました ✦');
        }).catch(err => {
          reportElement.classList.remove('is-capturing');
          console.error('Image capture failed:', err);
          showToast('画像の生成に失敗しました。ローカル環境のセキュリティ制限の可能性があります。');
        });
      }, 100);
    });
  });
}

function showGroupResult(members) {
  const container = document.getElementById('groupResult');
  if (!container) return;
  
  // Balance analysis
  const balance = analyzeGroupBalance(members);
  
  // Generate all pairs compatibility
  const pairs = [];
  for (let i = 0; i < members.length; i++) {
    for (let j = i + 1; j < members.length; j++) {
      const compat = calculateCompatibility(members[i], members[j]);
      pairs.push({
        member1: members[i],
        member2: members[j],
        ...compat
      });
    }
  }
  pairs.sort((a, b) => b.score - a.score);
  
  // Build HTML (Editorial layouts)
  container.innerHTML = `
    <!-- Premium Report -->
    ${generatePremiumReportHTML(members, balance, pairs)}

    <!-- Members Overview -->
    <div class="section-header" style="margin-top: 40px;">
      <span class="section-num font-playfair">02-A</span>
      <h2 class="serif-title">ポートレート</h2>
      <span class="section-sub">OSHI ARCHIVE</span>
      <div class="header-divider"></div>
    </div>
    <div class="members-overview" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 20px; margin-bottom: 40px;">
      ${members.map(m => `
        <div class="member-card-mini glass-card animate-hover" onclick="showMemberModal(${JSON.stringify(m).replace(/"/g, '&quot;')})" style="text-align: center; padding: 24px 16px; cursor: pointer; background: #fff; border: 1px solid rgba(181, 172, 159, 0.25);">
          <span class="mini-emoji" style="font-size: 2.2rem; display: inline-flex; align-items: center; justify-content: center; width: 60px; height: 60px; background: var(--bg-dark); border: 1px solid var(--glass-border); border-radius: 50%; margin-bottom: 12px;">${m.profile.emoji}</span>
          <div class="mini-name" style="font-size: 0.95rem; font-weight: 700; margin-bottom: 2px;">${m.name}</div>
          <div class="mini-animal" style="font-size: 0.75rem; color: var(--text-sub);">${m.animal}（No.${m.number}）</div>
          <span class="result-group-badge ${m.group.id.toLowerCase()}" style="margin-top:12px;font-size:0.65rem;padding:4px 12px; margin-bottom: 0;">
            ${m.group.emoji} ${m.group.name}
          </span>
        </div>
      `).join('')}
    </div>

    <!-- Balance Chart -->
    <div class="glass-card mb-32" style="background: #fff; border: 1px solid rgba(181, 172, 159, 0.25); padding: 32px 24px; border-radius: var(--radius);">
      <div class="text-center mb-24">
        <h3 class="serif-title" style="font-size: 1.5rem; margin-bottom: 6px;">グループの空気感</h3>
        <span class="section-sub" style="font-size:0.65rem;color:var(--primary);letter-spacing:0.2em;display:block;">GROUP VIBES</span>
      </div>
      <div class="balance-chart">
        <div class="balance-item">
          <div class="balance-bar-container">
            <div class="balance-bar" style="height:${balance.percentages.MOON}%;background:var(--moon-gradient);"></div>
          </div>
          <div class="balance-label" style="color:var(--moon);">🌙 MOON (絆・共感)</div>
          <div class="balance-count font-playfair" style="color:var(--moon);">${balance.counts.MOON}</div>
        </div>
        <div class="balance-item">
          <div class="balance-bar-container">
            <div class="balance-bar" style="height:${balance.percentages.EARTH}%;background:var(--earth-gradient);"></div>
          </div>
          <div class="balance-label" style="color:var(--earth);">🌍 EARTH (プロ意識・現実)</div>
          <div class="balance-count font-playfair" style="color:var(--earth);">${balance.counts.EARTH}</div>
        </div>
        <div class="balance-item">
          <div class="balance-bar-container">
            <div class="balance-bar" style="height:${balance.percentages.SUN}%;background:var(--sun-gradient);"></div>
          </div>
          <div class="balance-label" style="color:var(--sun);">☀️ SUN (直感・オーラ)</div>
          <div class="balance-count font-playfair" style="color:var(--sun);">${balance.counts.SUN}</div>
        </div>
      </div>
      <div class="text-center" style="margin-top:24px;border-top:1px solid rgba(212,175,55,0.1);padding-top:20px;">
        <p style="font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.15em;margin-bottom:6px;">このグループがまとう特別なニュアンス</p>
        <p style="font-size:0.85rem;color:var(--text-sub);line-height:1.8;max-width:550px;margin:0 auto;">${getBalanceComment(balance)}</p>
      </div>
    </div>

    <!-- Correlation Map -->
    <div class="glass-card mb-32" style="display: flex; flex-direction: column; align-items: center; background: #fff; border: 1px solid rgba(181, 172, 159, 0.25); padding: 32px 24px; border-radius: var(--radius);">
      <div class="text-center mb-24">
        <h3 class="serif-title" style="font-size: 1.5rem; margin-bottom: 6px;">メンバー相関図（ケミストリーマップ）</h3>
        <span class="section-sub" style="font-size:0.65rem;color:var(--primary);letter-spacing:0.2em;display:block;margin-bottom:16px;">CHEMISTRY MAP</span>
        <p style="font-size:0.8rem; color:var(--text-sub); line-height:1.6; max-width:520px; margin:0 auto 16px; padding:0 12px; letter-spacing:0.02em;">
          グループ全体の人間関係をビジュアル化した相関図です。メンバーを繋ぐ線の色は「関係性のタイプ」を表し、線の透明度が低い（濃い）ほど相性のスコアが高くなっています。メンバーをタップすると詳細プロフィールが表示されます。
        </p>
        
        <!-- 凡例 (Legend) -->
        <div class="map-legend" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 8px 16px; margin: 16px auto 0; max-width: 520px; font-size: 0.75rem; color: var(--text-sub); padding: 12px; background: rgba(217, 167, 82, 0.04); border: 1px solid rgba(217, 167, 82, 0.15); border-radius: var(--radius-sm);">
          <span style="display: flex; align-items: center; gap: 6px;"><span style="width: 10px; height: 10px; border-radius: 50%; background-color: #e91e63; display: inline-block;"></span>✨ 魂の共鳴 (90点〜)</span>
          <span style="display: flex; align-items: center; gap: 6px;"><span style="width: 10px; height: 10px; border-radius: 50%; background-color: #9c27b0; display: inline-block;"></span>💕 最強コンビ (80点〜)</span>
          <span style="display: flex; align-items: center; gap: 6px;"><span style="width: 10px; height: 10px; border-radius: 50%; background-color: #2196f3; display: inline-block;"></span>🌈 いい空気感 (70点〜)</span>
          <span style="display: flex; align-items: center; gap: 6px;"><span style="width: 10px; height: 10px; border-radius: 50%; background-color: #4caf50; display: inline-block;"></span>📚 成長し合える (60点〜)</span>
          <span style="display: flex; align-items: center; gap: 6px;"><span style="width: 10px; height: 10px; border-radius: 50%; background-color: #ff9800; display: inline-block;"></span>⚡ スパイス関係 (0点〜)</span>
        </div>
      </div>
      <div class="correlation-map" id="correlationMap">
        <svg class="connection-lines" id="connectionLines"></svg>
      </div>
    </div>

    <!-- Top Pairs -->
    <div class="glass-card mb-32" style="background: #fff; border: 1px solid rgba(181, 172, 159, 0.25); padding: 32px 24px; border-radius: var(--radius);">
      <div class="text-center mb-24">
        <h3 class="serif-title" style="font-size: 1.5rem; margin-bottom: 6px;">尊すぎる関係性ランキング (Top 3)</h3>
        <span class="section-sub" style="font-size:0.65rem;color:var(--primary);letter-spacing:0.2em;display:block;">RELATIONSHIP RANKING</span>
      </div>
      <div class="pairs-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px;">
        ${pairs.slice(0, 3).map((p, i) => `
          <div class="pair-card" style="border-left:2px solid ${p.relationship.color}; display: flex; align-items: center; justify-content: space-between; padding: 16px; background: #fff; border-top: 1px solid rgba(181,172,159,0.2); border-right: 1px solid rgba(181,172,159,0.2); border-bottom: 1px solid rgba(181,172,159,0.2); border-radius: var(--radius); transition: var(--transition);">
            <div style="display: flex; align-items: center; gap: 12px; flex: 1;">
              <div class="pair-rank font-playfair" style="font-size: 1.15rem; font-weight: bold; color: var(--primary); width: 36px; border-right: 1px solid rgba(212,175,55,0.15); padding-right: 8px; flex-shrink: 0; text-align: center;">
                No.${i + 1}
              </div>
              <div class="pair-emojis" style="font-size: 1.8rem; display: flex; align-items: center; gap: 2px;">
                ${p.member1.profile.emoji}<span class="pair-heart" style="font-size: 1rem; opacity: 0.8;">✦</span>${p.member2.profile.emoji}
              </div>
              <div class="pair-info" style="margin-left: 4px;">
                <div class="pair-names" style="font-size: 0.85rem; font-weight: 700; margin-bottom: 2px;">${p.member1.name} × ${p.member2.name}</div>
                <div class="pair-label" style="color:${p.relationship.color}; font-weight: 500; font-size: 0.75rem;">${p.relationship.label} ${p.label}</div>
                ${p.bonus ? `<div style="font-size:0.65rem;color:var(--primary-light);margin-top:4px;letter-spacing:0.02em;">⭐ ${p.bonus}</div>` : ''}
              </div>
            </div>
            <div class="pair-score font-playfair" style="color:${p.relationship.color}; margin-left: 12px; flex-shrink: 0; font-size: 1.5rem; font-weight: 800;">${p.score}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Group Summary -->
    <div class="glass-card text-center" style="border: 1px solid rgba(212, 175, 55, 0.25); background: #fff; padding: 40px 24px; border-radius: var(--radius);">
      <h3 class="serif-title mb-16" style="font-size:1.6rem;letter-spacing:0.15em;">このグループが愛される理由</h3>
      <span class="section-sub" style="font-size:0.65rem;color:var(--primary);letter-spacing:0.2em;display:block;margin-bottom:32px;">WHY WE LOVE THEM</span>
      <div class="group-summary-content">
        ${generateGroupSummary(members, balance, pairs)}
      </div>
      <div class="share-area mt-32" style="margin-top: 24px; display: flex; justify-content: center;">
        <button class="btn btn-gold" onclick="shareGroupResult('${members.map(m=>m.name).join('、')}')">
          <span>SHARE CHEMISTRY REPORT</span>
          <span class="btn-sub-text">レポートをコピーする</span>
        </button>
      </div>
    </div>

    <!-- Promotion Card (中盤CTA) -->
    <div class="glass-card text-center mt-32" style="border: 1px solid rgba(212, 175, 55, 0.25); padding: 32px 24px; background: #fff;">
      <p style="font-size: 1.1rem; color: var(--primary); font-weight: bold; margin-bottom: 16px;">
        無料診断はここまでです🐾
      </p>
      <p style="font-size: 0.85rem; color: var(--text-sub); line-height: 1.8; margin-bottom: 20px;">
        もっと詳しく知りたい方には、<br>
        あなた専用の<strong>「保存版アニマル気質レポート」</strong>をご用意しています。
      </p>
      <div style="display: inline-block; text-align: left; font-size: 0.85rem; color: var(--text-sub); line-height: 1.8; margin-bottom: 20px; border-left: 2px solid var(--primary); padding-left: 16px;">
        ✔ 才能<br>
        ✔ 恋愛傾向<br>
        ✔ 人間関係のクセ<br>
        ✔ 仕事での強み<br>
        ✔ 相性の良いタイプ<br>
        ✔ 気をつけたいポイント
      </div>
      <p style="font-size: 0.85rem; color: var(--text-sub); line-height: 1.8; margin-bottom: 24px;">
        を、読みやすいPDFにまとめてお届けします。
      </p>
      <p style="font-size: 0.9rem; color: var(--text-main); font-weight: bold; margin-bottom: 24px;">
        気になる方は公式ラインで<br>
        <span style="color: #e91e63;">「レポート希望」</span>と送ってください♡
      </p>
      <a href="https://lin.ee/YqRN22R" target="_blank" rel="noopener noreferrer" class="btn btn-gold" style="width: 100%; max-width: 320px; padding: 12px 24px; margin: 0 auto; display: block; text-decoration: none;">
        <span>無料診断をLINEで体験する</span>
      </a>
    </div>
  `;
  
  container.classList.add('active');
  initPremiumReportCapture();
  
  // Draw correlation map after DOM is ready
  requestAnimationFrame(() => {
    drawCorrelationMap(members, pairs);
  });
  
  container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function drawCorrelationMap(members, pairs) {
  const map = document.getElementById('correlationMap');
  const svg = document.getElementById('connectionLines');
  if (!map || !svg) return;
  
  const w = map.offsetWidth;
  const h = map.offsetHeight;
  const cx = w / 2;
  const cy = h / 2;
  
  // Position nodes in a circle (make it responsive based on element size)
  const radius = Math.min(w, h) * 0.38;
  const positions = [];
  
  // Clear any existing node divs (only keep SVG lines)
  map.querySelectorAll('.map-node').forEach(n => n.remove());
  
  members.forEach((m, i) => {
    const angle = (i / members.length) * Math.PI * 2 - Math.PI / 2;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    positions.push({ x, y });
    
    // Group Colors (Antique themed)
    const groupColors = { MOON: 'var(--moon)', EARTH: 'var(--earth)', SUN: 'var(--sun)' };
    const bgColors = { MOON: 'rgba(180, 167, 214, 0.12)', EARTH: 'rgba(158, 187, 168, 0.12)', SUN: 'rgba(217, 173, 124, 0.12)' };
    
    const node = document.createElement('div');
    node.className = 'map-node';
    node.style.left = (x - 28) + 'px';
    node.style.top = (y - 28) + 'px';
    node.innerHTML = `
      <div class="node-avatar" style="background:${bgColors[m.group.id]};border-color:${groupColors[m.group.id]};">
        ${m.profile.emoji}
      </div>
      <div class="node-name">${m.name}</div>
      <div class="node-animal">${m.animal}</div>
    `;
    node.addEventListener('click', () => showMemberModal(m));
    map.appendChild(node);
  });
  
  // Draw connections in SVG
  svg.setAttribute('width', w);
  svg.setAttribute('height', h);
  svg.innerHTML = '';
  
  pairs.forEach(p => {
    const i1 = members.indexOf(p.member1);
    const i2 = members.indexOf(p.member2);
    if (i1 === -1 || i2 === -1) return;
    
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', positions[i1].x);
    line.setAttribute('y1', positions[i1].y);
    line.setAttribute('x2', positions[i2].x);
    line.setAttribute('y2', positions[i2].y);
    line.setAttribute('stroke', p.relationship.color);
    line.setAttribute('class', `connection-line ${p.score >= 80 ? 'highlight' : ''}`);
    line.setAttribute('stroke-opacity', Math.max(0.12, p.score / 140));
    svg.appendChild(line);
  });
}

function getBalanceComment(balance) {
  const { dominant, counts } = balance;
  const total = counts.MOON + counts.EARTH + counts.SUN;
  const dominantPct = Math.round((counts[dominant] / total) * 100);
  
  const comments = {
    MOON: `🌙 MOONが${dominantPct}%を占める「絆重視」のグループ。"誰と"過ごすかを大切にするメンバーが多く、寄り添い合うような温かい関係性を作ります。家族的でファン思いな空気感が魅力です。`,
    EARTH: `🌍 EARTHが${dominantPct}%を占める「実力派・リアリスト」のグループ。"何を"成し遂げるかを冷静に見据え、パフォーマンスや作品作りにおいて妥協しないプロ意識の高さを発揮します。`,
    SUN: `☀️ SUNが${dominantPct}%を占める「感性爆発・天才肌」のグループ。"どこで"輝くかを本能的に捉え、直感とパッションで唯一無二の世界観を生み出す爆発力を秘めています。`,
  };
  
  if (counts.MOON > 0 && counts.EARTH > 0 && counts.SUN > 0) {
    return comments[dominant] + '　さらに三分類の全属性が綺麗に揃うため、死角のない完璧な調和を保つ最強のポートレートバランスです。';
  }
  return comments[dominant];
}

// ---- メンバーごとのグループ内での「エモい役割」マッピング ----
const ANIMAL_ROLES = {
  '狼': '独自の個性をブレずに放ち続ける「唯一無二のスペシャリスト」',
  'こじか': 'いるだけで周りが笑顔になり、みんなが甘やかしたくなる「永遠のピュアベイビー」',
  '猿': '場のノリを瞬時に作り出し、笑顔を絶やさない「愛されムードメーカー」',
  'チータ': 'グループの熱量を一気に高め、未来を切り開く「情熱のトップランナー」',
  '黒ひょう': 'トレンドをいち早くキャッチし、スマートに表現する「スタイリッシュな表現者」',
  'ライオン': '絶対に妥協しない美学と圧倒的なカリスマ性でグループの格を高める「絶対的キング」',
  '虎': '圧倒的な面倒見の良さと抜群 of バランス感覚で全体を優しく包み込む「包容力あふれる大黒柱」',
  'たぬき': 'みんなの緊張をほぐし、そこにいるだけで空気を優しく丸くする「和みのマスコット」',
  '子守熊': '冷静な先読みと豊かなサービス精神でファンを魅了する「芸術肌のロマンチスト」',
  'ゾウ': 'ここぞという時にどっしりと支え、限界を決めずに努力し続ける「ストイックな要石」',
  'ひつじ': 'メンバーの心の変化に素快速気づき、そっと調和を守る「優しき守護神」',
  'ペガサス': '型にはまらない直感と感性で、想像を超えた次元を作る「自由な天才表現者」'
};

function getGroupVibeColumn(balance) {
  const { dominant, counts } = balance;
  
  let title = '✦ GROUP VIBE : グループの空気感';
  let text = '';
  
  if (counts.MOON > 0 && counts.EARTH > 0 && counts.SUN > 0) {
    text = `このグループは<strong>【MOON・EARTH・SUN】のすべての属性が綺麗に共存する「パーフェクト・トライアングル」型</strong>です。<br>
    感情に寄り添う温かさ（MOON）、目標へストイックに向かうプロ意識（EARTH）、そして一瞬で目を惹く圧倒的な華（SUN）。それぞれが全く異なる役割をパズルのように完璧に埋め合っています。<br>
    誰か一人が欠けても成り立たない、計算された奇跡のようなバランスが、このグループの最大の武器であり、ファンを飽きさせない無限の魅力となっています。`;
  } else {
    const comments = {
      MOON: `このグループは<strong>【MOON（月グループ）】の性質が非常に強い「エモーショナル・ファミリー」型</strong>です。<br>
      お互いの気持ちの通じ合いや心の温度感を最も大切にするメンバーが集まっています。楽屋での他愛ないおしゃべりがそのままステージ上の息の合った空気感に繋がり、ファンを「自分たちも家族の一員」であるかのように温かく包み込みます。寄り添い合うような優しさが、唯一無二の魅力です。`,
      EARTH: `このグループは<strong>【EARTH（地球グループ）】の性質が際立つ「プロフェッショナル・タッグ」型</strong>です。<br>
      妥協を許さないパフォーマンスへの情熱と、結果で証明するストイックなリアル志向が特徴。馴れ合いではなく、お互いの実力を誰よりもリスペクトし合う「大人の仕事人」としての絆で結ばれています。背中で語り合い、常に高みを目指し続けるその姿が、見る人に強烈な憧れを抱かせます。`,
      SUN: `このグループは<strong>【SUN（太陽グループ）】の輝きにあふれた「カリスマ・スパーク」型</strong>です。<br>
      ルールや枠にとらわれない、天才的なひらめきと感性を持つメンバーが中心となっています。緻密な計画よりも、その瞬間の熱量や本能的なパッションで動くため、ステージ上での爆発力や人を惹きつけるオーラは圧倒的。常にファンに予測不能なワクワクと衝撃を与え続ける、唯一無二の天才集団です。`
    };
    text = comments[dominant];
  }
  
  return `
    <h4 class="serif-title mb-12" style="font-size: 1.15rem; color: var(--primary); letter-spacing: 0.1em;">${title}</h4>
    <p style="font-size: 0.85rem; color: var(--text-sub); line-height: 2; max-width: 550px; margin: 0 auto; letter-spacing: 0.02em;">${text}</p>
  `;
}

function getTopPairColumn(topPair) {
  if (!topPair) return '';
  
  const name1 = topPair.member1.name;
  const name2 = topPair.member2.name;
  const rel = topPair.relationship.label;
  
  const relTypeComments = {
    '✨ 魂の共鳴': `グループ内で最も深い結びつきを感じさせるのが、<strong>${name1}さん</strong>と<strong>${name2}さん</strong>のふたり。<br>言葉を交わさずともお互いの考えていることが伝わるような、まさに「背中を預け合える関係」です。ふたりが並んだ時に放つ独特のシンクロ感や無言の信頼関係は、ファンにとってこの上なくエモく、尊いケミストリーとなっています。`,
    '💕 最強コンビ': `グループのパフォーマンスや関係性の主軸として強いシナジーを放つのが、<strong>${name1}さん</strong>と<strong>${name2}さん</strong>のコンビ。<br>お互いの長所を引き出し合い、短所を完璧にカバーし合う、まさに「無敵のタッグ」です。ふたりが合わさることでグループの魅力が何倍にも膨らみ、ファンを熱狂させる最高の起爆剤となります。`,
    '🌈 いい空気感': `見ているだけで周囲をハッピーで温かい気持ちにさせてくれるのが、<strong>${name1}さん</strong>と<strong>${name2}さん</strong>のふたり。<br>お互いに気負わずに自然体でいられるような、心地よいリラックスした空気をまとっています。ふたりの楽しそうな掛け合いやふとした瞬間の笑顔のシンクロは、グループの良心であり、ファンにとって最大の癒やしです。`,
    '📚 成長し合える': `お互いに良い刺激を与え合い、切磋琢磨する美しいライバルシップを感じさせるのが、<strong>${name1}さん</strong>と<strong>${name2}さん</strong>。<br>異なる強みを持つからこそリスペクトし合い、相手の姿を見て「もっと頑張ろう」と思える関係性。ふたりが並んで成長し、背中を追いかけ合う姿は、グループに常に前進するフレッシュなエネルギーをもたらします。`,
    '⚡ スパイス関係': `一見タイプが全く異なるからこそ、予期せぬ化学反応でグループを盛り上げるのが、<strong>${name1}さん</strong>と<strong>${name2}さん</strong>。<br>お互いの予想がつかない行動が新鮮な刺激となり、ふたりの絡みはグループ全体の良いスパイスとしてファンの視線を惹きつけて離しません。`
  };
  
  const defaultComment = `グループ内で独自の魅力を放つのが、<strong>${name1}さん</strong>と<strong>${name2}さん</strong>のコンビ。<br>ふたりの間にある独特のテンポや空気感は、他のメンバーには出せない特別なニュアンスを持っており、グループの多様性を豊かに広げる大切な鍵となっています。`;
  
  const comment = relTypeComments[rel] || defaultComment;
  
  return `
    <h4 class="serif-title mb-12" style="font-size: 1.15rem; color: var(--primary); letter-spacing: 0.1em;">✦ FEATURED CHEMISTRY : 特別なふたり</h4>
    <p style="font-size: 0.85rem; color: var(--text-sub); line-height: 2; max-width: 550px; margin: 0 auto; letter-spacing: 0.02em;">${comment}</p>
  `;
}

function generateGroupSummary(members, balance, pairs) {
  const topPair = pairs[0];
  let html = '';
  
  // 1. Group Vibe
  html += `<div class="summary-section mb-32">${getGroupVibeColumn(balance)}</div>`;
  
  // 2. Member Roles
  html += `
    <div class="summary-section mb-32" style="text-align: left; max-width: 550px; margin: 0 auto 32px;">
      <h4 class="serif-title mb-16" style="font-size: 1.15rem; color: var(--primary); letter-spacing: 0.1em; text-align: center;">✦ MEMBERS PORTRAITS : メンバーの役割</h4>
      <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 16px;">
  `;
  members.forEach(m => {
    const role = ANIMAL_ROLES[m.animal] || 'グループに彩りを与える大切なメンバー';
    html += `
        <li style="border-bottom: 1px dashed rgba(212,175,55,0.1); padding-bottom: 12px;">
          <strong style="color: var(--text-main); font-size: 0.95rem;">${m.name}さん</strong> 
          <span style="font-size: 0.75rem; color: var(--text-sub);">(${m.profile.emoji} ${m.animal})</span>
          <p style="font-size: 0.8rem; color: var(--text-sub); margin-top: 4px; line-height: 1.6; letter-spacing: 0.02em;">${role}</p>
        </li>
    `;
  });
  html += `
      </ul>
    </div>
  `;
  
  // 3. Featured Chemistry
  if (topPair) {
    html += `<div class="summary-section mb-32">${getTopPairColumn(topPair)}</div>`;
  }
  
  // 4. Epilogue
  html += `
    <div class="summary-section mt-24" style="border-top: 1px solid rgba(212,175,55,0.15); padding-top: 24px;">
      <p style="font-size:0.85rem; color:var(--text-sub); line-height:2.2; max-width:550px; margin:0 auto; letter-spacing:0.04em;">
        個々の美学と特性が幾重にも重なり合うことで、グループ全体として美しく調和されたエッセンスが醸し出されています。これこそが、彼らの関係性が人々を惹きつけてやまない理由なのです——。
      </p>
    </div>
  `;
  
  return html;
}

function shareGroupResult(names) {
  const text = `✦ OSHI PORTRAIT - 推しケミ分析 ✦\n${names} のポートレート分析を実行しました ✦\n#推しケミ相関図 #アニマル気質診断`;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => showToast('分析結果をクリップボードにコピーしました ✦'));
  }
}

// ============================================================
// Member Modal (Elegant Editorial Pop-over)
// ============================================================
function showMemberModal(member) {
  const overlay = document.getElementById('modalOverlay');
  const modal = document.getElementById('modalContent');
  if (!overlay || !modal) return;
  
  const m = typeof member === 'string' ? JSON.parse(member) : member;
  const groupClass = m.group.id.toLowerCase();
  
  modal.innerHTML = `
    <button class="modal-close" onclick="closeModal()">×</button>
    <div class="text-center" style="border-bottom: 1px solid rgba(212, 175, 55, 0.15); padding-bottom: 24px;">
      <span style="font-size:3.5rem; display:block; margin-bottom:12px;">${m.profile.emoji}</span>
      <h3 class="serif-title" style="font-size: 1.8rem; letter-spacing: 0.1em;">${m.name || m.animal}</h3>
      ${m.name && m.name !== m.animal ? `<p class="font-playfair" style="color:var(--text-sub); font-size:0.85rem; margin-top: 4px;">${m.animal} (No.${m.number})</p>` : ''}
      <span class="result-group-badge ${groupClass}" style="margin-top:12px; margin-bottom: 0;">
        ${m.group.emoji} ${m.group.name}
      </span>
    </div>
    
    <div class="result-details" style="margin-top:32px;">
      <div class="detail-item">
        <div class="detail-label">✦ MY THEME / キーワード</div>
        <div class="detail-text">${m.profile.keyword}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">✦ PROFILE / 基本性格</div>
        <div class="detail-text">${m.profile.personality}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">✦ TRIGGER WORD / キュンとする言葉</div>
        <div class="detail-text">${m.profile.onePhrase || m.profile.catchphrase}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">✦ LOVE STYLE / 恋愛傾向</div>
        <div class="detail-text">${m.profile.love}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">✦ RESPONSIBILITY / 責任感のカタチ</div>
        <div class="detail-text">${m.profile.responsibility || '—'}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">✦ HAPPY ACTION / ハッピーアクション</div>
        <div class="detail-text">${m.profile.lucky || '—'}</div>
      </div>
    </div>
  `;
  
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ============================================================
// Encyclopedia
// ============================================================
function initEncyclopedia() {
  const grid = document.getElementById('animalGrid');
  if (!grid) return;
  renderAnimalCards(grid, 'ALL');
  
  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderAnimalCards(grid, btn.dataset.filter);
    });
  });
}

function renderAnimalCards(grid, filter) {
  const animals = Object.entries(ANIMAL_PROFILES);
  const filtered = filter === 'ALL' ? animals : animals.filter(([, p]) => p.group === filter);
  
  grid.innerHTML = filtered.map(([name, profile]) => {
    const groupClass = profile.group.toLowerCase();
    return `
      <div class="animal-card glass-card ${groupClass}" onclick='showAnimalModal("${name}")'>
        <div>
          <div class="animal-card-header">
            <span class="animal-card-emoji">${profile.emoji}</span>
            <div class="animal-card-info">
              <h3>${name}</h3>
              <div class="animal-keyword font-playfair">✦ ${profile.keyword.split('、')[0]}</div>
            </div>
          </div>
          <div class="animal-card-body">
            <p>${profile.personality}</p>
          </div>
        </div>
        <div class="animal-card-tags">
          <span class="animal-tag">${GROUPS[profile.group].emoji} ${GROUPS[profile.group].name}</span>
          <span class="animal-tag">✦ ${profile.catchphrase}</span>
        </div>
      </div>
    `;
  }).join('');
}

function showAnimalModal(animalName) {
  const profile = ANIMAL_PROFILES[animalName];
  if (!profile) return;
  const group = GROUPS[profile.group];
  showMemberModal({
    name: animalName,
    animal: animalName,
    number: '',
    profile: profile,
    group: group,
  });
}

// ============================================================
// Scroll Animations
// ============================================================
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08 });
  
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ============================================================
// Toast (Elegant Editorial Minimal Style)
// ============================================================
function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span style="color:var(--primary);margin-right:6px;">✦</span> ${message}`;
  toast.style.cssText = `
    position: fixed; bottom: 48px; left: 50%; transform: translateX(-50%) translateY(20px);
    padding: 10px 24px; background: #1a161f; border: 1px solid var(--primary);
    color: var(--text-main); border-radius: var(--radius-sm); font-size: 0.8rem;
    z-index: 9999; box-shadow: var(--shadow);
    opacity: 0; transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
    font-family: 'Shippori Mincho', serif; letter-spacing: 0.05em;
  `;
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}
