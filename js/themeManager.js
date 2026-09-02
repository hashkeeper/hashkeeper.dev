export class ThemeManager {
  constructor (nodeObj, date) {
    this.nodeObj = nodeObj;
    this.date = date;

    this.refreshTheme = this.nodeObj.root.querySelector('#refreshTheme');

    this.contrArr = this.nodeObj.root.querySelectorAll('.contrTheme');
    this.themeArr = this.nodeObj.root.querySelectorAll('.monthTheme');
    this.elArr = [...this.contrArr, ...this.themeArr];

    this.monthsArr = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    this.curMonth = this.monthsArr[this.date.getMonth()];

    this.contrChecked = localStorage.getItem("contrSet");
    this.monthChecked = localStorage.getItem("monthSet");

    this.changeTheme = this.changeTheme.bind(this);
    this.themeByDate = this.themeByDate.bind(this);

    this.#init();
  }

  #init () {
    this.themeCheck();
    this.nodeObj.root.setAttribute('id', `${this.monthChecked}${this.contrChecked}`);
    this.refreshTheme.addEventListener("click", this.themeByDate);
    this.elArr.forEach(cur => cur.addEventListener("change", this.changeTheme));
    this.#forceReset();
  }

  #forceReset () {    
    // force color / fill updates
    this.nodeObj.body.style.transform = 'scale(1)';
    requestAnimationFrame(() => {
      this.nodeObj.body.style.transform = '';
    });
  }

  changeTheme () {
    this.monthChecked = this.nodeObj.root.querySelector('input[name="theme"]:checked').value;
    localStorage.setItem("monthSet", this.monthChecked);
    this.contrChecked = this.nodeObj.root.querySelector('input[name="contr"]:checked').value;
    localStorage.setItem("contrSet", this.contrChecked);
    this.nodeObj.root.setAttribute('id', `${this.monthChecked}${this.contrChecked}`);
    this.#forceReset();
  }

  themeByDate () {
    this.nodeObj.root.querySelector(`.monthTheme > input[value="${this.curMonth}"]`).checked = true;
    this.monthChecked = this.nodeObj.root.querySelector('input[name="theme"]:checked').value;
    localStorage.setItem("monthSet", this.monthChecked);
    this.nodeObj.root.querySelector(`.contrTheme > input#lightTheme`).checked = true;
    this.contrChecked = this.nodeObj.root.querySelector('input[name="contr"]:checked').value;
    localStorage.setItem("contrSet", this.contrChecked);
    this.nodeObj.root.setAttribute('id', `${this.monthChecked}${this.contrChecked}`);
  }

  themeCheck () {
    if (this.monthChecked || this.contrChecked) {
      if (this.contrChecked && this.monthChecked !== this.curMonth) {
        this.nodeObj.root.querySelector(`.monthTheme > input[value="${this.monthChecked}"]`).checked = true;
        this.monthChecked = this.nodeObj.root.querySelector('input[name="theme"]:checked').value;
        this.nodeObj.root.querySelector(`.contrTheme > input[value="${this.contrChecked}"]`).checked = true;
        this.contrChecked = this.nodeObj.root.querySelector('input[name="contr"]:checked').value;
      } else {
        this.nodeObj.root.querySelector(`.monthTheme > input[value="${this.curMonth}"]`).checked = true;
        this.monthChecked = this.nodeObj.root.querySelector('input[name="theme"]:checked').value;
        this.nodeObj.root.querySelector(`.contrTheme > input[value="${this.contrChecked}"]`).checked = true;
        this.contrChecked = this.nodeObj.root.querySelector('input[name="contr"]:checked').value;
      }
    } else if (!this.monthChecked && !this.contrChecked) {
      this.themeByDate();
    }
    this.#forceReset();
  }
}


// // Theme Picker
// const root = document.documentElement;
// const contrArr = document.querySelectorAll('.contrTheme');
// const themeArr = document.querySelectorAll('.monthTheme');
// const elArr = [...contrArr, ...themeArr];
// const refreshTheme = document.querySelector('#refreshTheme');

// const monthsArr = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
// const curMonth = monthsArr[date.getMonth()];
// let contrChecked = localStorage.getItem("contrSet");
// let monthChecked = localStorage.getItem("monthSet");

// function changeTheme() {
//   monthChecked = document.querySelector('input[name="theme"]:checked').value;
//   localStorage.setItem("monthSet", monthChecked);
//   contrChecked = document.querySelector('input[name="contr"]:checked').value;
//   localStorage.setItem("contrSet", contrChecked);
//   root.setAttribute('id', `${monthChecked}${contrChecked}`);

//   // force color / fill updates
//   document.body.style.transform = 'scale(1)';
//   requestAnimationFrame(() => {
//     document.body.style.transform = '';
//   });
// }

// function themeByDate() {
//   document.querySelector(`.monthTheme > input[value="${curMonth}"]`).checked = true;
//   monthChecked = document.querySelector('input[name="theme"]:checked').value;
//   localStorage.setItem("monthSet", monthChecked);
//   document.querySelector(`.contrTheme > input#lightTheme`).checked = true;
//   contrChecked = document.querySelector('input[name="contr"]:checked').value;
//   localStorage.setItem("contrSet", contrChecked);
//   root.setAttribute('id', `${monthChecked}${contrChecked}`);
// }

// function themeCheck() {
//   if(monthChecked || contrChecked) {
//     if(contrChecked && monthChecked !== curMonth) {
//       document.querySelector(`.monthTheme > input[value="${monthChecked}"]`).checked = true;
//       monthChecked = document.querySelector('input[name="theme"]:checked').value;
//       document.querySelector(`.contrTheme > input[value="${contrChecked}"]`).checked = true;
//       contrChecked = document.querySelector('input[name="contr"]:checked').value;
//     }else {
//       document.querySelector(`.monthTheme > input[value="${curMonth}"]`).checked = true;
//       monthChecked = document.querySelector('input[name="theme"]:checked').value;
//       document.querySelector(`.contrTheme > input[value="${contrChecked}"]`).checked = true;
//       contrChecked = document.querySelector('input[name="contr"]:checked').value;
//     }
//   }else if(!monthChecked && !contrChecked) {
//     themeByDate();
//   }
// }

// themeCheck();
// root.setAttribute('id', `${monthChecked}${contrChecked}`);
// refreshTheme.addEventListener("click", themeByDate);
// elArr.forEach(curEl => curEl.addEventListener("change", changeTheme));