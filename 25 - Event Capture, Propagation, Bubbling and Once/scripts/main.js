const divs = document.querySelectorAll('div');
const button = document.querySelector('button');

function handleOnClick(e) {
  console.log(this.className);
  // e.stopPropagation(); // stop bubbling!
};

function handleOnButtonClick() {
  console.log('Click me!');
};

divs.forEach((div) => div.addEventListener('click', handleOnClick, { capture: false }));
button.addEventListener('click', handleOnButtonClick, { capture: false, once: true });