// Theme Picker
const root = document.documentElement;
const contrArr = document.querySelectorAll('.contrTheme');
const themeArr = document.querySelectorAll('.monthTheme');
const elArr = [...contrArr, ...themeArr];
const refreshTheme = document.querySelector('#refreshTheme');

const monthsArr = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const curMonth = monthsArr[date.getMonth()];
let contrChecked = localStorage.getItem("contrSet");
let monthChecked = localStorage.getItem("monthSet");

function changeTheme() {
  monthChecked = document.querySelector('input[name="theme"]:checked').value;
  localStorage.setItem("monthSet", monthChecked);
  contrChecked = document.querySelector('input[name="contr"]:checked').value;
  localStorage.setItem("contrSet", contrChecked);
  root.setAttribute('id', `${monthChecked}${contrChecked}`);

  // force color / fill updates
  document.body.style.transform = 'scale(1)';
  requestAnimationFrame(() => {
    document.body.style.transform = '';
  });
}

function themeByDate() {
  document.querySelector(`.monthTheme > input[value="${curMonth}"]`).checked = true;
  monthChecked = document.querySelector('input[name="theme"]:checked').value;
  localStorage.setItem("monthSet", monthChecked);
  document.querySelector(`.contrTheme > input#lightTheme`).checked = true;
  contrChecked = document.querySelector('input[name="contr"]:checked').value;
  localStorage.setItem("contrSet", contrChecked);
  root.setAttribute('id', `${monthChecked}${contrChecked}`);
}

function themeCheck() {
  if(monthChecked || contrChecked) {
    if(contrChecked && monthChecked !== curMonth) {
      document.querySelector(`.monthTheme > input[value="${monthChecked}"]`).checked = true;
      monthChecked = document.querySelector('input[name="theme"]:checked').value;
      document.querySelector(`.contrTheme > input[value="${contrChecked}"]`).checked = true;
      contrChecked = document.querySelector('input[name="contr"]:checked').value;
    }else {
      document.querySelector(`.monthTheme > input[value="${curMonth}"]`).checked = true;
      monthChecked = document.querySelector('input[name="theme"]:checked').value;
      document.querySelector(`.contrTheme > input[value="${contrChecked}"]`).checked = true;
      contrChecked = document.querySelector('input[name="contr"]:checked').value;
    }
  }else if(!monthChecked && !contrChecked) {
    themeByDate();
  }
}

themeCheck();
root.setAttribute('id', `${monthChecked}${contrChecked}`);
refreshTheme.addEventListener("click", themeByDate);
elArr.forEach(curEl => curEl.addEventListener("change", changeTheme));