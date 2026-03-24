setTimeout(() => {
  function infiniteScroll(eleArr, speed, direction, childSpacing = 0, parentPadding = 0) {
    const childArr = [...eleArr.children];
    const childObj = {};
    const axis = (direction === 'top' || direction === 'bottom')? ['height', 'width'] : ['width', 'height'];

    let arrLen = 0;
    let largestElLen = 0;
    let largestElOpLen = 0;
    childArr.forEach(cur => {
      const curLen = parseFloat(window.getComputedStyle(cur)[axis[0]]) + childSpacing;
      const curOpLen = parseFloat(window.getComputedStyle(cur)[axis[1]]);
      cur.style[direction] = `${arrLen}px`;
      arrLen += curLen;
      if(curLen > largestElLen){ largestElLen = curLen }
      if(curOpLen > largestElOpLen){ largestElOpLen = curOpLen }
    });

    if(window.getComputedStyle(eleArr)[axis[0]] === '0px' || window.getComputedStyle(eleArr)[axis[1]] === '0px') {
      eleArr.style[axis[0]] = `auto`;
      eleArr.style[axis[1]] = `${largestElOpLen}px`;
    }

    function run() {
      childArr.forEach(cur => {
        const curPos = parseFloat(window.getComputedStyle(cur)[direction]) || 0;
        const curLen = parseFloat(window.getComputedStyle(cur)[axis[0]]) + childSpacing;
        const newPos = (curPos < (curLen * -1))? arrLen - curLen : curPos - speed;
        cur.style[direction] = `${newPos}px`;
      });
    };

    let animationId;
    function animate() {
      run();
      animationId = requestAnimationFrame(animate);
    }

    eleArr.addEventListener('mouseenter', () => {
      cancelAnimationFrame(animationId);
      animationId = null;
    })

    eleArr.addEventListener('mouseleave', () => {
    animationId = requestAnimationFrame(animate);
    })

    animationId = requestAnimationFrame(animate);
  }

  //transform-based infinite scroll for svgs
  function infiniteScrollTransform(eleArr, speed, direction, childSpacing = 0) {
    direction = direction.toUpperCase();
    const childArr = [...eleArr.children];
    const axis = (direction === 'Y')? ['height', 'width'] : ['width', 'height'];

    let arrLen = 0;
    let largestElLen = 0;
    let largestElOpLen = 0;
    let distArr = [];
    childArr.forEach(cur => {
      const curLen = parseFloat(window.getComputedStyle(cur)[axis[0]]) + childSpacing;
      const curOpLen = parseFloat(window.getComputedStyle(cur)[axis[1]]);
      cur.style[`transform`] = `translate${direction}(0px)`;
      distArr.push(arrLen);
      arrLen += curLen;
      if(curLen > largestElLen){ largestElLen = curLen }
      if(curOpLen > largestElOpLen){ largestElOpLen = curOpLen }
    });

    if(window.getComputedStyle(eleArr)[axis[0]] === '0px' || window.getComputedStyle(eleArr)[axis[1]] === '0px') {
      eleArr.style[axis[0]] = `auto`;
      eleArr.style[axis[1]] = `${largestElOpLen}px`;
    }

    function run() {
      childArr.forEach((cur, ind) => {
        const curPos = parseFloat(window.getComputedStyle(cur)[`transform`].split(", ")[5].replace(")", "")) || 0;
        const curLen = parseFloat(window.getComputedStyle(cur)[axis[0]]) + childSpacing;
        const newPos = (largestElLen < (curPos - distArr[ind]) * -1)? arrLen - (curLen + distArr[ind]) : curPos - speed;
        cur.style[`transform`] = `translate${direction}(${newPos}px)`;
      });
    };

    let animationId;
    function animate() {
      run();
      animationId = requestAnimationFrame(animate);
    }

    eleArr.addEventListener('mouseenter', () => {
      cancelAnimationFrame(animationId);
      animationId = null;
    })

    eleArr.addEventListener('mouseleave', () => {
    animationId = requestAnimationFrame(animate);
    })

    animationId = requestAnimationFrame(animate);
  }

  // Header animation
  const dataSteams = document.querySelectorAll(".stream");
  dataSteams.forEach(curParent => {
    const randSpeed = parseFloat(Math.random() * .5) + .5;
    infiniteScrollTransform(curParent, randSpeed, 'y', 1);
  });

  // Animations
  // Menus opacity change animation
  let menuOpacitySpeed = .05;
  let menuOpacityId = null;

  function menuOpacity(showHide) {
    menuArr.forEach(cur => {
      const curOpacity = parseFloat(window.getComputedStyle(cur).opacity);
      const direcT = (showHide)? menuOpacitySpeed : menuOpacitySpeed * -1;

      cur.style.opacity = curOpacity + direcT;

      if(showHide && curOpacity > 0) {
        cancelAnimationFrame(menuOpacityId);
        menuOpacityId = null;
        return;
      } else if (!showHide && curOpacity <= 0) {
        cancelAnimationFrame(menuOpacityId);
        menuOpacityId = null;
        return;
      }
    });

    menuOpacityId = requestAnimationFrame(() => menuOpacity(showHide));
  }

  // Differentiators 
  // Affirmations
  const affirm = document.querySelector("#affirmations");
  infiniteScroll(affirm, 2, 'top');
  // Bottom banner
  const diffbtm = document.querySelector("#diffBottom");
  infiniteScroll(diffbtm, 2, 'left');

  // Reviews
  // const reviews = document.querySelector("#reviews");
  // infiniteScroll(reviews, .5, 'right', 150);

  // Examples
  const examples = document.querySelector("#examplesScroll");
  infiniteScroll(examples, .5, 'right', 150);
}, 1000);