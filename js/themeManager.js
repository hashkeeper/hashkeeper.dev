export class ThemeManager {
  constructor (nodeObj) {
    this.nodeObj = nodeObj;

    this.themePreference = this.nodeObj.window.matchMedia('(prefers-color-scheme: dark)') ? "dark" : "light";

    this.setTheme = this.setTheme.bind(this);
    this.themePicker = this.nodeObj.root.querySelector('#themePicker');
    this.themePicker.addEventListener('click', this.setTheme);

    this.#init();
  }

  #init () {
    if(localStorage.getItem("theme")) {
      const curTheme = localStorage.getItem("theme");
      this.nodeObj.body.setAttribute('data-theme', curTheme);
      this.setIcon(curTheme);
    } else {
      this.nodeObj.body.setAttribute('data-theme', this.themePreference);
      localStorage.setItem("theme", this.themePreference);
    }
  }

  setIcon (theme) {
    const svgUrl = (theme == "dark")? "/assets/icons/moon.svg" : "/assets/icons/sun.svg";
    fetch(svgUrl)
      .then(response => response.text())
      .then(svgText => {
        this.themePicker.innerHTML = svgText;
      })
  }

  setTheme () {
    const curTheme = (this.nodeObj.body.getAttribute('data-theme') == "dark")? "light" : "dark";
    this.nodeObj.body.setAttribute('data-theme', curTheme);
    localStorage.setItem("theme", curTheme);
    this.setIcon(curTheme);
  }
}