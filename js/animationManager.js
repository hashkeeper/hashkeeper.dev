export class AnimationManager {
  constructor (nodeObj) {
    this.nodeObj = nodeObj;
    this.elementMap = new Map();

    this.#loop();
  }

  #loop () {
    for (const [id, params] of this.elementMap) {
      if (!params.isPaused) {
        params.update();
      }
    }

    requestAnimationFrame(() => this.#loop());
  }

  #addAnimation (targetEle, params) {
    this.elementMap.set(targetEle, params);
  }

  #getFullLength (targetEle, axis) {
    const eleStyles = this.nodeObj.window.getComputedStyle(targetEle);
    if (axis === "width") {
      const marginLeft = parseFloat(eleStyles.getPropertyValue("margin-left"));
      const marginRight = parseFloat(eleStyles.getPropertyValue("margin-right"));
      const eleWidth = parseFloat(targetEle.offsetWidth);
      return marginLeft + marginRight + eleWidth;
    } else {
      const marginTop = parseFloat(eleStyles.getPropertyValue("margin-top"));
      const marginBottom = parseFloat(eleStyles.getPropertyValue("margin-bottom"));
      const eleHeight = parseFloat(targetEle.offsetHeight);
      return marginTop + marginBottom + eleHeight;
    }
  }

  infiniteScroll (targetEle, direction, speed, hoverPause = false) {
    const dirInt = (direction == "right" | direction == "down")? [ 1, -1 ] : [ -1, 1 ];
    const axis = (direction == "right" | direction == "left")? "X" : "Y";
    const axisStr = (direction == "right" | direction == "left")? "width" : "height";
    let childArr = (dirInt[0] == 1)? [...targetEle.children] : [...targetEle.children].reverse();
    if (dirInt[0] == -1) { targetEle.style.justifyContent = "end"; }

    let arrLen = 0;
    childArr.forEach((cur, ind) => {
      cur.style.flexShrink = "0";
      const nodeLen = this.#getFullLength(cur, axis);
      childArr[ind] = {
        "node": cur,
        "transform": 0,
        "nodeLen": nodeLen,
        "subjLen": arrLen
      }
      arrLen += nodeLen;
    });

    console.log(childArr);

    this.#addAnimation(targetEle, {
      "childArr": childArr,
      "parentArr": {
        "axis": axis,
        "arrLen": arrLen,
        "speed": speed * dirInt[0],
        "dirInt": dirInt
      },
      "isPaused": false,
      "update": function () {
        this.childArr.forEach(cur => {
          cur.transform = (cur.subjLen + (cur.transform * this.parentArr.dirInt[0]) >= this.parentArr.arrLen)
            ? cur.subjLen * this.parentArr.dirInt[1]
            : cur.transform + this.parentArr.speed;
          cur.node.style.transform = `translate${this.parentArr.axis}(${cur.transform}px)`;
        });
        console.log(true);
      }
    });
  }

  opacityBool (targetEle, speed) {
    const curOpacity = targetEle.getComputedStyle().opacity;
    if (isNaN(curOpacity)) { targetEle.style.opacity = 1; }

    this.#addAnimation(targetEle, {
      "opacity": curOpacity,
      "speed": speed,
      "isPaused": false,
      "update": function () {

      }
    });
  }
}

// setTimeout(() => {
//   function infiniteScroll(eleArr, speed, direction, childSpacing = 0, parentPadding = 0) {
//     const childArr = [...eleArr.children];
//     const childObj = {};
//     const axis = (direction === 'top' || direction === 'bottom')? ['height', 'width'] : ['width', 'height'];

//     let arrLen = 0;
//     let largestElLen = 0;
//     let largestElOpLen = 0;
//     childArr.forEach(cur => {
//       const curLen = parseFloat(window.getComputedStyle(cur)[axis[0]]) + childSpacing;
//       const curOpLen = parseFloat(window.getComputedStyle(cur)[axis[1]]);
//       cur.style[direction] = `${arrLen}px`;
//       arrLen += curLen;
//       if(curLen > largestElLen){ largestElLen = curLen }
//       if(curOpLen > largestElOpLen){ largestElOpLen = curOpLen }
//     });

//     if(window.getComputedStyle(eleArr)[axis[0]] === '0px' || window.getComputedStyle(eleArr)[axis[1]] === '0px') {
//       eleArr.style[axis[0]] = `auto`;
//       eleArr.style[axis[1]] = `${largestElOpLen}px`;
//     }

//     function run() {
//       childArr.forEach(cur => {
//         const curPos = parseFloat(window.getComputedStyle(cur)[direction]) || 0;
//         const curLen = parseFloat(window.getComputedStyle(cur)[axis[0]]) + childSpacing;
//         const newPos = (curPos < (curLen * -1))? arrLen - curLen : curPos - speed;
//         cur.style[direction] = `${newPos}px`;
//       });
//     };

//     let animationId;
//     function animate() {
//       run();
//       animationId = requestAnimationFrame(animate);
//     }

//     eleArr.addEventListener('mouseenter', () => {
//       cancelAnimationFrame(animationId);
//       animationId = null;
//     })

//     eleArr.addEventListener('mouseleave', () => {
//     animationId = requestAnimationFrame(animate);
//     })

//     animationId = requestAnimationFrame(animate);
//   }

//   //transform-based infinite scroll for svgs
//   function infiniteScrollTransform(eleArr, speed, direction, childSpacing = 0) {
//     direction = direction.toUpperCase();
//     const childArr = [...eleArr.children];
//     const axis = (direction === 'Y')? ['height', 'width'] : ['width', 'height'];

//     let arrLen = 0;
//     let largestElLen = 0;
//     let largestElOpLen = 0;
//     let distArr = [];
//     childArr.forEach(cur => {
//       const curLen = parseFloat(window.getComputedStyle(cur)[axis[0]]) + childSpacing;
//       const curOpLen = parseFloat(window.getComputedStyle(cur)[axis[1]]);
//       cur.style[`transform`] = `translate${direction}(0px)`;
//       distArr.push(arrLen);
//       arrLen += curLen;
//       if(curLen > largestElLen){ largestElLen = curLen }
//       if(curOpLen > largestElOpLen){ largestElOpLen = curOpLen }
//     });

//     if(window.getComputedStyle(eleArr)[axis[0]] === '0px' || window.getComputedStyle(eleArr)[axis[1]] === '0px') {
//       eleArr.style[axis[0]] = `auto`;
//       eleArr.style[axis[1]] = `${largestElOpLen}px`;
//     }

//     function run() {
//       childArr.forEach((cur, ind) => {
//         const curPos = parseFloat(window.getComputedStyle(cur)[`transform`].split(", ")[5].replace(")", "")) || 0;
//         const curLen = parseFloat(window.getComputedStyle(cur)[axis[0]]) + childSpacing;
//         const newPos = (largestElLen < (curPos - distArr[ind]) * -1)? arrLen - (curLen + distArr[ind]) : curPos - speed;
//         cur.style[`transform`] = `translate${direction}(${newPos}px)`;
//       });
//     };

//     let animationId;
//     function animate() {
//       run();
//       animationId = requestAnimationFrame(animate);
//     }

//     eleArr.addEventListener('mouseenter', () => {
//       cancelAnimationFrame(animationId);
//       animationId = null;
//     })

//     eleArr.addEventListener('mouseleave', () => {
//     animationId = requestAnimationFrame(animate);
//     })

//     animationId = requestAnimationFrame(animate);
//   }

//   // Header animation
//   const dataSteams = document.querySelectorAll(".stream");
//   dataSteams.forEach(curParent => {
//     const randSpeed = parseFloat(Math.random() * .5) + .5;
//     infiniteScrollTransform(curParent, randSpeed, 'y', 1);
//   });

//   // Animations
//   // Menus opacity change animation
//   let menuOpacitySpeed = .05;
//   let menuOpacityId = null;

//   function menuOpacity(showHide) {
//     menuArr.forEach(cur => {
//       const curOpacity = parseFloat(window.getComputedStyle(cur).opacity);
//       const direcT = (showHide)? menuOpacitySpeed : menuOpacitySpeed * -1;

//       cur.style.opacity = curOpacity + direcT;

//       if(showHide && curOpacity > 0) {
//         cancelAnimationFrame(menuOpacityId);
//         menuOpacityId = null;
//         return;
//       } else if (!showHide && curOpacity <= 0) {
//         cancelAnimationFrame(menuOpacityId);
//         menuOpacityId = null;
//         return;
//       }
//     });

//     menuOpacityId = requestAnimationFrame(() => menuOpacity(showHide));
//   }

//   // Differentiators 
//   // Affirmations
//   const affirm = document.querySelector("#affirmations");
//   infiniteScroll(affirm, 1.5, 'top', 20);
//   // Bottom banner
//   const diffbtm = document.querySelector("#diffBottom");
//   infiniteScroll(diffbtm, 2, 'left');

//   // Reviews
//   // const reviews = document.querySelector("#reviews");
//   // infiniteScroll(reviews, .5, 'right', 150);

//   // Examples
//   const examples = document.querySelector("#examplesScroll");
//   infiniteScroll(examples, .5, 'right', 150);
// }, 1000);