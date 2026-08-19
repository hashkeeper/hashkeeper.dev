import { svgImporter } from "./svgImporter.js";
import { ThemeManager } from "./themeManager.js";
import { ScrollManager } from "./scrollManager.js";
import { AnimationManager } from "./animationManager.js";
import { EventManager } from "./clickManager.js";
import { StackMenuManager } from "./stackMenuManager.js";

class Core {
    constructor () {
        this.elementObj = {
            "root": document.documentElement,
            "body": document.body,
            "root": document.root
        }

        this.#init();
    }

    async #init () {
        await this.#setDate();
        await this.#setVars();
        await svgImporter();
        await this.#themeSetup();
        await this.#animationSetup();
    }

    #setDate () {
        this.date = new Date();
        this.elementObj.root.querySelector('#footerCopyright').innerText = `© 2023 - ${this.date.getFullYear()} Hashkeeper ™`
    }

    #setVars () {
        function setViewportVariables() {
            document.documentElement.style.setProperty('--vp-width', `${window.innerWidth}px`);
            document.documentElement.style.setProperty('--vp-height', `${window.innerHeight}px`);
        }

        window.addEventListener('load', setViewportVariables);
        window.addEventListener('resize', setViewportVariables);
        window.addEventListener('orientationchange', setViewportVariables);
    }

    #themeSetup () {
        this.themeMan = new ThemeManager(this.elementObj, this.date);
    }

    #animationSetup () {
        this.aniMan = new AnimationManager();

        document.querySelectorAll(".stream").forEach(cur => {
            const randSpeed = parseFloat(Math.random() * .5) + .5;
            this.aniMan.infiniteScroll(cur, 'up', randSpeed);
        });
        this.aniMan.infiniteScroll(document.querySelector("#affirmations"), 'top', 1.5, true);
        this.aniMan.infiniteScroll(document.querySelector("#diffBottom"), 'left', 2, true);
        this.aniMan.infiniteScroll(document.querySelector("#examplesScroll"), 'right', .5, true);
    }
}