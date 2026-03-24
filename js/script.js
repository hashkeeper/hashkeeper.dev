// viewport variables & updating their values
function setViewportVariables() {
  document.documentElement.style.setProperty('--vp-width', `${window.innerWidth}px`);
  document.documentElement.style.setProperty('--vp-height', `${window.innerHeight}px`);
}

window.addEventListener('load', setViewportVariables);
window.addEventListener('resize', setViewportVariables);
window.addEventListener('orientationchange', setViewportVariables);

// footer copyright date
const coprightEle = document.documentElement.querySelector('#footerCopyright');
const date = new Date();
const getYear = date.getFullYear();
coprightEle.innerText = `© 2023 - ${getYear} Hashkeeper ™`