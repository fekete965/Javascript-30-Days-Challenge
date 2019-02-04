(function() {
  let images = [];

  const options = {
    treshold: .8
  };

  const showImage = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting === true || entry.boundingClientRect.top <= 0) {
        entry.target.classList.add('active');
      };
    });
  };

  const observer = new IntersectionObserver(showImage, options);

  
  const handleWindowOnLoad = () => {
    images = document.querySelectorAll('img.slide-in');
    images.forEach((image) => {
      if (image.y <= 0)  {
        image.classList.add('active');
      };
      observer.observe(image)
    });
  };

  window.addEventListener('load', handleWindowOnLoad);

}());