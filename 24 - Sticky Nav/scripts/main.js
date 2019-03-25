const navbar = document.getElementById('navbar');
const navY = navbar.offsetTop;

const handleOnScroll = () => {  
  if (window.scrollY > navY) {
    document.body.classList.add('fixed',)
    document.body.style.paddingTop = `${navbar.offsetHeight}px`;
  } else {
    document.body.classList.remove('fixed',)
    document.body.style.paddingTop = 0;
  };
};

window.addEventListener('scroll', handleOnScroll);