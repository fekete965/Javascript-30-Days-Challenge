(function() {
  const checkboxes = document.querySelectorAll('input[type=checkbox]');

  checkboxes.forEach((a) => console.log(a));

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


  checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener('click', handleOnClick(index));
  });

  const onHandleKeyDown = (e) => {
    if (keyPressed === false && e.keyCode === 16) {
      keyPressed = true;
    };
  };

  const onHandleKeyUp = (e) => {
    if (keyPressed === true && e.keyCode === 16) {
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