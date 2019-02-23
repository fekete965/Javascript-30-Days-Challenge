(function() {
  const shadowControl = (targetId, options) => {
    // Argument check
    options = typeof options == 'object' && Array.isArray(options) === false ? options : {};

    let target = undefined;
    if (typeof targetId === 'string') {
      target = document.querySelector(targetId);
      target.style.transition = 'all .2s ease'
    } else {
      throw new Error(`Target is invalid.`);
    };


    // Check options
    options.range = typeof options.range === 'number' || !isNaN(options.rage) ? options.range : 12,
    options.opacity = typeof options.opacity === 'number' || !isNaN(options.rage) ? Math.max(Math.min(options.opacity, 1), 0) : .2,
    options.delay = typeof options.delay === 'number' || !isNaN(options.rage) ? options.delay : 1500,
    options.autoReset = typeof options.autoReset === 'boolean' ? options.autoReset : true ,
    options.color = setColor(options.color)


    // Destructure
    let { range, opacity, delay, autoReset, color } = options;
    let timer = undefined;


    function setColor(newColor) {
      if (Array.isArray(newColor) && newColor.length === 3) {
        return newColor.map((color) => {
          if (typeof color !== 'number') {
            return '0';
          } else {
            return Math.max(Math.min(color, 255), 0); 
          };
        }).join(',');
      };

      if (typeof newColor === 'string' && newColor[0] === '#') {
        const length = newColor.split('').length;
        const tempArr = [];

        for (let i = 1; i < length; i += 2) {
          tempArr.push(parseInt(newColor[i] + newColor[i+1], 16));
        };

        return tempArr.join(',');
      };

      return '0, 0, 0';
    };

    const changeShadow = (x = 0, y = 0) => {
      // Clear timer
      if (autoReset === true) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          target.style.textShadow = `0 0 0 rgba(0, 0, 0, 0)`;
        }, delay);
      };

      // Calculate New Coordinates
      newX = Math.round(Math.max(Math.min(range, x), -range));
      newY = Math.round(Math.max(Math.min(range, y), -range));

      // Assign New Coordinates
      target.style.textShadow = `${newX}px ${newY}px 0 rgba(${color}, ${opacity})`;
    };

    const handleMouseMove = (e) => {
      // Get Element Coordinates
      const elX = target.offsetLeft;
      const elY = target.offsetTop;
      
      // Get Element Dimension
      const elHeight = target.clientHeight / 2;
      const elWidth = target.clientWidth / 2;
      
      // Get Mouse Coordinates
      const mouseX = e.x - elWidth;
      const mouseY = e.y - elHeight;
      
      // Calculate Shadow Coordinates
      const x = elX - mouseX;
      const y = elY - mouseY;
  
      // Setup Element Text Shadow
      changeShadow(x, y);
    };

    target.addEventListener('mousemove', handleMouseMove);


    return {
      getRange: () => range,
      getOpacity: () => opacity,
      getDelay: () => delay,
      getAutoReset: () => autoReset,
      getColor: () => color.split(''),
      setRange: (newRange) => {
        range = typeof newRange === 'number' ? newRange : range;
      },
      setOpacity: (newOpacity) => {
        opacity = typeof newOpacity === 'number' ? newOpacity : opacity;
      },
      setDelay: (newDelay) => {
        delay = typeof newDelay === 'number' ? newDelay : delay;
      },
      setAutoReset: (newAutoReset) => {
        autoReset = typeof newAutoReset === 'boolean' ? newAutoReset : autoReset;
      },
      setColor: (newColor) => {
        color = setColor(newColor);
      }
    };
  };

  const shadow = shadowControl('.hero h1');
}());