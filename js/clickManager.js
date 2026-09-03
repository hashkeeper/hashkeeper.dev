export class ClickManager {
  constructor (nodeObj) {
    this.nodeObj = nodeObj;

    // Menus and subelements (tabs)
    this.mapEl = this.nodeObj.root.querySelector("#mapCont");
    this.mapBody = this.nodeObj.root.querySelector("#mapList");
    this.mapTab = this.nodeObj.root.querySelector("#mapTab");
    this.mapSvg = this.nodeObj.root.querySelector("#mapTab > div");
    this.mapBool = false;

    this.themeEl = this.nodeObj.root.querySelector("#themeCont");
    this.themeBody = this.nodeObj.root.querySelector("#themePicker");
    this.themeTab = this.nodeObj.root.querySelector("#themeTab");
    this.themeSvg = this.nodeObj.root.querySelector("#themeTab > div");
    this.themeBool = false;

    // FAQ Buttons
    this.faqDropdownArr = this.nodeObj.root.querySelectorAll(".faqDropdown");

    this.#init();
  }

  #init() {
    this.mapTab.addEventListener("click", () => {
      const bodySize = this.mapBody.offsetHeight;
      this.mapEl.style.transform = this.mapBool ? `translateY(5px)` : `translateY(-${bodySize + 3}px)`;
      this.mapSvg.style.animation = this.mapBool
        ? `1s ease-out forwards mapTabFlip`
        : `1s ease-out forwards mapTabRight`;
      this.mapBool = this.mapBool ? false : true;
    });

    this.mapTab.click();

    this.themeTab.addEventListener("click", () => {
      const bodySize = this.themeBody.offsetWidth;
      this.themeEl.style.transform = this.themeBool ? `translateX(5px)` : `translateX(-${bodySize + 3}px)`;
      this.themeSvg.style.animation = this.themeBool
        ? `1s ease-out forwards themeTabRight`
        : `1s ease-out forwards themeTabFlip`;
      this.themeBool = this.themeBool ? false : true;
    });

    this.themeTab.click();

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
