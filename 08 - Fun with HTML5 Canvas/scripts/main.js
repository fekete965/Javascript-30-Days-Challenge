(function() {
  const radioBtnMS = document.getElementById('mouseSpeed');
  const radioBtnAS = document.getElementById('autoSize');
  const radioBtnDS = document.getElementById('defaultSize');
  const colorPicer = document.getElementById('colorPicker');
  const radioBtnDC = document.getElementById('defaultColor');
  const radioBtnAC = document.getElementById('autoColor');
  const btnClear = document.getElementById('btnClear');

  const canvas = document.getElementById('myCanvas');
  canvas.width = 700;
  canvas.height = 700;

  const ctx = canvas.getContext('2d');
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  const options = {
    prevX: 0,
    prevY: 0,
    hue: 0,
    defaultLineWidth: 5,
    lineWidth: 5,
    defaultColor: '#000',
    isDrawing: false,
    effect: {
      color: 0,
      size: 0
    }
  };


  const configureDrawing = (x, y) => {
    const { defaultColor, defaultLineWidth, effect: { color, size }, hue, lineWidth } = options;
    // Size: 0 - Default Size , 1 - Auto Size , 2 - Mouse Speed Based Size
    // Color: 0 - Custom Color , 1 - Auto Color

    switch(size) {
      case 2: {
        const dX = options.prevX - x;
        const dY = options.prevY - y;
        const d = Math.min(Math.floor(Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2))), 360 / 4);
        ctx.lineWidth = d;
        break;
      };
      case 1: {
        options.lineWidth = ctx.lineWidth > 100 ? 1 : ctx.lineWidth += 1
        ctx.lineWidth = lineWidth;
        break;
      };
      default: {
        options.lineWidth = defaultLineWidth;
        ctx.lineWidth = defaultLineWidth;
        break;
      };
    };

    switch(color) {
      case 1: {
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        options.hue = hue > 360 ? 0 : options.hue += 1;
        break;
      };
      default: {
        ctx.strokeStyle = defaultColor;
        break;
      };
    };
  };

  const draw = (x, y) => {
    ctx.beginPath();
    ctx.moveTo(options.prevX, options.prevY);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();

    options.prevX = x;
    options.prevY = y;
  };

  const onHandleMouseDown = (e) => {
    options.prevX = e.layerX;
    options.prevY = e.layerY;
    
    options.isDrawing = true;
  };

  const onHandleMouseMove = (e) => {
    if (options.isDrawing === true) {
      configureDrawing(e.layerX, e.layerY);
      draw(e.layerX, e.layerY);
    };
  };
  
  const onHandleMouseUp = () => {
    options.isDrawing = false;
  };

  const handleOnChange = (e) => {
    if (options.effect[e.target.name] !== undefined) {
      options.effect[e.target.name] = parseInt(e.target.value, 10);;
    };
    e.preventDefault();
  };

  const handleOnColorChange = (e) => {
    options.defaultColor = e.target.value;

    e.preventDefault();
  };

  const handleOnClick = (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };


  radioBtnMS.addEventListener('change', handleOnChange);

  radioBtnAS.addEventListener('change', handleOnChange);

  radioBtnDS.addEventListener('change', handleOnChange);

  colorPicer.addEventListener('change', handleOnChange);

  radioBtnDC.addEventListener('change', handleOnChange);

  radioBtnAC.addEventListener('change', handleOnChange);

  colorPicker.addEventListener('change', handleOnColorChange);
  

  canvas.addEventListener('mousedown', onHandleMouseDown);

  canvas.addEventListener('mousemove', onHandleMouseMove);

  canvas.addEventListener('mouseup', onHandleMouseUp);

  canvas.addEventListener('mouseleave', onHandleMouseUp);


  btnClear.addEventListener('click', handleOnClick);
}());