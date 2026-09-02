export class ClickManager {
  constructor (nodeObj) {
    this.nodeObj = nodeObj;

    // Menus and subelements (tabs)
    this.mapEl = this.nodeObj.root.querySelector("#mapCont");
    this.mapTab = this.nodeObj.root.querySelector("#mapTab > div");
    this.mapBool = true;

    this.themeEl = this.nodeObj.root.querySelector("#themePicker");
    this.themeTab = this.nodeObj.root.querySelector("#themeTab > div");
    this.themeBool = true;

    // FAQ Buttons
    this.faqDropdownArr = this.nodeObj.root.querySelectorAll(".faqDropdown");

    this.#init();
  }

  #init() {
    this.mapTab.addEventListener("click", () => {
      this.mapEl.style.animation = this.mapBool
        ? `1s ease-out forwards mapAppear`
        : `1s ease-out forwards mapDisappear`;
      this.mapTab.style.animation = this.mapBool
        ? `1s ease-out forwards mapTabFlip`
        : `1s ease-out forwards mapTabRight`;
      this.mapBool = this.mapBool ? false : true;
    });

    this.themeTab.addEventListener("click", () => {
      this.themeEl.style.animation = this.themeBool
        ? `1s ease-out forwards themeAppear`
        : `1s ease-out forwards themeDisappear`;
      this.themeTab.style.animation = this.themeBool
        ? `1s ease-out forwards themeTabRight`
        : `1s ease-out forwards themeTabFlip`;
      this.themeBool = this.themeBool ? false : true;
    });

    this.faqDropdownArr.forEach((cur) => {
      const childrenArr = cur.children;
      const arrowEl = childrenArr[0].children[1];
      const answerEl = childrenArr[1];
      childrenArr[0].addEventListener("click", () => {
        let posBool =
         window.getComputedStyle(arrowEl).transform ===
          "matrix(-1, 0, 0, -1, 0, 0)"
            ? true
            : false;
        if (posBool) {
          arrowEl.style.transform = "rotate(0deg)";
          answerEl.style.maxHeight = "7rem";
        } else {
          arrowEl.style.transform = "rotate(180deg)";
          answerEl.style.maxHeight = "0px";
        }
      });
    });
  }
}
