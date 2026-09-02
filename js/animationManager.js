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
    const eleStyles = getComputedStyle(targetEle);
    if (axis === "X") {
      const marginLeft = parseFloat(eleStyles.marginLeft);
      const marginRight = parseFloat(eleStyles.marginRight);
      const eleWidth = parseFloat(targetEle.getBoundingClientRect().width);
      return marginLeft + marginRight + eleWidth;
    } else {
      const marginTop = parseFloat(eleStyles.marginTop);
      const marginBottom = parseFloat(eleStyles.marginBottom);
      const eleHeight = parseFloat(targetEle.getBoundingClientRect().height);
      return marginTop + marginBottom + eleHeight;
    }
  }

  infiniteScroll (targetEle, direction, speed, hoverPause = false) {
    const dirInt = (direction == "right" | direction == "down")? [ 1, -1 ] : [ -1, 1 ];
    const axis = (direction == "right" | direction == "left")? "X" : "Y";
    const axisStr = (axis == "X")? "width" : "height";
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

    this.#addAnimation(targetEle, {
      "childArr": childArr,
      "parentObj": {
        "axis": axis,
        "arrLen": arrLen,
        "speed": speed * dirInt[0],
        "dirInt": dirInt
      },
      "isPaused": false,
      "update": function () {
        this.childArr.forEach(cur => {
          cur.transform = cur.subjLen + (cur.transform * this.parentObj.dirInt[0]) >= this.parentObj.arrLen - cur.nodeLen
            ? (cur.subjLen + cur.nodeLen) * this.parentObj.dirInt[1]
            : cur.transform + this.parentObj.speed;
          cur.node.style.transform = `translate${this.parentObj.axis}(${cur.transform}px)`;
        });
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