const target = document.getElementById("mirror");
const currentImg = document.getElementById("current-img");
const reverseImg = document.getElementById("reverse-img");

const DEFAULT_RADIUS = 150;
const INTERVAL = 20;
const SLOW_STEP = 2;
const MIDDLE_STEP = 3;
const QIUCK_STEP = 4;

let timer;
let step = SLOW_STEP;
let radius = DEFAULT_RADIUS;
let x, y;

const setImgClip = () => {
  reverseImg.style = `
    clip-path: circle(${radius}px at ${x}px ${y}px)
  `;
};

const refreshBgImg = () => {
  const hour = new Date().getHours();
  if (hour >= 6 && hour <= 18) {
    currentImg.setAttribute("src", "./img/light.png");
    reverseImg.setAttribute("src", "./img/night.png");
    currentImg.style = `filter: brightness(${1.3 - 0.1 * Math.abs(12 - hour)})`;
  } else {
    currentImg.setAttribute("src", "./img/night.png");
    reverseImg.setAttribute("src", "./img/light.png");
    currentImg.style = `filter: brightness(${
      0.7 + 0.1 * Math.min(24 - hour, hour)
    })`;
  }
};

refreshBgImg();
setInterval(() => {
  refreshBgImg();
}, 1000 * 60 * 60);

document.body.onclick = (e) => {
  x = e.clientX;
  y = e.clientY;

  target.style = `
    left: ${x}px;
    top: ${y}px;
  `;

  setImgClip();
};

document.body.onmousedown = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
    return;
  }
  timer = setInterval(() => {
    if (radius > 250) step = QIUCK_STEP;
    else if (radius > 200) step = MIDDLE_STEP;
    radius += step;
    setImgClip();
  }, INTERVAL);
};

document.body.onmouseup = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }

  const timer2 = setInterval(() => {
    if (radius <= DEFAULT_RADIUS || timer) {
      clearInterval(timer2);
      return;
    }
    if (radius < 200) step = SLOW_STEP;
    else if (radius < 250) step = MIDDLE_STEP;
    radius -= step;
    setImgClip();
  }, INTERVAL);
};

document.body.onselectstart = () => {
  return false;
};
