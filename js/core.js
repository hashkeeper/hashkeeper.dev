import { svgImporter } from "./svgImporter.js";
import { ThemeManager } from "./themeManager.js";
import { ScrollManager } from "./scrollManager.js";
import { AnimationManager } from "./animationManager.js";
import { ClickManager } from "./clickManager.js";

class Core {
  constructor() {
    this.nodeObj = {
      "root": document.documentElement,
      "window": window,
      "body": document.body,
      "head": document.head,
      "nav": document.querySelector("nav")
    };

    this.date = new Date();

    this.scrollMan = new ScrollManager(this.nodeObj);
    this.themeMan = new ThemeManager(this.nodeObj, this.date);
    this.aniMan = new AnimationManager(this.nodeObj);
    this.clickMan = new ClickManager(this.nodeObj);

    this.init();
  }

  async init() {
    await svgImporter();
    await this.#setVars();
    this.nodeObj.root.querySelector("#footerCopyright").innerText =
      `© 2023 - ${this.date.getFullYear()} Hashkeeper LLC™`;

    await this.#scrollSetup();
    await this.#themeSetup();
    await this.#animationSetup();
    await this.#clickSetup();
  }

  #setVars() {
    function setViewportVariables() {
      document.documentElement.style.setProperty(
        "--vp-width",
        `${window.innerWidth}px`,
      );
      document.documentElement.style.setProperty(
        "--vp-height",
        `${window.innerHeight}px`,
      );
    }

    window.addEventListener("load", setViewportVariables);
    window.addEventListener("resize", setViewportVariables);
    window.addEventListener("orientationchange", setViewportVariables);
  }

  #scrollSetup() {}

  #themeSetup() {}

  #animationSetup() {
    document.querySelectorAll(".stream").forEach((cur) => {
      const randSpeed = parseFloat(Math.random() * 0.5) + 0.5;
      this.aniMan.infiniteScroll(cur, "up", randSpeed);
    });
    this.aniMan.infiniteScroll(
      document.querySelector("#affirmations"),
      "top",
      1.5,
      true,
    );
    this.aniMan.infiniteScroll(
      document.querySelector("#diffBottom"),
      "left",
      2,
      true,
    );
    this.aniMan.infiniteScroll(
      document.querySelector("#examplesScroll"),
      "right",
      0.5,
      true,
    );
  }

  #clickSetup() {}
}

const coreInst = new Core();
