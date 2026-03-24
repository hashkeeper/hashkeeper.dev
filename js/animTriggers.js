// Intersection Observer API setup
document.addEventListener("DOMContentLoaded",
  function() {
    // DOM
    const body = document.body;
    // Menus and subelements (tabs)
    const navEl = document.querySelector('nav');
    const navTab = document.querySelector('#navTab > div');
    const themeEl = document.querySelector('#themePicker');
    const themeTab = document.querySelector('#themeTab > div');
    // Menu element array
    const menuArr = [navEl, themeEl];
    // Header elements
    const bufferArr = document.querySelectorAll(".buffeR");
    const header = document.querySelector('header');
    const headerBuffer = document.querySelector('#bufferHeader');
    // Initial Splash Screen
    const hkSplash = document.querySelector('#hkSplash');
    // FAQ Buttons
    const faqDropdownArr = document.querySelectorAll(".faqDropdown");

    // Click bools
    let navBool = true;
    let themeBool = true;
    // Click Event Listeners 
    navTab.addEventListener('click', function () {
      navEl.style.animation = (navBool)? `1s ease-out forwards navAppear` : `1s ease-out forwards navDisappear`;
      navTab.style.animation = (navBool)? `1s ease-out forwards navTabFlip` : `1s ease-out forwards navTabRight`;
      navBool = (navBool)? false : true;
    });

    themeTab.addEventListener('click', function () {
      themeEl.style.animation = (themeBool)? `1s ease-out forwards themeAppear` : `1s ease-out forwards themeDisappear`;
      themeTab.style.animation = (themeBool)? `1s ease-out forwards themeTabRight` : `1s ease-out forwards themeTabFlip`;
      themeBool = (themeBool)? false : true;
    });

    faqDropdownArr.forEach(cur => {
      const childrenArr = cur.children;
      const arrowEl = childrenArr[0].children[1];
      const answerEl = childrenArr[1];
      childrenArr[0].addEventListener('click', () => {
        let posBool = (window.getComputedStyle(arrowEl).transform === 'matrix(-1, 0, 0, -1, 0, 0)')? true : false;
        if(posBool) {
          arrowEl.style.transform = 'rotate(0deg)';
          answerEl.style.maxHeight = '7rem';
        } else {
          arrowEl.style.transform = 'rotate(180deg)';
          answerEl.style.maxHeight = '0px';
        }
      });
    });

    // Header Observer
    const headerObserver = new IntersectionObserver((entries) => {
      if(entries.length === 1) {
        entries.forEach(entry => {
          const entryId = entry.target.id;
          
          if(entryId === 'onE') {
            if(entry.intersectionRatio == 0) {
              hkSplash.style.maskPosition = `0% -100vh`;
            }else {
              hkSplash.style.maskPosition = `0% 0%`;
            }
          }

          if(entryId === 'twO') {
            if(entry.intersectionRatio > 0) {
              setTimeout(() => body.style.overflow = "scroll", 2000);
              header.style.top = `-100%`;
              header.style.opacity = `0`;
              body.scrollTo({
                top: 10,
                behavior: "smooth"
              });
              setTimeout(() => {
                menuArr.forEach(cur => cur.style.opacity = `1`);
              }, 1000);
            }
          }
        });
      }
    }, {
      root: header
    });
  
    bufferArr.forEach(cur => headerObserver.observe(cur));

    // Body Observer
    const bodyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const entryEl = entry.target.localName;
        if(entryEl === "div") {
          if(entry.isIntersecting) {
            body.style.overflow = "hidden";
            header.scrollTo({
              top: 0,
              behavior: "smooth"
            });
            header.style.top = `0`;
            header.style.opacity = `1`;
            menuArr.forEach(cur => cur.style.opacity = `0`);
          } else {
            body.style.overflow = "scroll";
            header.scrollTo({
              top: 0,
              behavior: "smooth"
            });
            header.style.top = `-100%`;
            header.style.opacity = `0`;
            menuArr.forEach(cur => cur.style.opacity = `1`);
          }
        }
      })
    }, {
      root: null,
      rootMargin: "0px",
      threshold: 0
    });

    setTimeout(() => {
      bodyObserver.observe(headerBuffer);
    }, 1500)

    window.addEventListener('hashchange', () => {
      bodyObserver.unobserve(headerBuffer);
      bodyObserver.observe(headerBuffer);
    });
  }
);