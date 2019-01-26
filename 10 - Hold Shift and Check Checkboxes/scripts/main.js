(function() {
  const checkboxes = document.querySelectorAll('input[type=checkbox]');
  const checkboxArr = Array.prototype.slice.apply(checkboxes);

  let keyPressed = false;
  let mousePressed = false;
  let target = undefined;

  
  const handleCheckboxMouseEnter = (e) => {
    if (keyPressed === true && mousePressed === true) {
      e.target.checked = !e.target.checked;
    };
  };

  const handleCheckboxMouseDown = (e) => {
    target = e.target;
  };

  const handleCheckboxMouseUp = () => {
    target = undefined;
  };

  const onHandleKeyDown = (e) => {
    if (keyPressed === false && e.keyCode === 16) {
      keyPressed = true;
      if (target) {
        target.checked = !target.checked;
        target = undefined;
      };
    };
  };

  const onHandleKeyUp = (e) => {
    if (e.keyCode === 16) {
      keyPressed = false;
    };
  };

  const onHandleMouseDown = (e) => {
    if (e.button === 0) {
      mousePressed = true;
      if (keyPressed === true && e.target && e.target.type === 'checkbox') {
        e.target.checked = !e.target.checked;
      };
    };
  };

  const onHandleMouseUp = (e) => {
    if (e.button === 0) {
      mousePressed = false;
    };
  };

  const onHandleSelectStart = (e) => {
    if (keyPressed === true) {
      e.preventDefault();
    };
  };
  

  checkboxArr.forEach((checkbox) => {
    checkbox.addEventListener('mouseenter', handleCheckboxMouseEnter);
    checkbox.addEventListener('mousedown', handleCheckboxMouseDown);
    checkbox.addEventListener('mouseup', handleCheckboxMouseUp);
  });

  window.addEventListener('keydown', onHandleKeyDown);

  window.addEventListener('keyup', onHandleKeyUp);

  window.addEventListener('mousedown', onHandleMouseDown);

  window.addEventListener('mouseup', onHandleMouseUp);

  window.addEventListener('selectstart', onHandleSelectStart);
}());