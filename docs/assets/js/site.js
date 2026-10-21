/**
 * Main site shared script.
 * - Fills the current year in the footer.
 * - Tracks and displays the TOP page view count with GoatCounter.
 */
document.querySelectorAll('[data-current-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});

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
