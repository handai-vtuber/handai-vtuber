let slideInterval;

function switchTab(tabId) {
  // すべてのタブコンテンツを非表示にする
  const contents = document.querySelectorAll('.tab-content');
  contents.forEach(content => {
    content.classList.remove('active');
  });

  // すべてのボタンからinactiveクラスを削除
  const buttons = document.querySelectorAll('.tab-button');
  buttons.forEach(button => {
    button.classList.remove('inactive');
  });

  // すべてのafter-buttonを表示
  const afterButtons = document.querySelectorAll('.after-button');
  afterButtons.forEach(button => {
    button.classList.remove('hidden');
  });

  // 選択されたタブコンテンツを表示
  document.getElementById(tabId).classList.add('active');

  // 選択されていないボタンにinactiveクラスを追加
  if (tabId === 'landing') {
    document.getElementById('btn-activities').classList.add('inactive');
    document.getElementById('btn-how-to-join').classList.add('inactive');
    document.getElementById('after-btn-landing').classList.add('hidden');
    startSlideshow();
  } else if (tabId === 'activities') {
    document.getElementById('btn-landing').classList.add('inactive');
    document.getElementById('btn-how-to-join').classList.add('inactive');
    document.getElementById('after-btn-activities').classList.add('hidden');
    stopSlideshow();
  } else if (tabId === 'how-to-join') {
    document.getElementById('btn-landing').classList.add('inactive');
    document.getElementById('btn-activities').classList.add('inactive');
    document.getElementById('after-btn-how-to-join').classList.add('hidden');
    stopSlideshow();
  }
}

function startSlideshow() {
  stopSlideshow(); // 既存のインターバルをクリア
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');

  slideInterval = setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 7000);
}

function stopSlideshow() {
  if (slideInterval) {
    clearInterval(slideInterval);
  }
}

// ヘッダーの表示/非表示を制御
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop && scrollTop > 80) {
    // 下にスクロール中で、ヘッダーの高さより下にいる場合
    header.classList.add('hidden');
  } else {
    // 上にスクロール中
    header.classList.remove('hidden');
  }

  lastScrollTop = scrollTop;
});

// HTMLコンポーネントをロードする関数
async function loadComponent(elementId, filePath) {
  try {
    const response = await fetch(filePath);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
  } catch (error) {
    console.error(`Failed to load ${filePath}:`, error);
  }
}

// ページ読み込み時の初期設定
document.addEventListener('DOMContentLoaded', async function() {
  // 各コンポーネントをロード
  await Promise.all([
    loadComponent('landing', './landing.html'),
    loadComponent('activities', './activities.html'),
    loadComponent('how-to-join', './how-to-join.html')
  ]);

  switchTab('landing');
});
