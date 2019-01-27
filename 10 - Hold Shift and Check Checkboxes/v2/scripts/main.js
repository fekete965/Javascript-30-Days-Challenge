(function() {
  const checkboxes = document.querySelectorAll('input[type=checkbox]');

  let keyPressed = false;
  let targetA = undefined;
  let targetB = undefined;

  const handleOnClick = (index) => (e) => {
    if (e.target.checked === true) {
      targetA = keyPressed === false ? index : targetA;
      targetB = keyPressed === true ? index : targetB;

      if (targetB !== undefined) {
        selectCheckbox(targetA, targetB);
      };
    };
  };

  const selectCheckbox = (a, b) => {
    if (a > b) {
      const temp = a;
      a = b;
      b = temp;
    };

    for (a; a <= b; a += 1) {
      checkboxes[a].checked = checkboxes[a].checked === false || true;
    };

    targetA = undefined;
    targetB = undefined;
  };


  for (let i = 0; i < checkboxes.length; i += 1) {
    checkboxes[i].addEventListener('click', handleOnClick(i));
  };

  const onHandleKeyDown = (e) => {
    if (keyPressed === false && e.keyCode === 16) {
      keyPressed = true;
    };
  };

  const onHandleKeyUp = (e) => {
    if (e.keyCode === 16) {
      keyPressed = false;
    };
  };

  const onHandleSelectStart = (e) => {
    if (keyPressed === true) {
      e.preventDefault();
    };
  };
  

  window.addEventListener('keydown', onHandleKeyDown);

  window.addEventListener('keyup', onHandleKeyUp);

  window.addEventListener('selectstart', onHandleSelectStart);
}());