export class ClickManager {
  constructor() {
    // Menus and subelements (tabs)
    this.navEl = document.querySelector("nav");
    this.navTab = document.querySelector("#navTab > div");
    this.themeEl = document.querySelector("#themePicker");
    this.themeTab = document.querySelector("#themeTab > div");
    // Click bools
    this.navBool = true;
    this.themeBool = true;
    // FAQ Buttons
    this.faqDropdownArr = document.querySelectorAll(".faqDropdown");
  }

  #init() {
    // Click Event Listeners
    this.navTab.addEventListener("click", function () {
      this.navEl.style.animation = this.navBool
        ? `1s ease-out forwards navAppear`
        : `1s ease-out forwards navDisappear`;
      this.navTab.style.animation = this.navBool
        ? `1s ease-out forwards navTabFlip`
        : `1s ease-out forwards navTabRight`;
      this.navBool = this.navBool ? false : true;
    });

    this.themeTab.addEventListener("click", function () {
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
