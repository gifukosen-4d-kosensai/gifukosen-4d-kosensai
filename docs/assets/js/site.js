/**
 * Main site shared script.
 * - Fills the current year in the footer.
 * - Tracks and displays the TOP page view count with GoatCounter.
 */
document.querySelectorAll('[data-current-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const secretKeyboardCommand = [
  'ArrowUp',
  'ArrowRight',
  'ArrowDown',
  'ArrowLeft',
  '4',
  'd',
];
let secretKeyboardProgress = 0;

document.addEventListener('keydown', (event) => {
  const target = event.target;
  if (target instanceof HTMLElement && (
    target.isContentEditable
    || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
  )) {
    secretKeyboardProgress = 0;
    return;
  }

  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  if (key === secretKeyboardCommand[secretKeyboardProgress]) {
    secretKeyboardProgress += 1;
    if (secretKeyboardProgress === secretKeyboardCommand.length) {
      window.location.href = './kakusi.html';
    }
    return;
  }

  secretKeyboardProgress = key === secretKeyboardCommand[0] ? 1 : 0;
});

const nagataBot = document.querySelector('.nagata-bot');

if (nagataBot) {
  const botButton = nagataBot.querySelector('.nagata-bot__button');
  const botMessage = nagataBot.querySelector('.nagata-bot__message');
  const botLines = [
    'こんにちは！永田BOTだよ。専門展を楽しんでいってね！',
    '気になる発表を見つけたら、ぜひ詳しく見てね！',
  ];
  let botLineIndex = 0;
  let botTapCount = 0;

  botButton.addEventListener('click', () => {
    botTapCount += 1;
    if (botTapCount === 20) {
      botMessage.textContent = 'ぽこぽこちん';
      botMessage.hidden = false;
      botTapCount = 0;
      return;
    }

    botMessage.textContent = botLines[botLineIndex];
    botMessage.hidden = false;
    botLineIndex = (botLineIndex + 1) % botLines.length;
  });
}

const siteViews = document.querySelector('#site-views-count');

if (siteViews) {
  const counterScript = document.createElement('script');
  counterScript.src = 'https://gc.zgo.at/count.js';
  counterScript.async = true;
  counterScript.dataset.goatcounter = 'https://4ddenshi.goatcounter.com/count';
  counterScript.addEventListener('load', () => {
    if (!window.goatcounter || typeof window.goatcounter.get_data !== 'function') {
      siteViews.textContent = '取得できません';
      console.error('GoatCounter loaded without its page data.');
      return;
    }

    const pagePath = window.goatcounter.get_data()['p'];

    fetch(`https://4ddenshi.goatcounter.com/counter/${encodeURIComponent(pagePath)}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`GoatCounter returned HTTP ${response.status}.`);
        }
        return response.json();
      })
      .then((data) => {
        if (!data || typeof data.count !== 'string') {
          throw new Error('GoatCounter returned an invalid total view count.');
        }
        siteViews.textContent = data.count;
      })
      .catch((error) => {
        siteViews.textContent = '現在表示できません';
        console.error('Failed to retrieve the GoatCounter total view count.', error);
      });
  });
  counterScript.addEventListener('error', () => {
    siteViews.textContent = '取得できません';
    console.error('Failed to load GoatCounter.');
  });
  document.head.append(counterScript);
}
