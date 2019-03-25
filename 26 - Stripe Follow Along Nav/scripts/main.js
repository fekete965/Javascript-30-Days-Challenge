(function() {
  const navbar = document.getElementById('navbar');
  const menuBG = document.getElementById('menuBg');
  const menuElements = document.querySelectorAll('.menu > li > a');
  let targetMenu = undefined;
  let transitionDelay = undefined;
  let classDelay = undefined;

  const handleMenuMouseOver = (e) => {
    clearTimeout(transitionDelay);
    clearTimeout(classDelay);

    targetMenu = e.target.parentElement;
    targetMenu.classList.add('trigger');

    classDelay = setTimeout(() => {
      targetMenu.classList.add('trigger-active');
    }, 100);
    
    menuBG.classList.add('open');

    const { top, left, width, height } = targetMenu.querySelector('.dropdown').getBoundingClientRect();
    const { top: navTop, left: navLeft } = navbar.getBoundingClientRect();

    menuBG.style.width = `${width}px`;
    menuBG.style.height = `${height}px`;
    menuBG.style.transform = `translate(${left - navLeft}px, ${top - navTop}px)`;

    transitionDelay = setTimeout(() => {
      menuBG.style.transition = 'all, 0.3s, opacity 0.1s, transform 0.2s';
    }, 100);
  };

  const handleMenuMouseLeave = function(e) {
    clearTimeout(transitionDelay);
    clearTimeout(classDelay);
    
    targetMenu.classList.remove('trigger-active');
    
    transitionDelay = setTimeout(() => {
      menuBG.classList.remove('open');
      targetMenu.classList.remove('trigger');

      menuBG.style.transition = 'opacity .3s ease';
    }, 150);
  };


  menuElements.forEach((el) => {
    el.addEventListener('mouseover', handleMenuMouseOver);
    el.addEventListener('mouseleave', handleMenuMouseLeave);
  });
  
}());
