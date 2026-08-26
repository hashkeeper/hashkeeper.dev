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

    this.soundbite = document.querySelector("#soundbiteCont");

    this.isInBody = false;
    this.isTransitioning = false;

    this.#init();
  }

  #init() {
    if (this.nodeObj.window.location.hash) {
      this.isInBody = true;
      this.bodyObserver.observe(this.bufferHeader);
    } else {
      this.headerObserver.observe(this.bufferOne);
      this.headerObserver.observe(this.bufferTwo);
    }

    this.nodeObj.window.addEventListener('hashchange', () => {
      this.isInBody = true;
      this.bodyObserver.disconnect();
      this.bodyObserver.observe(this.bufferHeader);
    });
  }

  headerObserver = new IntersectionObserver((entries) => { entries.forEach((entry) => {
      if (entry.target === this.bufferOne) {
        this.hkSplash.style.maskPosition = entry.isIntersecting ? "0% 0%" : "0% -100vh";
      } else if (entry.target === this.bufferTwo && entry.isIntersecting) {
        if (!this.isInBody && !this.isTransitioning) { 
          this.isTransitioning = true;
          this.headerObserver.unobserve(this.bufferOne);
          this.headerObserver.unobserve(this.bufferTwo);
          setTimeout(() => {       
            this.header.scrollTo({
              top: this.bufferOne,
              behavior: 'instant'
            });
            this.transitionToBody();
          }, 50);
        }
      }
    })},
    {
      root: this.header,
      rootMargin: "0px",
      threshold: 0
    }
  )

  bodyObserver = new IntersectionObserver((entries) => { entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (this.isInBody && !this.isTransitioning) {
          this.isTransitioning = true;
          this.bodyObserver.unobserve(this.bufferHeader);
          setTimeout(() => {
            this.transitionToHeader();
          }, 50);
        }
      } else {
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

  transitionToHeader () {
    this.nodeObj.body.style.overflow = "hidden";
    this.nodeObj.nav.style.opacity = "0";
    this.hkHeader.style.opacity = "1";
    this.header.style.display = "";

    setTimeout(() => {
      this.isInBody = false;
      this.isTransitioning = false;
      this.headerObserver.observe(this.bufferOne);
      this.headerObserver.observe(this.bufferTwo);
    }, 300);
  };

  transitionToBody () {
    this.nodeObj.body.style.overflow = "scroll";
    setTimeout(() => {
      this.nodeObj.window.scrollTo({
        top: this.soundbite.offsetTop - 100,
        behavior: 'instant'
      });
      setTimeout(() => {
        this.nodeObj.body.style.overflow = "hidden";
      }, 50);
    }, 50);

    this.hkHeader.style.opacity = "0";
    this.header.style.display = "none";

    setTimeout(() => {
      this.nodeObj.body.style.overflow = "scroll";
      this.isInBody = true;
      this.isTransitioning = false;
      this.bodyObserver.observe(this.bufferHeader);
    }, 300);
  }
}
