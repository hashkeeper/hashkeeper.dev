export class ScrollManager {
  constructor(nodeObj) {
    this.nodeObj = nodeObj;

    // Splash Screen Elements
    // Initial Splash Screen
    this.hkSplash = document.querySelector("#hkSplash");
    this.hkHeader = document.querySelector("#hkHeader");
    this.soundbite = document.querySelector("#soundbite");
    // Scroll Trigger Elements
    this.header = document.querySelector("header");
    this.bufferOne = document.querySelector("#bufferOne");
    this.bufferTwo = document.querySelector("#bufferTwo");
    this.bufferHeader = document.querySelector("#bufferHeader");
    // Splash Screen Bools
    this.isInBody = false;
    this.isTransitioning = false;

    // Stack Menu Elements
    this.stackParent = document.querySelector("#stackCont");
    this.stackClusters = document.querySelectorAll("#stackDisplay > *");
    this.stackOptions = document.querySelector("#stackOptions");
    this.stackTriggers = document.querySelectorAll("#stackOptions > fieldset >  label > input");
    this.stackNodeMap = new Map();

    this.stackTriggers.forEach((cur, ind) => {
      this.stackNodeMap.set(cur, this.stackClusters[ind]);
    });

    this.velocity = 1;
    this.DAMPING = 0.8;
    this.MIN_DELTA = 0.2;

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

    this.stackTriggers.forEach((cur) => {
      this.stackObserver.observe(cur);
    });

    this.nodeObj.window.addEventListener("hashchange", () => {
      this.isInBody = true;
      this.bodyObserver.disconnect();
      this.bodyObserver.observe(this.bufferHeader);
    });

    this.header.addEventListener("wheel", (e) => {
      e.preventDefault();
      // int e.deltaY is divided by int representing control speed
      this.header.scrollTop += parseFloat(e.deltaY) / 2;
    });

    this.stackParent.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();

        this.velocity += e.deltaY * 0.65;

        if (Math.abs(this.velocity) > this.MIN_DELTA) {
          this.stackOptions.scrollLeft += this.velocity;
          this.velocity *= this.DAMPING;
        }
      },
      { passive: false },
    );
  }

  headerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.target === this.bufferOne) {
          this.hkSplash.style.maskPosition = entry.isIntersecting
            ? "0% 0%"
            : "0% -100vh";
        } else if (entry.target === this.bufferTwo && entry.isIntersecting) {
          if (!this.isInBody && !this.isTransitioning) {
            this.isTransitioning = true;
            this.headerObserver.unobserve(this.bufferOne);
            this.headerObserver.unobserve(this.bufferTwo);
            setTimeout(() => {
              this.header.scrollTo({
                top: this.bufferOne,
                behavior: "instant",
              });
              this.transitionToBody();
            }, 50);
          }
        }
      });
    },
    {
      root: this.header,
      rootMargin: "0px",
      threshold: 0,
    },
  );

  bodyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
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
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    },
  );

  stackObserver = new IntersectionObserver(
    (entries) => {
      console.log(entries);
      entries.forEach((entry) => {
        const curNode = this.stackNodeMap.get(entry.target);
        if (entry.isIntersecting) {
          curNode.style.transform = `translateY(0)`;
        } else {
          curNode.style.transform = `translateY(110%)`;
        }
      });
    },
    {
      root: this.stackOptions,
      rootMargin: '0px -45% 0px -45%',
      threshold: 0,
    },
  );

  transitionToHeader() {
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
  }

  transitionToBody() {
    this.nodeObj.body.style.overflow = "scroll";
    setTimeout(() => {
      this.nodeObj.window.scrollTo({
        top: this.soundbite.offsetTop,
        behavior: "instant",
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
