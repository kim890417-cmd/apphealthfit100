/**
 * 건강노트 (HealthFit Mobile App) Core Engine
 * Data Management, Calculators, Habit Routines & Canvas Charts
 */

// ==========================================
// 1. Initial State & Storage Keys
// ==========================================
const STORAGE_KEY = 'healthfit_app_data_v1';

const DEFAULT_ROUTINES = [
  { id: 'r1', name: '유산균 1포 복용', time: 'morning', tip: '기상 직후 미온수 1잔과 함께 복용 시 장 도달률 UP', done: false },
  { id: 'r2', name: '종합비타민 / 비타민C', time: 'noon', tip: '점심 식사 직후 복용 (위장 장애 예방 및 흡수 촉진)', done: false },
  { id: 'r3', name: '오메가3 (RTG)', time: 'noon', tip: '지방이 포함된 식후에 먹어야 흡수가 잘됩니다', done: false },
  { id: 'r4', name: '마그네슘 섭취', time: 'evening', tip: '취침 1시간 전 복용 시 신경 안정 및 숙면에 도움', done: false },
  { id: 'r5', name: '가벼운 스트레칭 10분', time: 'evening', tip: '하루 피로를 풀고 굳은 척추를 이완하세요', done: false }
];

const HEALTH_TIPS = [
  {
    title: "식후 1시간 후 마시는 물이 보약인 이유",
    body: "식사 직후 찬물을 너무 많이 마시면 위산이 희석되어 소화에 부담을 줄 수 있습니다. 식후 40분~1시간 뒤 미온수를 마시면 원활한 신진대사와 혈액순환에 큰 도움이 됩니다."
  },
  {
    title: "영양제, 물 없이 침으로 삼키면 생기는 일",
    body: "알약 영양제가 식도 벽에 달라붙으면 식도염이나 궤양을 유발할 수 있습니다. 영양제는 최소 200ml 이상의 충분한 미온수와 함께 넘기는 것이 안전합니다."
  },
  {
    title: "공복 유산소 운동, 무조건 좋을까?",
    body: "체지방 연소에는 효과적이지만, 근손실 위험이 있고 혈당이 급격히 떨어질 수 있습니다. 가벼운 바나나 반 개나 물 한 잔을 마신 뒤 40분 이내로 운동하는 것을 추천합니다."
  },
  {
    title: "비타민D는 낮에 먹어야 할까, 밤에 먹어야 할까?",
    body: "비타민D는 멜라토닌 분비를 일시적으로 억제할 수 있어 밤에 먹으면 수면을 방해할 수 있습니다. 아침이나 점심 식사 직후 기름진 식사와 함께 복용하는 것이 가장 좋습니다."
  },
  {
    title: "마그네슘과 칼슘의 황금 비율 2:1",
    body: "칼슘과 마그네슘은 서로의 흡수를 돕지만 과도하면 경쟁합니다. 가장 이상적인 섭취 비율은 칼슘 2 : 마그네슘 1이며, 근육 경련이 잦다면 마그네슘을 단독 보충해 보세요."
  }
];

const HEALTH_QUIZZES = [
  {
    q: "물은 하루에 무조건 3L 이상 많이 마실수록 건강에 좋을까요?",
    ans: "X",
    exp: "X (아닙니다) - 과도한 물 섭취는 저나트륨혈증(물 중독)을 일으켜 두통이나 부종을 유발할 수 있습니다. 자신의 체중 × 30~33ml(보통 1.5~2L)가 가장 이상적입니다."
  },
  {
    q: "비타민C는 산성이 강하므로 빈속보다는 식후에 먹는 것이 좋을까요?",
    ans: "O",
    exp: "O (그렇습니다) - 비타민C는 아스코르브산 성분으로 위산 분비를 촉진해 빈속에 먹으면 속 쓰림이 발생할 수 있으므로 식사 직후가 좋습니다."
  },
  {
    q: "근육량이 많은 사람은 BMI(체질량지수)가 과체중으로 나올 수 있을까요?",
    ans: "O",
    exp: "O (그렇습니다) - BMI는 단순 키와 몸무게 공식이므로 골격근량이 많은 운동선수도 비만 판정을 받을 수 있습니다. 체지방률(인바디)을 함께 확인해야 합니다."
  },
  {
    q: "술을 마신 다음 날 사우나에서 땀을 흠뻑 빼면 알코올이 빨리 분해될까요?",
    ans: "X",
    exp: "X (아닙니다) - 알코올 분해에는 다량의 수분이 필요한데, 사우나로 땀을 빼면 탈수가 심해져 오히려 간의 알코올 분해 능력이 떨어지고 위험합니다."
  },
  {
    q: "오메가3는 빈속에 먹는 것이 흡수가 가장 빠를까요?",
    ans: "X",
    exp: "X (아닙니다) - 오메가3는 지용성 지방산이므로 식사(특히 기름기가 있는 음식)와 함께 복용해야 담즙산이 분비되어 흡수율이 수 배 높아집니다."
  }
];

const ENCYCLOPEDIA_GUIDES = [
  {
    tag: "혈압/혈관",
    title: "혈압 단계별 수치와 DASH 식단 가이드",
    snippet: "혈압 수치의 구분과 식생활 관리 시 확인할 내용을 사이트에서 읽어보세요.",
    link: "https://healthfit100.com/health/blood-pressure-stages-hypertension-diet/"
  },
  {
    tag: "혈당/대사",
    title: "식후 혈당 스파이크 막는 거꾸로 식사법",
    snippet: "식사 순서와 식후 혈당 관리에 관한 전체 글을 사이트에서 확인하세요.",
    link: "https://healthfit100.com/health/blood-sugar-spike-prevention-diet/"
  },
  {
    tag: "영양제",
    title: "비타민D 복용시간과 하루 권장량, 마그네슘 결합",
    snippet: "비타민D 섭취와 복용 시 확인할 내용을 사이트에서 읽어보세요.",
    link: "https://healthfit100.com/health/vitamin-d-benefits-daily-intake-timing/"
  },
  {
    tag: "간 건강",
    title: "간수치 AST ALT 정상 수치와 해석, 낮추는 법",
    snippet: "건강검진 간수치를 이해할 때 참고할 내용을 사이트에서 확인하세요.",
    link: "https://healthfit100.com/health/liver-enzymes-ast-alt-guide/"
  },
  {
    tag: "체지방/다이어트",
    title: "체지방 1kg 빼는 칼로리와 현실적인 감량 식단",
    snippet: "체중 관리와 섭취 열량에 관한 전체 글을 사이트에서 읽어보세요.",
    link: "https://healthfit100.com/health/body-fat-loss-calorie-deficit-calculator/"
  },
  {
    tag: "콜레스테롤",
    title: "LDL 콜레스테롤 식단｜달걀보다 포화지방 줄이기",
    snippet: "콜레스테롤과 식생활 관리에 관한 전체 글을 사이트에서 확인하세요.",
    link: "https://healthfit100.com/health/ldl-cholesterol-diet-saturated-fat/"
  }
];

let appState = {
  waterCurrent: 0,
  waterGoal: 2000,
  waterCupAmount: 250,
  waterBottleAmount: 500,
  routines: JSON.parse(JSON.stringify(DEFAULT_ROUTINES)),
  weights: [
    { date: '10/05', weight: 69.2, memo: '초기 측정', bmi: 22.8 },
    { date: '10/07', weight: 68.8, memo: '유산소 후', bmi: 22.6 },
    { date: '10/09', weight: 68.6, memo: '아침 공복', bmi: 22.5 },
    { date: '10/11', weight: 68.2, memo: '오늘 측정', bmi: 22.4 }
  ],
  userProfile: {
    height: 174,
    weight: 68.2,
    gender: 'male',
    age: 32
  },
  streak: 3,
  lastActiveDate: new Date().toISOString().substring(0, 10),
  soundEnabled: true,
  historyLogs: [
    { time: '오전 08:30', icon: '💧', title: '물 250ml 섭취', desc: '아침 기상 후 수분 보충' },
    { time: '오전 08:32', icon: '💊', title: '유산균 복용 완료', desc: '아침 루틴 실천' },
    { time: '오전 09:10', icon: '⚖️', title: '체중 68.2kg 기록', desc: '아침 공복 측정' }
  ],
  currentQuizIndex: 0
};

// ==========================================
// 2. Audio Effects (Web Audio API Synthesizer)
// ==========================================
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playWaterSound() {
  if (!appState.soundEnabled) return;
  try {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(750, audioCtx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.12);
  } catch (e) {}
}

function playChimeSound() {
  if (!appState.soundEnabled) return;
  try {
    initAudio();
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.08);
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + idx * 0.08 + 0.25);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(audioCtx.currentTime + idx * 0.08);
      osc.stop(audioCtx.currentTime + idx * 0.08 + 0.25);
    });
  } catch (e) {}
}

// ==========================================
// 3. State Persistence
// ==========================================
function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      appState = { ...appState, ...parsed };
      
      // Check date rollover for daily habits and water
      const today = new Date().toISOString().substring(0, 10);
      if (appState.lastActiveDate !== today) {
        // If consecutive day, streak + 1, else reset
        const prev = new Date(appState.lastActiveDate);
        const curr = new Date(today);
        const diffDays = Math.round((curr - prev) / (1000 * 3600 * 24));
        if (diffDays === 1) {
          appState.streak += 1;
        } else if (diffDays > 1) {
          appState.streak = 1;
        }
        appState.lastActiveDate = today;
        appState.waterCurrent = 0; // reset water for new day
        appState.routines.forEach(r => r.done = false); // reset routines
      }
    } catch (e) {
      console.warn("Storage load error:", e);
    }
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
}

// ==========================================
// 4. Score Calculation & Home UI
// ==========================================
function calculateDailyScore() {
  let score = 0;
  
  // 1. Water Intake (up to 30 pts)
  const waterRatio = Math.min(1, appState.waterCurrent / appState.waterGoal);
  score += Math.round(waterRatio * 30);

  // 2. Routines Completion (up to 40 pts)
  const totalRoutines = appState.routines.length;
  const doneRoutines = appState.routines.filter(r => r.done).length;
  if (totalRoutines > 0) {
    score += Math.round((doneRoutines / totalRoutines) * 40);
  }

  // 3. Weight log present (15 pts)
  const todayStr = (new Date().getMonth() + 1) + '/' + new Date().getDate();
  const hasLoggedWeight = appState.weights.some(w => w.date === todayStr);
  if (hasLoggedWeight || appState.weights.length > 0) {
    score += 15;
  }

  // 4. Base health active bonus (15 pts)
  score += 15;

  return Math.min(100, Math.max(0, score));
}

function renderHomeDashboard() {
  // Score Ring
  const score = calculateDailyScore();
  const scoreEl = document.getElementById('dailyScoreText');
  const ringProgress = document.getElementById('scoreRingProgress');
  const badgeEl = document.getElementById('scoreGradeBadge');
  const summaryEl = document.getElementById('scoreSummaryDesc');

  if (scoreEl) scoreEl.innerText = score;
  if (ringProgress) {
    const circumference = 314; // 2 * pi * 50
    const offset = circumference - (circumference * (score / 100));
    ringProgress.style.strokeDashoffset = offset;
  }

  if (badgeEl) {
    if (score >= 85) badgeEl.innerText = '오늘의 활력 상태: 최상 🌟';
    else if (score >= 60) badgeEl.innerText = '오늘의 활력 상태: 양호 ✨';
    else badgeEl.innerText = '건강 루틴을 실천해 보세요! 💪';
  }

  // Water Widget
  const waterCurrentEl = document.getElementById('waterCurrentDisplay');
  const waterGoalEl = document.getElementById('waterGoalDisplay');
  const waterBar = document.getElementById('waterProgressBar');
  if (waterCurrentEl) waterCurrentEl.innerText = appState.waterCurrent.toLocaleString();
  if (waterGoalEl) waterGoalEl.innerText = appState.waterGoal.toLocaleString();
  if (waterBar) {
    const pct = Math.min(100, Math.round((appState.waterCurrent / appState.waterGoal) * 100));
    waterBar.style.width = pct + '%';
  }

  // Streak Text
  const streakText = document.getElementById('streakCountText');
  if (streakText) streakText.innerText = `${appState.streak}일`;

  // Weight Preview
  const lastWeight = appState.weights[appState.weights.length - 1];
  if (lastWeight) {
    const weightEl = document.getElementById('lastWeightText');
    const bmiEl = document.getElementById('lastBmiText');
    if (weightEl) weightEl.innerText = lastWeight.weight;
    if (bmiEl) bmiEl.innerText = lastWeight.bmi;
  }

  // Routine Checklist on Home
  const homeRoutineList = document.getElementById('homeRoutineList');
  if (homeRoutineList) {
    homeRoutineList.innerHTML = '';
    const slice = appState.routines.slice(0, 3);
    slice.forEach(routine => {
      const item = document.createElement('div');
      item.className = `routine-check-item ${routine.done ? 'done' : ''}`;
      item.innerHTML = `
        <div class="routine-left">
          <div class="custom-checkbox">
            <i data-lucide="check" style="width:14px; height:14px;"></i>
          </div>
          <div>
            <div class="routine-label">${routine.name}</div>
          </div>
        </div>
        <span class="routine-tag">${getTimeTagText(routine.time)}</span>
      `;
      item.addEventListener('click', () => {
        routine.done = !routine.done;
        if (routine.done) {
          playChimeSound();
          addTimelineLog('💊', `${routine.name} 복용 완료`, '습관 체크');
        }
        saveState();
        renderHomeDashboard();
        renderRoutinesTab();
      });
      homeRoutineList.appendChild(item);
    });

    const total = appState.routines.length;
    const done = appState.routines.filter(r => r.done).length;
    const progressSub = document.getElementById('routineProgressSub');
    if (progressSub) progressSub.innerText = `${total}개 중 ${done}개 완료`;
  }

  refreshIcons();
}

function getTimeTagText(time) {
  if (time === 'morning') return '아침';
  if (time === 'noon') return '점심/오후';
  return '저녁/취침전';
}

function addTimelineLog(icon, title, desc) {
  const now = new Date();
  const timeStr = `${now.getHours() < 12 ? '오전' : '오후'} ${String(now.getHours() % 12 || 12).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  appState.historyLogs.unshift({ time: timeStr, icon, title, desc });
  if (appState.historyLogs.length > 30) appState.historyLogs.pop();
  saveState();
  renderTimeline();
}

// ==========================================
// 5. Routines Tab Rendering
// ==========================================
function renderRoutinesTab() {
  const mList = document.getElementById('listMorningRoutines');
  const nList = document.getElementById('listNoonRoutines');
  const eList = document.getElementById('listEveningRoutines');

  if (!mList || !nList || !eList) return;

  mList.innerHTML = '';
  nList.innerHTML = '';
  eList.innerHTML = '';

  appState.routines.forEach(r => {
    const card = document.createElement('div');
    card.className = `routine-card-item ${r.done ? 'done' : ''}`;
    card.innerHTML = `
      <div class="routine-card-left">
        <div class="custom-checkbox">
          <i data-lucide="check" style="width:14px; height:14px;"></i>
        </div>
        <div>
          <div class="card-routine-name">${r.name}</div>
          <div class="card-routine-tip">${r.tip || '매일 꾸준한 실천이 건강을 바꿉니다'}</div>
        </div>
      </div>
      <button class="icon-btn btn-del-routine" style="width:28px; height:28px; opacity:0.6;" title="삭제">&times;</button>
    `;

    // Toggle click
    card.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-del-routine')) return;
      r.done = !r.done;
      if (r.done) playChimeSound();
      saveState();
      renderHomeDashboard();
      renderRoutinesTab();
    });

    // Delete click
    card.querySelector('.btn-del-routine').addEventListener('click', (e) => {
      e.stopPropagation();
      appState.routines = appState.routines.filter(item => item.id !== r.id);
      saveState();
      renderHomeDashboard();
      renderRoutinesTab();
    });

    if (r.time === 'morning') mList.appendChild(card);
    else if (r.time === 'noon') nList.appendChild(card);
    else eList.appendChild(card);
  });

  // Detailed Progress Bar
  const total = appState.routines.length;
  const done = appState.routines.filter(r => r.done).length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  const pctEl = document.getElementById('routineDetailedPercent');
  const barEl = document.getElementById('routineDetailedBar');
  if (pctEl) pctEl.innerText = `${pct}%`;
  if (barEl) barEl.style.width = `${pct}%`;

  refreshIcons();
}

// ==========================================
// 6. Weight Trend Canvas Chart
// ==========================================
function renderWeightChart() {
  const canvas = document.getElementById('weightChartCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;

  canvas.width = rect.width * dpr;
  canvas.height = 200 * dpr;
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = 200;

  ctx.clearRect(0, 0, w, h);

  const data = appState.weights.slice(-7);
  if (data.length < 2) {
    ctx.fillStyle = '#64748b';
    ctx.font = '13px Pretendard';
    ctx.textAlign = 'center';
    ctx.fillText('체중을 2회 이상 기록하면 그래프가 생성됩니다', w / 2, h / 2);
    return;
  }

  const weights = data.map(d => d.weight);
  const minW = Math.min(...weights) - 1;
  const maxW = Math.max(...weights) + 1;
  const paddingX = 40;
  const paddingY = 30;

  const points = data.map((d, i) => {
    const x = paddingX + (i / (data.length - 1)) * (w - paddingX * 2);
    const y = h - paddingY - ((d.weight - minW) / (maxW - minW)) * (h - paddingY * 2);
    return { x, y, val: d.weight, label: d.date };
  });

  // Background Grid Lines
  ctx.strokeStyle = '#f1f5f9';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 3; i++) {
    const y = paddingY + (i / 3) * (h - paddingY * 2);
    ctx.beginPath();
    ctx.moveTo(paddingX, y);
    ctx.lineTo(w - paddingX, y);
    ctx.stroke();
  }

  // Area Gradient
  const grad = ctx.createLinearGradient(0, paddingY, 0, h);
  grad.addColorStop(0, 'rgba(2, 132, 199, 0.25)');
  grad.addColorStop(1, 'rgba(2, 132, 199, 0.0)');

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.lineTo(points[points.length - 1].x, h - paddingY);
  ctx.lineTo(points[0].x, h - paddingY);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Line Stroke
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke();

  // Draw Dots & Values
  points.forEach((pt) => {
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Text Label
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 11px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${pt.val}kg`, pt.x, pt.y - 10);

    // Date Label
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px Pretendard, sans-serif';
    ctx.fillText(pt.label, pt.x, h - 10);
  });
}

function renderTimeline() {
  const timelineList = document.getElementById('timelineList');
  if (!timelineList) return;
  timelineList.innerHTML = '';
  appState.historyLogs.slice(0, 10).forEach(item => {
    const row = document.createElement('div');
    row.className = 'timeline-item';
    row.innerHTML = `
      <div class="timeline-icon-box">${item.icon}</div>
      <div class="timeline-content">
        <div class="timeline-title">${item.title}</div>
        <div class="timeline-desc">${item.desc}</div>
      </div>
      <div class="timeline-time">${item.time}</div>
    `;
    timelineList.appendChild(row);
  });
}

// ==========================================
// 7. Calculators Logic Implementations
// ==========================================

function initCalculators() {
  // 1. Category Filtering
  const filterBtns = document.querySelectorAll('.calc-filter-btn');
  const hubCards = document.querySelectorAll('.calc-hub-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      hubCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
      playWaterSound();
    });
  });

  // 2. Bottom Sheet Modal Opening / Closing
  const backdrop = document.getElementById('calcModalBackdrop');
  const btnClose = document.getElementById('btnModalClose');
  const btnBack = document.getElementById('btnModalBack');
  const categoryLabel = document.getElementById('modalCategoryLabel');

  const CATEGORY_NAMES = {
    diet: '🔥 체형·다이어트',
    vital: '⚡ 일상·활력',
    life: '🍷 라이프·건강'
  };

  function openCalc(calcName, category) {
    if (!backdrop) return;
    document.querySelectorAll('.calc-box').forEach(b => b.classList.remove('active'));
    const target = document.getElementById('calcBox' + calcName.charAt(0).toUpperCase() + calcName.slice(1));
    if (target) {
      target.classList.add('active');
    }
    if (categoryLabel && category) {
      categoryLabel.textContent = CATEGORY_NAMES[category] || '스마트 계산기';
    }
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    playWaterSound();
    refreshIcons();
    const scrollContent = document.querySelector('.modal-scroll-content');
    if (scrollContent) scrollContent.scrollTop = 0;
  }

  function closeCalc() {
    if (!backdrop) return;
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  hubCards.forEach(card => {
    card.addEventListener('click', () => {
      const calcName = card.getAttribute('data-calc');
      const category = card.getAttribute('data-category');
      openCalc(calcName, category);
    });
  });

  if (btnClose) btnClose.addEventListener('click', closeCalc);
  if (btnBack) btnBack.addEventListener('click', closeCalc);
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeCalc();
    });
  }

  // 1. BMI Calculation
  const btnBmi = document.getElementById('btnRunBmi');
  if (btnBmi) {
    btnBmi.addEventListener('click', () => {
      const h = parseFloat(document.getElementById('bmiHeight').value);
      const w = parseFloat(document.getElementById('bmiWeight').value);
      if (!h || !w || h <= 0 || w <= 0) {
        alert('키와 몸무게를 올바르게 입력해 주세요.');
        return;
      }
      const m = h / 100;
      const bmi = w / (m * m);
      let cat = '', color = '#0284c7', bg = '#e0f2fe';

      if (bmi < 18.5) { cat = '저체중'; color = '#d97706'; bg = '#fef3c7'; }
      else if (bmi < 23) { cat = '정상 체중'; color = '#15803d'; bg = '#dcfce7'; }
      else if (bmi < 25) { cat = '과체중 (위험체중)'; color = '#d97706'; bg = '#fef3c7'; }
      else if (bmi < 30) { cat = '비만 1단계'; color = '#dc2626'; bg = '#fee2e2'; }
      else { cat = '고도비만 (비만 2단계)'; color = '#991b1b'; bg = '#fee2e2'; }

      const standardW = (22 * m * m).toFixed(1);
      const diff = (w - standardW).toFixed(1);
      const diffSign = diff > 0 ? `+${diff}` : diff;

      const resArea = document.getElementById('resultBmiArea');
      resArea.style.display = 'block';
      resArea.innerHTML = `
        <span class="result-badge" style="background:${bg}; color:${color};">${cat}</span>
        <div class="result-main-val" style="color:${color};">BMI ${bmi.toFixed(1)}</div>
        <p style="font-size:0.85rem; color:#475569;">한국인 표준 체형 기준 적정 체중은 약 <strong>${standardW}kg</strong> 입니다.</p>
        <div class="result-details-grid">
          <div class="result-detail-item">
            <span class="label">표준 체중과의 차이</span>
            <span class="value">${diffSign} kg</span>
          </div>
          <div class="result-detail-item">
            <span class="label">대한비만학회 진단</span>
            <span class="value" style="color:${color};">${cat}</span>
          </div>
        </div>
      `;
      addTimelineLog('⚖️', `BMI 계산: ${bmi.toFixed(1)} (${cat})`, `키 ${h}cm, 체중 ${w}kg`);
    });
  }

  // 2. Calorie & TDEE Calculation
  const btnCal = document.getElementById('btnRunCalorie');
  if (btnCal) {
    btnCal.addEventListener('click', () => {
      const gender = document.querySelector('input[name="calGender"]:checked').value;
      const age = parseInt(document.getElementById('calAge').value);
      const h = parseFloat(document.getElementById('calHeight').value);
      const w = parseFloat(document.getElementById('calWeight').value);
      const act = parseFloat(document.getElementById('calActivity').value);

      if (!age || !h || !w || age <= 0 || h <= 0 || w <= 0) {
        alert('모든 신체 정보를 입력해 주세요.');
        return;
      }

      // Mifflin-St Jeor
      let bmr = (10 * w) + (6.25 * h) - (5 * age);
      bmr += (gender === 'male' ? 5 : -161);
      const tdee = Math.round(bmr * act);
      const lossCal = Math.round(tdee - 500);
      const bulkCal = Math.round(tdee + 400);

      const resArea = document.getElementById('resultCalorieArea');
      resArea.style.display = 'block';
      resArea.innerHTML = `
        <span class="result-badge" style="background:#e0f2fe; color:#0369a1;">하루 활동 유지 칼로리 (TDEE)</span>
        <div class="result-main-val" style="color:#0284c7;">${tdee.toLocaleString()} <span style="font-size:1rem;">kcal</span></div>
        <p style="font-size:0.83rem; color:#475569;">숨만 쉬어도 소모되는 기초대사량(BMR)은 <strong>${Math.round(bmr).toLocaleString()} kcal</strong> 입니다.</p>
        <div class="result-details-grid">
          <div class="result-detail-item">
            <span class="label">체중 감량 다이어트 목표</span>
            <span class="value" style="color:#059669;">${lossCal.toLocaleString()} kcal</span>
          </div>
          <div class="result-detail-item">
            <span class="label">근육 증가 린매스업 목표</span>
            <span class="value" style="color:#d97706;">${bulkCal.toLocaleString()} kcal</span>
          </div>
        </div>
      `;
    });
  }

  // 3. Water Intake Calculation
  const btnWater = document.getElementById('btnRunWater');
  if (btnWater) {
    btnWater.addEventListener('click', () => {
      const w = parseFloat(document.getElementById('calcWaterWeight').value);
      const act = document.getElementById('calcWaterActivity').value;
      if (!w || w <= 0) {
        alert('체중을 입력해 주세요.');
        return;
      }
      let bonus = 0;
      if (act === 'active') bonus = 400;
      if (act === 'heavy') bonus = 800;
      const rec = Math.round((w * 33) + bonus);

      const resArea = document.getElementById('resultWaterArea');
      resArea.style.display = 'block';
      resArea.innerHTML = `
        <span class="result-badge" style="background:#e0f2fe; color:#0284c7;">하루 권장 수분 섭취량</span>
        <div class="result-main-val" style="color:#0284c7;">${rec.toLocaleString()} <span style="font-size:1rem;">ml</span></div>
        <p style="font-size:0.83rem; color:#475569;">일반 250ml 컵 기준 약 <strong>${(rec / 250).toFixed(1)}잔</strong>에 해당합니다.</p>
        <button class="btn btn-sm btn-secondary" id="btnApplyWaterGoal" style="margin-top:10px;">
          이 수치를 오늘의 물 목표로 적용하기
        </button>
      `;

      document.getElementById('btnApplyWaterGoal').addEventListener('click', () => {
        appState.waterGoal = rec;
        saveState();
        renderHomeDashboard();
        alert(`오늘의 물 마시기 목표가 ${rec.toLocaleString()}ml로 설정되었습니다!`);
      });
    });
  }

  // 4. Protein Calculation
  const btnProtein = document.getElementById('btnRunProtein');
  if (btnProtein) {
    btnProtein.addEventListener('click', () => {
      const w = parseFloat(document.getElementById('calcProteinWeight').value);
      const factor = parseFloat(document.getElementById('calcProteinGoal').value);
      if (!w || w <= 0) {
        alert('체중을 입력해 주세요.');
        return;
      }
      const needed = Math.round(w * factor);
      const chickenBreasts = (needed / 23).toFixed(1); // approx 23g per 100g breast
      const eggs = (needed / 6).toFixed(1); // approx 6g per egg

      const resArea = document.getElementById('resultProteinArea');
      resArea.style.display = 'block';
      resArea.innerHTML = `
        <span class="result-badge" style="background:#dcfce7; color:#15803d;">일일 필요 단백질</span>
        <div class="result-main-val" style="color:#10b981;">${needed} <span style="font-size:1rem;">g</span></div>
        <p style="font-size:0.83rem; color:#475569;">한 끼에 몰아먹기보다 3회 이상 분할 섭취하는 것이 근합성에 유리합니다.</p>
        <div class="result-details-grid">
          <div class="result-detail-item">
            <span class="label">닭가슴살(100g) 환산</span>
            <span class="value">약 ${chickenBreasts} 덩이</span>
          </div>
          <div class="result-detail-item">
            <span class="label">달걀(개당 6g) 환산</span>
            <span class="value">약 ${eggs} 개</span>
          </div>
        </div>
      `;
    });
  }

  // 5. Caffeine Selector
  const drinkCards = document.querySelectorAll('.drink-card');
  let currentCaffeineTotal = 0;
  drinkCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('selected');
      const mg = parseInt(card.getAttribute('data-caffeine'));
      if (card.classList.contains('selected')) {
        currentCaffeineTotal += mg;
      } else {
        currentCaffeineTotal = Math.max(0, currentCaffeineTotal - mg);
      }
      const resArea = document.getElementById('resultCaffeineArea');
      let statusColor = '#059669', statusText = '안전 범위 내 섭취입니다.';
      if (currentCaffeineTotal > 400) {
        statusColor = '#dc2626';
        statusText = '식약처 성인 일일 권장 최대치(400mg)를 초과했습니다! 수면 장애에 주의하세요.';
      } else if (currentCaffeineTotal >= 300) {
        statusColor = '#d97706';
        statusText = '상한치에 근접했습니다. 오후 3시 이후에는 디카페인을 권장합니다.';
      }

      resArea.innerHTML = `
        <div class="result-main-val" style="color:${statusColor};">${currentCaffeineTotal} <span style="font-size:1rem;">mg</span></div>
        <p style="font-size:0.83rem; font-weight:700; color:${statusColor};">${statusText}</p>
        <span style="font-size:0.75rem; color:#64748b;">(식약처 권장 일일 최대치: 성인 400mg, 임산부 300mg 이하)</span>
      `;
    });
  });

  // 6. Widmark Alcohol Clock
  const btnAlc = document.getElementById('btnRunAlcohol');
  if (btnAlc) {
    btnAlc.addEventListener('click', () => {
      const gender = document.querySelector('input[name="alcGender"]:checked').value;
      const w = parseFloat(document.getElementById('alcWeight').value);
      const soju = parseFloat(document.getElementById('alcSoju').value) || 0;
      const beer = parseFloat(document.getElementById('alcBeer').value) || 0;

      if (!w || w <= 0) {
        alert('체중을 입력해 주세요.');
        return;
      }
      if (soju === 0 && beer === 0) {
        alert('마신 술 잔수를 1잔 이상 입력해 주세요.');
        return;
      }

      // Pure alcohol: soju 50ml * 0.165 * 0.8 = 6.6g per shot. beer 500ml * 0.045 * 0.8 = 18g
      const pureAlcoholGrams = (soju * 6.6) + (beer * 18.0);
      const r = gender === 'male' ? 0.86 : 0.73;
      const bac = (pureAlcoholGrams / (w * r * 10)) * 100; // Blood Alcohol Concentration %

      // Elimination rate: ~0.015% per hour
      const hoursNeeded = bac / 0.015;
      const hours = Math.floor(hoursNeeded);
      const mins = Math.round((hoursNeeded - hours) * 60);

      const targetDate = new Date(Date.now() + hoursNeeded * 3600 * 1000);
      const finishTimeStr = `${targetDate.getHours() < 12 ? '오전' : '오후'} ${String(targetDate.getHours() % 12 || 12).padStart(2, '0')}:${String(targetDate.getMinutes()).padStart(2, '0')}`;

      const resArea = document.getElementById('resultAlcoholArea');
      resArea.style.display = 'block';
      resArea.innerHTML = `
        <span class="result-badge" style="background:#fee2e2; color:#dc2626;">예상 완전 분해 소요 시간</span>
        <div class="result-main-val" style="color:#dc2626;">약 ${hours}시간 ${mins}분</div>
        <p style="font-size:0.86rem; color:#475569;">내일 <strong>${finishTimeStr}</strong> 경에 알코올이 완전히 분해됩니다.</p>
        <div class="result-details-grid">
          <div class="result-detail-item">
            <span class="label">최고 예상 혈중알코올농도</span>
            <span class="value" style="color:#dc2626;">${bac.toFixed(3)}%</span>
          </div>
          <div class="result-detail-item">
            <span class="label">음주 운전 절대 금지</span>
            <span class="value">0.03% 이상 처벌</span>
          </div>
        </div>
      `;
    });
  }

  // 7. Exercise Calories
  const btnEx = document.getElementById('btnRunExercise');
  if (btnEx) {
    btnEx.addEventListener('click', () => {
      const w = parseFloat(document.getElementById('exWeight').value);
      const min = parseFloat(document.getElementById('exTime').value);
      const met = parseFloat(document.getElementById('exType').value);

      if (!w || !min || w <= 0 || min <= 0) {
        alert('체중과 운동 시간을 입력해 주세요.');
        return;
      }

      // Calories = MET * 3.5 * weight / 200 * minutes
      const calories = Math.round(met * 3.5 * w * (1 / 200) * min);

      const resArea = document.getElementById('resultExerciseArea');
      resArea.style.display = 'block';
      resArea.innerHTML = `
        <span class="result-badge" style="background:#fef3c7; color:#d97706;">예상 운동 소모 에너지</span>
        <div class="result-main-val" style="color:#d97706;">${calories.toLocaleString()} <span style="font-size:1rem;">kcal</span></div>
        <p style="font-size:0.83rem; color:#475569;">공깃밥 1공기(300kcal)의 <strong>${(calories / 300).toFixed(1)}배</strong>에 해당하는 에너지입니다.</p>
      `;
    });
  }

  // 8. Supplement Checker
  const suppData = [
    { id: 'vitD', name: '비타민 D', time: '아침/점심 식후' },
    { id: 'omega', name: '오메가3', time: '점심/저녁 식후' },
    { id: 'mag', name: '마그네슘', time: '저녁 취침전' },
    { id: 'pro', name: '유산균', time: '아침 기상직후' },
    { id: 'iron', name: '철분', time: '공복' },
    { id: 'cal', name: '칼슘', time: '식후' },
    { id: 'lutein', name: '루테인', time: '아침/점심 식후' },
    { id: 'vitB', name: '비타민 B군', time: '아침 식후' }
  ];

  const suppGrid = document.getElementById('suppCheckGrid');
  if (suppGrid) {
    suppGrid.innerHTML = '';
    suppData.forEach(item => {
      const card = document.createElement('label');
      card.className = 'supp-check-card';
      card.innerHTML = `
        <input type="checkbox" value="${item.id}">
        <span>${item.name}</span>
      `;
      card.querySelector('input').addEventListener('change', (e) => {
        card.classList.toggle('checked', e.target.checked);
      });
      suppGrid.appendChild(card);
    });
  }

  const btnSupp = document.getElementById('btnAnalyzeSupplements');
  if (btnSupp) {
    btnSupp.addEventListener('click', () => {
      const selected = Array.from(document.querySelectorAll('#suppCheckGrid input:checked')).map(cb => cb.value);
      if (selected.length === 0) {
        alert('분석할 영양제를 1개 이상 선택해 주세요.');
        return;
      }

      let warnings = [];
      let synergies = [];

      // Interactions
      if (selected.includes('iron') && selected.includes('cal')) {
        warnings.push('⚠️ 철분과 칼슘은 서로의 흡수를 방해하므로 최소 2~3시간 간격을 두고 따로 섭취하세요.');
      }
      if (selected.includes('mag') && selected.includes('cal')) {
        synergies.push('✨ 칼슘과 마그네슘은 2:1 비율로 함께 복용할 때 골밀도 형성에 탁월한 시너지를 냅니다.');
      }
      if (selected.includes('vitD') && selected.includes('mag')) {
        synergies.push('✨ 마그네슘은 비타민D를 체내 활성 형태로 전환하는 필수 촉매 역할을 합니다.');
      }
      if (selected.includes('omega') && selected.includes('lutein')) {
        synergies.push('✨ 오메가3와 루테인은 모두 지용성이며, 눈의 망막 건강에 최고의 시너지 조합입니다.');
      }

      const resArea = document.getElementById('resultSupplementArea');
      resArea.style.display = 'block';
      let html = `<div style="text-align:left;">`;
      if (warnings.length > 0) {
        html += `<h4 style="color:#dc2626; margin-bottom:6px;">주의사항</h4>`;
        warnings.forEach(w => html += `<p style="font-size:0.83rem; color:#b91c1c; margin-bottom:4px;">${w}</p>`);
      }
      if (synergies.length > 0) {
        html += `<h4 style="color:#15803d; margin:10px 0 6px;">찰떡 시너지 조합</h4>`;
        synergies.forEach(s => html += `<p style="font-size:0.83rem; color:#166534; margin-bottom:4px;">${s}</p>`);
      }
      if (warnings.length === 0 && synergies.length === 0) {
        html += `<p style="font-size:0.85rem; color:#475569;">선택하신 영양제 조합은 상충하는 부작용 없이 복용 가능한 조합입니다.</p>`;
      }
      html += `</div>`;
      resArea.innerHTML = html;
    });
  }
}

// ==========================================
// 8. Quiz & Encyclopedia
// ==========================================
function renderQuiz() {
  const quiz = HEALTH_QUIZZES[appState.currentQuizIndex % HEALTH_QUIZZES.length];
  const qText = document.getElementById('quizQuestionText');
  const expArea = document.getElementById('quizExplanationArea');
  const expText = document.getElementById('quizExpText');

  if (qText) qText.innerText = quiz.q;
  if (expArea) expArea.style.display = 'none';

  const quizBtns = document.querySelectorAll('.btn-quiz');
  quizBtns.forEach(btn => {
    btn.onclick = () => {
      const choice = btn.getAttribute('data-ans');
      const isCorrect = choice === quiz.ans;
      if (isCorrect) playChimeSound();
      expArea.style.display = 'block';
      expText.innerHTML = `<strong>${isCorrect ? '정답입니다! 🎉' : '아쉽네요! 💡'}</strong><br>${quiz.exp}`;
      const article = document.createElement('a');
      article.href = 'https://healthfit100.com/blog';
      article.target = '_blank';
      article.rel = 'noopener noreferrer';
      article.className = 'site-read-button';
      article.textContent = '사이트에서 건강 관련 글 더 읽기 ↗';
      expText.appendChild(article);
    };
  });

  const nextBtn = document.getElementById('btnNextQuiz');
  if (nextBtn) {
    nextBtn.onclick = () => {
      appState.currentQuizIndex++;
      saveState();
      renderQuiz();
    };
  }
}

function renderEncyclopedia() {
  const grid = document.getElementById('guideCardsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  ENCYCLOPEDIA_GUIDES.forEach(g => {
    const card = document.createElement('a');
    card.className = 'guide-card-item';
    card.href = g.link;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.style.textDecoration = 'none';
    card.style.display = 'block';
    card.style.color = 'inherit';
    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
        <span class="guide-card-tag">${g.tag}</span>
        <span style="font-size:0.75rem; color:#0284c7; font-weight:700;">사이트에서 읽기 ↗</span>
      </div>
      <h4 class="guide-card-title">${g.title}</h4>
      <p class="guide-card-snippet">${g.snippet}</p><span class="site-read-button">healthfit100.com에서 전체 글 읽기 ↗</span>
    `;
    grid.appendChild(card);
  });

  // Big Link to healthfit100.com/blog
  const blogLinkCard = document.createElement('div');
  blogLinkCard.style.cssText = 'margin-top:14px; text-align:center; padding:18px 16px; background:#e0f2fe; border-radius:14px; border:1px solid #bae6fd;';
  blogLinkCard.innerHTML = `
    <h4 style="font-size:0.96rem; font-weight:800; color:#0369a1; margin-bottom:4px;">📰 건강노트 전체 칼럼 보러가기</h4>
    <p style="font-size:0.8rem; color:#0284c7; margin-bottom:12px;">새 글과 수정된 본문은 healthfit100.com에서 확인하세요.</p>
    <a href="https://healthfit100.com/blog" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary" style="text-decoration:none; display:inline-flex;">
      건강노트 블로그 바로가기 &gt;
    </a>
  `;
  grid.appendChild(blogLinkCard);
}

// ==========================================
// 9. Modals & Event Listeners
// ==========================================
function setupEventListeners() {
  // Navigation Tabs Switching
  const navItems = document.querySelectorAll('.bottom-nav-bar .nav-item');
  const tabPanels = document.querySelectorAll('.tab-panel');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(n => n.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      item.classList.add('active');
      const targetId = item.getAttribute('data-tab');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
        document.getElementById('contentViewport').scrollTop = 0;
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        if (targetId === 'tabLogs') {
          setTimeout(renderWeightChart, 50);
        }
      }
      refreshIcons();
    });
  });

  // Go to routine tab link on Home
  const btnGoToRoutine = document.getElementById('btnGoToRoutineTab');
  if (btnGoToRoutine) {
    btnGoToRoutine.addEventListener('click', () => {
      document.querySelector('.nav-item[data-tab="tabRoutine"]').click();
    });
  }

  // Editable water portions are stored separately from today's intake.
  const waterPortions = [
    { id: 'waterCupAmount', key: 'waterCupAmount', label: 'waterCupLabel', fallback: 250 },
    { id: 'waterBottleAmount', key: 'waterBottleAmount', label: 'waterBottleLabel', fallback: 500 }
  ];
  const validWaterAmount = amount => Number.isInteger(amount) && amount >= 1 && amount <= 3000;
  waterPortions.forEach(portion => {
    const input = document.getElementById(portion.id);
    if (!input) return;
    const stored = Number(appState[portion.key]);
    input.value = validWaterAmount(stored) ? stored : portion.fallback;
    const updateLabel = () => {
      const amount = Number(input.value);
      input.setCustomValidity(validWaterAmount(amount) ? '' : '1~3,000ml 사이의 정수를 입력해 주세요.');
      document.getElementById(portion.label).textContent = validWaterAmount(amount) ? `${amount.toLocaleString()}ml 추가` : '용량 입력 후 추가';
      return amount;
    };
    updateLabel();
    input.addEventListener('input', updateLabel);
    input.addEventListener('change', () => {
      const amount = updateLabel();
      if (validWaterAmount(amount)) {
        appState[portion.key] = amount;
        saveState();
      }
    });
  });
  document.querySelectorAll('.btn-water-add').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.amountInput);
      const amt = Number(input.value);
      if (!validWaterAmount(amt)) {
        input.setCustomValidity('1~3,000ml 사이의 정수를 입력해 주세요.');
        input.reportValidity();
        input.focus();
        return;
      }
      input.setCustomValidity('');
      const portion = waterPortions.find(item => item.id === input.id);
      appState[portion.key] = amt;
      appState.waterCurrent += amt;
      playWaterSound();
      addTimelineLog('💧', `물 ${amt}ml 섭취`, `현재 누적 ${appState.waterCurrent}ml`);
      saveState();
      renderHomeDashboard();
    });
  });

  const btnWaterReset = document.getElementById('btnWaterReset');
  if (btnWaterReset) {
    btnWaterReset.addEventListener('click', () => {
      if (confirm('오늘의 수분 섭취 기록을 초기화하시겠습니까?')) {
        appState.waterCurrent = 0;
        saveState();
        renderHomeDashboard();
      }
    });
  }

  // Weight Modal
  const modalWeight = document.getElementById('modalWeight');
  const btnOpenWeight = document.getElementById('btnOpenWeightInput');
  const btnChartAddWeight = document.getElementById('btnChartAddWeight');
  const btnCloseWeight = document.getElementById('btnCloseWeightModal');
  const btnCancelWeight = document.getElementById('btnCancelWeightModal');
  const btnSaveWeight = document.getElementById('btnSaveWeight');

  const openWeightModal = () => {
    document.getElementById('inputNewWeight').value = appState.weights[appState.weights.length - 1]?.weight || '';
    modalWeight.classList.add('active');
  };

  if (btnOpenWeight) btnOpenWeight.addEventListener('click', openWeightModal);
  if (btnChartAddWeight) btnChartAddWeight.addEventListener('click', openWeightModal);

  const closeWeightModal = () => modalWeight.classList.remove('active');
  if (btnCloseWeight) btnCloseWeight.addEventListener('click', closeWeightModal);
  if (btnCancelWeight) btnCancelWeight.addEventListener('click', closeWeightModal);

  if (btnSaveWeight) {
    btnSaveWeight.addEventListener('click', () => {
      const val = parseFloat(document.getElementById('inputNewWeight').value);
      const memo = document.getElementById('inputWeightMemo').value || '체중 기록';
      if (!val || val <= 0) {
        alert('올바른 체중을 입력해 주세요.');
        return;
      }
      const todayStr = (new Date().getMonth() + 1) + '/' + new Date().getDate();
      const m = (appState.userProfile.height || 172) / 100;
      const bmi = parseFloat((val / (m * m)).toFixed(1));

      appState.weights.push({ date: todayStr, weight: val, memo, bmi });
      playChimeSound();
      addTimelineLog('⚖️', `체중 ${val}kg 기록`, memo);
      saveState();
      closeWeightModal();
      renderHomeDashboard();
      renderWeightChart();
    });
  }

  // Routine Modal
  const modalAddRoutine = document.getElementById('modalAddRoutine');
  const btnAddNewRoutine = document.getElementById('btnAddNewRoutine');
  const btnCloseAddRoutine = document.getElementById('btnCloseAddRoutineModal');
  const btnCancelAddRoutine = document.getElementById('btnCancelAddRoutineModal');
  const btnSaveRoutine = document.getElementById('btnSaveRoutine');

  if (btnAddNewRoutine) {
    btnAddNewRoutine.addEventListener('click', () => {
      modalAddRoutine.classList.add('active');
    });
  }

  const closeAddRoutineModal = () => modalAddRoutine.classList.remove('active');
  if (btnCloseAddRoutine) btnCloseAddRoutine.addEventListener('click', closeAddRoutineModal);
  if (btnCancelAddRoutine) btnCancelAddRoutine.addEventListener('click', closeAddRoutineModal);

  if (btnSaveRoutine) {
    btnSaveRoutine.addEventListener('click', () => {
      const name = document.getElementById('inputRoutineName').value.trim();
      const time = document.getElementById('selectRoutineTime').value;
      const tip = document.getElementById('inputRoutineTip').value.trim();

      if (!name) {
        alert('습관 또는 영양제 이름을 입력해 주세요.');
        return;
      }

      appState.routines.push({
        id: 'r_' + Date.now(),
        name,
        time,
        tip: tip || '꾸준한 습관이 건강을 만듭니다',
        done: false
      });
      saveState();
      closeAddRoutineModal();
      renderHomeDashboard();
      renderRoutinesTab();
    });
  }

  // Settings Modal
  const modalSettings = document.getElementById('modalSettings');
  const btnSettings = document.getElementById('btnSettings');
  const btnCloseSettings = document.getElementById('btnCloseSettingsModal');

  if (btnSettings) {
    btnSettings.addEventListener('click', () => {
      modalSettings.classList.add('active');
    });
  }
  if (btnCloseSettings) {
    btnCloseSettings.addEventListener('click', () => {
      modalSettings.classList.remove('active');
    });
  }

  const btnToggleSound = document.getElementById('btnToggleSound');
  if (btnToggleSound) {
    btnToggleSound.addEventListener('click', () => {
      appState.soundEnabled = !appState.soundEnabled;
      btnToggleSound.classList.toggle('active', appState.soundEnabled);
      btnToggleSound.innerText = appState.soundEnabled ? 'ON' : 'OFF';
      saveState();
    });
  }

  const btnExportData = document.getElementById('btnExportData');
  if (btnExportData) {
    btnExportData.addEventListener('click', () => {
      const blob = new Blob([JSON.stringify(appState, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `건강노트_데이터_${new Date().toISOString().substring(0,10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  const btnResetAll = document.getElementById('btnResetAllData');
  if (btnResetAll) {
    btnResetAll.addEventListener('click', () => {
      if (confirm('모든 기록 데이터를 초기화하시겠습니까? (되돌릴 수 없습니다)')) {
        localStorage.removeItem(STORAGE_KEY);
        location.reload();
      }
    });
  }

  // Refresh Tip
  const btnRefreshTip = document.getElementById('btnRefreshTip');
  if (btnRefreshTip) {
    btnRefreshTip.addEventListener('click', () => {
      const rand = HEALTH_TIPS[Math.floor(Math.random() * HEALTH_TIPS.length)];
      document.getElementById('dailyTipTitle').innerText = rand.title;
      document.getElementById('dailyTipBody').innerText = rand.body;
    });
  }

  // Clear timeline history
  const btnClearHistory = document.getElementById('btnClearHistory');
  if (btnClearHistory) {
    btnClearHistory.addEventListener('click', () => {
      if (confirm('활동 타임라인 기록을 비우시겠습니까?')) {
        appState.historyLogs = [];
        saveState();
        renderTimeline();
      }
    });
  }
}

// ==========================================
// 10. App Initialization
// ==========================================
function refreshIcons() {
  try {
    if (window.lucide) window.lucide.createIcons();
  } catch (error) {
    console.warn('Icon rendering failed; controls remain available.', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadState();

  // Date Header
  const dateEl = document.getElementById('currentDateDisplay');
  if (dateEl) {
    const d = new Date();
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    dateEl.innerText = `${d.getMonth() + 1}월 ${d.getDate()}일 (${days[d.getDay()]})`;
  }

  // Wire controls before optional panels render: a panel failure must not
  // prevent water buttons, navigation, or settings from receiving clicks.
  setupEventListeners();
  [renderHomeDashboard, renderRoutinesTab, initCalculators,
    renderQuiz, renderEncyclopedia, renderTimeline].forEach(initialize => {
    try {
      initialize();
    } catch (error) {
      console.error(`Panel initialization failed: ${initialize.name}`, error);
    }
  });

  refreshIcons();
});

// Android Back Button Handler
window.handleAndroidBack = function() {
  // 1. 바텀시트 계산기 모달 열려있으면 닫기
  const calcBackdrop = document.getElementById('calcModalBackdrop');
  if (calcBackdrop && calcBackdrop.classList.contains('open')) {
    calcBackdrop.classList.remove('open');
    document.body.style.overflow = '';
    return true;
  }

  // 2. 체중 기록 모달 열려있으면 닫기
  const modalWeight = document.getElementById('modalWeight');
  if (modalWeight && modalWeight.classList.contains('active')) {
    modalWeight.classList.remove('active');
    document.body.style.overflow = '';
    return true;
  }

  // 3. 루틴 추가 모달 열려있으면 닫기
  const modalAddRoutine = document.getElementById('modalAddRoutine');
  if (modalAddRoutine && modalAddRoutine.classList.contains('active')) {
    modalAddRoutine.classList.remove('active');
    document.body.style.overflow = '';
    return true;
  }

  // 4. 설정 모달 열려있으면 닫기
  const modalSettings = document.getElementById('modalSettings');
  if (modalSettings && modalSettings.classList.contains('active')) {
    modalSettings.classList.remove('active');
    document.body.style.overflow = '';
    return true;
  }

  // 5. 홈 탭(tabHome)이 아닌 다른 탭에 있으면 홈 탭으로 복귀
  const homePanel = document.getElementById('tabHome');
  if (homePanel && !homePanel.classList.contains('active')) {
    const homeNav = document.querySelector('.bottom-nav-bar .nav-item[data-tab="tabHome"]');
    if (homeNav) {
      homeNav.click();
      return true;
    }
  }

  // 홈 탭이고 열린 모달이 없으면 네이티브 뒤로가기(종료 확인 토스트 -> 2번째 클릭 시 종료)로 넘김
  return false;
};

if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App) {
  window.Capacitor.Plugins.App.addListener('backButton', () => {
    window.handleAndroidBack();
  });
}
