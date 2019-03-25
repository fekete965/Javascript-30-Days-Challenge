// A way to prevent scrolling

const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

// Prevent Default Function
const preventDefault = (e) => {
  e = e || window.event;

  if (e.preventDefault) {
    console.log('SCROLLING')
    e.preventDefault();
  };

  e.returnValue = false;
};

// Prevent Defautl Scroll Keys
const preventDefaultForScrollKeys = (e) => {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  };
};

// Disable Scroll
const disableScroll = () => {
  if (window.addEventListener) { // older FF
    window.addEventListener('DOMMouseScroll', preventDefault, false);
  };
  
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
};

// Enable Scroll
const enableScroll = () => {
  if (window.removeEventListener) { // older FF
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
  };

  window.onwheel = null; // modern standard
  window.onmousewheel = document.onmousewheel = null; // older browsers, IE
  window.ontouchmove  = null; // mobile
  document.onkeydown  = null;
};