const pairList = [
  'usdbrl (otc)', 'cadchf (otc)', 'usdars (otc)', 'usdinr (otc)',
  'usdpkr (otc)', 'usdbdt (otc)', 'usddzd (otc)', 'usdcop (otc)',
  'usdjpy (otc)', 'audjpy (otc)', 'eurusd (otc)', 'usdphp (jpy)'
];

const signalList = ['SELL', 'BUY', 'BUY', 'SELL', 'SELL', 'SELL', 'BUY'];

const loader = document.createElement('div');
loader.id = 'loader';
loader.style = 'display: flex; justify-content: center; align-items: center; padding: 5px;';
loader.innerHTML = '<div>PLEASE WAIT...</div>';
document.body.appendChild(loader);

function hideLoader() {
  loader.style.display = 'none';
}

function showLoader() {
  loader.style.display = 'flex';
  setTimeout(hideLoader, 2000); // 2 seconds
}

showLoader();

const pair__box = document.querySelector('#pair__box');
pairList.forEach(pair => {
  const opt = document.createElement('option');
  opt.value = pair;
  opt.innerText = pair.replace(/(?<=^.{3})/, '/').toUpperCase();
  pair__box.appendChild(opt);
});

$('select').selectator({ useSearch: false });

const signal = document.querySelector('#signal');
const result = document.querySelector('#result');
const remTime = document.querySelector('.rem__time');

function startTimer() {
  let seconds = 39;
  function tick() {
    remTime.innerHTML = `GET NEXT IN 0:${seconds < 10 ? '0' : ''}${seconds}`;
    if (seconds-- > 0) setTimeout(tick, 1000);
  }
  tick();
}

signal.onclick = () => {
  signal.disabled = true;
  remTime.style.visibility = 'hidden';

  const loaderClone = document.querySelector('#loader');
  loaderClone.style.display = 'inline';
  loaderClone.innerHTML = '<img src="./loader.gif" width="50" />';

  setTimeout(() => {
    const randSignal = signalList[Math.floor(Math.random() * signalList.length)];
    result.style = randSignal === 'BUY' ? 'color:lime;margin-top:1rem' : 'color:red;margin-top:1rem';
    result.innerText = randSignal;

    loaderClone.style.display = 'none';
    signal.disabled = false;
    remTime.style.visibility = 'visible';
    startTimer();
  }, 2000);
};
