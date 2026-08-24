export class ScrollManager {
  constructor(nodeObj) {
    this.nodeObj = nodeObj;

    // Header elements
    // Initial Splash Screen
    this.hkSplash = document.querySelector("#hkSplash");
    this.hkHeader = document.querySelector("#hkHeader");
    // Scroll Trigger Elements
    this.header = document.querySelector("header");
    this.bufferOne = document.querySelector("#bufferOne");
    this.bufferTwo = document.querySelector("#bufferTwo");
    this.headerBuffer = document.querySelector("#bufferHeader");

    this.soundbite = document.querySelector("#soundbite");

    this.#init();
  }

  #init() {
    this.headerObserver.observe(this.bufferOne);
    this.headerObserver.observe(this.bufferTwo);
    this.bodyObserver.observe(this.header);

    this.nodeObj.body.scroll(0, 15);
  }

  headerObserver = new IntersectionObserver(
    async (entries) => { entries.forEach((entry) => {
      console.log(entry);
      if (entry.target === this.bufferOne) {
        if (entry.isIntersecting) {
          this.hkSplash.style.maskPosition = "0% 0%";
        } else {
          this.hkSplash.style.maskPosition = "0% -100vh";
        }
      } else if (entry.target === this.bufferTwo) {
        if (entry.isIntersecting) {
          this.hkHeader.style.opacity = "0";
          this.header.style.transform = "translateY(-100%)";
          this.nodeObj.body.style.overflow = "scroll";
          this.soundbite.focus();
          this.nodeObj.body.style.overflow = "hidden";
          setTimeout(() => {
            this.nodeObj.body.style.overflow = "scroll";
          }, 2000);
          this.headerObserver.disconnect();
        } else {
          this.nodeObj.body.style.overflow = "hidden";
        }
      }
    })},
    {
      root: this.header,
      rootMargin: "0px",
      threshold: 0
    }
  )

  bodyObserver = new IntersectionObserver(
    (entries) => { entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.bufferOne.focus();
        this.headerObserver.observe(this.bufferOne);
        this.headerObserver.observe(this.bufferTwo);
        // this.hkSplash.style.maskPosition = "0% 0%";
        // this.hkHeader.style.opacity = "1";
        // this.nodeObj.body.style.overflow = "hidden";
        // this.header.style.transform = "translateY(0%)";
        // this.nodeObj.nav.style.opacity = "0";
      } else if (!entry.isIntersecting) {
        this.header.style.transform = "translateY(-100%)";
        setTimeout(() => {
          this.nodeObj.nav.style.opacity = "1";
        }, 1000);
      }
    })},
    {
      root: null,
      rootMargin: "0px",
      threshold: 0
    }
  )
}
