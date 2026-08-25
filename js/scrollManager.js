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
    this.bufferHeader = document.querySelector("#bufferHeader");

    this.soundbite = document.querySelector("#soundbite");

    this.#init();
  }

  #init() {
    this.headerObserver.observe(this.bufferOne);
    this.headerObserver.observe(this.bufferTwo);
    this.bodyObserver.observe(this.bufferHeader);
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
          this.headerObserver.disconnect();

          this.nodeObj.body.style.overflow = "scroll";
          this.soundbite.focus({ preventScroll: true });
          this.nodeObj.body.style.overflow = "hidden";

          this.header.style.display = "none";
          this.hkHeader.style.opacity = "0";
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
      console.log(entry);
      if (entry.isIntersecting) {
        this.nodeObj.body.style.overflow = "hidden";
        this.header.style.display = "";
        this.header.scrollTo(0, 0);
        this.hkHeader.style.opacity = "1";

        this.headerObserver.observe(this.bufferOne);
        this.headerObserver.observe(this.bufferTwo);
      } else {
        this.headerObserver.disconnect();
        this.header.style.display = "none";
        this.hkSplash.style.maskPosition = "0% -100vh";
        this.hkHeader.style.opacity = "0";
        setTimeout(() => {
          this.nodeObj.nav.style.opacity = "1";
          this.nodeObj.body.style.overflow = "scroll";
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
