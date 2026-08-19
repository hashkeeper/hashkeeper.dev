document.addEventListener('DOMContentLoaded', function() {
// Splash Screen Variables 
    const header = document.querySelector("header");
// Stack Menu Variables
    const stackParent = document.querySelector('#stackCont');
    const stackParChildren = document.querySelectorAll('#stackDisplay > *');
    const stackOptions = document.querySelector('#stackOptions');
    const stackFieldset = document.querySelector('#stackOptions > fieldset');
    const stackOptChildren = document.querySelectorAll('#stackOptions > * > *');

// Splash Screen Scroll Controls 
    header.addEventListener('wheel', (e) => {
      e.preventDefault();
      // int e.deltaY is divided by int representing control speed
      header.scrollTop += parseFloat(e.deltaY) / 2;
    });

// Stack Menu Scroll Controls
    let observedArr = [];
    const stackObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        stackParChildren.forEach(cur => cur.style.top = `${parseFloat(window.getComputedStyle(stackParent)['height'])}px`);
        const entryInd = observedArr.indexOf(entry.target);
        const entryHeight = parseFloat(window.getComputedStyle(stackParChildren[entryInd])['height']) / 2;
        const yPos = ((parseFloat(window.getComputedStyle(stackParent)['height']) - 32) / 2) - entryHeight;
        stackParChildren[entryInd].style.top = `${yPos}px`;
      });
    }, {
      root: stackOptions,
      rootMargin: `0px -${stackOptions.clientWidth / 2}px 0px -${stackOptions.clientWidth / 2}px`,
      threshold: 0
    });

    stackOptChildren.forEach(cur => {
      observedArr.push(cur);
      stackObserver.observe(cur);
    });

    stackOptions.scrollTo(600, 0);
    stackOptions.scrollTo({
      left: 10,
      behavior: "smooth"
    });

    // Scrolling while cursor is placed anywhere over parent element triggers scrolling horizontally on the child element.
    stackParent.addEventListener('wheel', (e) => {
      e.preventDefault();
      // int e.deltaY is divided by int representing control speed
      stackOptions.scrollLeft += parseFloat(e.deltaY) / 4;
    });
  }
);