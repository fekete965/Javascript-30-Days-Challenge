(function() {
  const items = document.getElementById('items');
  const mouse = {
    active: false,
    coords: {
      x: 0
    },
    hovered: false,
    delay: undefined
  };

  // Custom Scroll
  const customScroll = (e) => {
    if (mouse.hovered === true) {
      clearTimeout(mouse.delay);
      items.classList.add('active');
      items.scrollLeft += e.deltaY;

      e.preventDefault();
      e.returnValue = false;

      mouse.delay = setTimeout(() => {
        items.classList.remove('active');
      }, 500);
    };
  };


  // Manipulate Scroll
  (function () {
    if (window.addEventListener) { // older FF
      window.addEventListener('DOMMouseScroll', customScroll, { passive: true });
    };
    
    window.onwheel = customScroll; // modern standard
    window.onmousewheel = document.onmousewheel = customScroll; // older browsers, IE
    window.ontouchmove  = customScroll; // mobile
  }());

  // Event Handlers
  const handleOnMouseUp = (e) => {
    mouse.active = false;
    items.classList.remove('active');
  };

  const handleOnMouseDown = (e) => {
    mouse.active = true;
    items.classList.add('active');
    mouse.coords.x = e.x;
  };

  const handleOnMouseMove = (e) => {
    if (mouse.active == true) {
      const value = e.x - mouse.coords.x;
      items.scrollLeft -= value;

      mouse.coords.x = e.x;
    };
  };

  const handleOnMouseOver = () => {
    mouse.hovered = true;
  };

  const handleOnMouseLeave = () => {
    if (mouse.active === true) {
      mouse.active = false
    };
    mouse.hovered = false;
    items.classList.remove('active');
  };


  // Event Listeners
  items.addEventListener('mouseup', handleOnMouseUp);
  items.addEventListener('mousedown', handleOnMouseDown);
  items.addEventListener('mousemove', handleOnMouseMove);
  items.addEventListener('mouseover', handleOnMouseOver);
  items.addEventListener('mouseleave', handleOnMouseLeave);

  window.addEventListener('blur', handleOnMouseLeave);
}());