(function() {
  const anchors = document.querySelectorAll('a');
  const menu = document.getElementById('menu');
  const wrapper = document.getElementById('wrapper');


  const span = document.createElement('span');
  span.className = 'highlight';
  document.body.append(span);

  let targetAnchor = undefined;
  let timeout = undefined;


  const setStyle = (anchor, transition) => {
    const left = anchor.target.offsetParent.offsetLeft + anchor.target.offsetLeft;
    const top = anchor.target.offsetParent.offsetTop + anchor.target.offsetTop;

    span.style.opacity = 1;
    span.style.top = `${top}px`;
    span.style.left = `${left}px`;
    span.style.width = `${anchor.target.offsetWidth}px`;
    span.style.height = `${anchor.target.offsetHeight}px`;
    span.style.transition = transition;
  };

  const handleOnMouseEnter = (e) => {
    clearTimeout(timeout);

    targetAnchor = e;

    setStyle(targetAnchor, 'all .2s ease');
  };

  const handleOnMouseLeave = (e) => {
    timeout = setTimeout(() => {
      span.style.opacity = 0;
      span.style.transition = 'opacity .2s ease';
    }, 1000);
  };

  const handleWindowResize = () => {
    setStyle(targetAnchor, 'opacity .2s ease');
  };

  anchors.forEach((a) => {
    a.addEventListener('mouseenter', handleOnMouseEnter);
  });

  menu.addEventListener('mouseleave', handleOnMouseLeave);
  wrapper.addEventListener('mouseleave', handleOnMouseLeave);
  window.addEventListener('resize', handleWindowResize);
}());