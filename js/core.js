import { ThemeManager } from "./themeManager.js";

class Core {
  constructor () {
    this.nodeObj = {
      "root": document.documentElement,
      "window": window,
      "body": document.body,
      "head": document.head,
      "nav": document.querySelector("nav")
    };

    this.curDate = new Date();

    this.themeMan = new ThemeManager(this.nodeObj);
    
    this.#init();
  }

  #init () {
    this.nodeObj.root.querySelector("#footerCopyright").innerText = `© 2023 - ${this.curDate.getFullYear()} Hashkeeper LLC™`;
  }
}

const coreInst = new Core();