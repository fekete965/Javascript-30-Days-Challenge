(function() {
  const video = document.querySelector('.player');
  const canvasVideo = document.getElementById('canvasVideo');
  const videoCtx = canvasVideo.getContext('2d');
  const canvasColor = document.getElementById('canvasColor');
  const colorCtx = canvasColor.getContext('2d');
  const canvasPicture = document.getElementById('canvasPicture');
  const pictureCtx = canvasPicture.getContext('2d');
  const photoContainer = document.getElementById('photoContainer');
  const btnUpload = document.getElementById('btnUpload');
  const btnClear = document.getElementById('btnClear');
  const btnToggleStart = document.getElementById('btnToggleStart');
  const toggleStartText = btnToggleStart.querySelector('span');
  const btnTakePhoto = document.getElementById('btnTakePhoto');
  const ghostRadio = document.querySelectorAll('input[name="ghost"]');
  const colorRadio = document.querySelectorAll('input[name="color"]');
  const chromaRadio = document.querySelectorAll('input[name="chroma"]');
  const rangeInputs = document.querySelectorAll('input[name="range"]');
  const fileUpload = document.getElementById('fileUpload');


  const videoCWidth = 640;
  const videoCHeight = 360;

  const colorCWidth = 72;
  const colorCHeight = 24;

  const pictureCWidth = 160;
  const pictureCHeight = 90;

  const constrains = {
    audio: false,
    video: {
      height: { min: videoCWidth, ideal: 1024, max: 1080 },
      width: { min: videoCHeight, ideal: 1280, max: 1920 }
    }
  };

  const streamState = {
    isStreaming: false,
    liveStream: undefined,
    imgCount: 0
  };

  const filters = {
    chroma: {
      isOn: false,
      value: [0, 0, 0, 0],
      tolerance: .9
    },
    colorize: {
      type: 'default'
    },
    background: {
      files: undefined,
      image: undefined
    },
    ghosting: false
  };

  // Create Temporary Canvas
  const tempCanvas = new OffscreenCanvas(videoCWidth, videoCHeight);
  const tempCContext = tempCanvas.getContext('2d');

  // Setup canvas size
  canvasVideo.width = videoCWidth;
  canvasVideo.height = videoCHeight;

  canvasPicture.width = pictureCWidth;
  canvasPicture.height = pictureCHeight;

  const colourDistance = (red1, green1, blue1, red2, green2, blue2) => {
    const rmean = ( red1 + red2 ) / 2;
    const r = red1 - red2;
    const g = green1 - green2;
    const b = blue1 - blue2;
    const weightR = 2 + rmean / 256;
    const weightG = 4.0;
    const weightB = 2 + (255 - rmean) / 256;

    return Math.sqrt(weightR * r * r + weightG * g * g + weightB * b * b);
  };

  const applyFilters = async (videoImageData) => {
    const { chroma, colorize } = filters;
    const { type } = colorize;
    const [chromaR, chromaG, chromaB] = chroma.value;
    const length = videoImageData.data.length / 4;

    // Create Temporary Canvas
    const tempCanvas = new OffscreenCanvas(videoCWidth, videoCHeight);
    const tempCContext = tempCanvas.getContext('2d');

    for (let i = 0; i < length; i += 1) {
      // Get RGB Colors
      let imageR = videoImageData.data[i * 4 + 0];
      let imageG = videoImageData.data[i * 4 + 1];
      let imageB = videoImageData.data[i * 4 + 2];
      
      // If the color matches the chrome key color change alpha channel to 0
      if (chroma.isOn === true) {
          const maxColDist = 764.8339663572415;
          const d1 = colourDistance(imageR, imageG, imageB, chromaR, chromaG, chromaB);
          const s1 = (maxColDist - d1) / maxColDist;

        if (s1 > chroma.tolerance) {
          videoImageData.data[i * 4 + 3] = 0;

          // Square Alpha Root
          // const a = (s1 - chroma.tolerance);
          // const b = 1 - chroma.tolerance;
          // videoImageData.data[i * 4 + 3] = 255 *  (1 - (a / b));
        };
      };

      switch(type) {
        case 'red': {
          videoImageData.data[i * 4 + 0] = 255;
          break;
        };

        case 'green': {
          videoImageData.data[i * 4 + 1] = 255;
          break;
        };

        case 'blue':{
          videoImageData.data[i * 4 + 2] = 255;
          break;
        };
        
        default: break;
      };
    };
    
    if (filters.chroma.isOn === true && filters.background.image !== undefined) {
      tempCContext.drawImage(filters.background.image, 0, 0, videoCWidth, videoCHeight);
    };

    const videoFrame = await createImageBitmap(videoImageData, 0, 0, videoCWidth, videoCHeight);
    tempCContext.drawImage(videoFrame, 0, 0, videoCWidth, videoCHeight);

    return await createImageBitmap(tempCanvas, 0, 0, videoCWidth, videoCHeight);
  };

  const drawVideo = async () => {
    if (streamState.isStreaming === true) {
      requestAnimationFrame(drawVideo);
      tempCContext.drawImage(video, 0, 0, videoCWidth, videoCHeight);
      
      const imageData = tempCContext.getImageData(0, 0, videoCWidth, videoCHeight);
      const newFrame = await applyFilters(imageData);
      
      if (filters.ghosting === false) {
        videoCtx.clearRect(0, 0, videoCWidth, videoCHeight);
      };

      videoCtx.drawImage(newFrame, 0, 0, videoCWidth, videoCHeight);
    } else {
      cancelAnimationFrame(drawVideo);
      videoCtx.clearRect(0, 0, videoCWidth, videoCHeight);
    };
  };

  const drawColorPreview = () => {
    const [r, g, b] = filters.chroma.value;
    const color = `rgb(${r}, ${g}, ${b})`;
    
    colorCtx.clearRect(0, 0, colorCWidth, colorCHeight);
    colorCtx.fillStyle = color;
    colorCtx.fillRect(0, 0, colorCWidth, colorCHeight);
  };

  const handleError = (error) => console.log(`Something went wrong: ${error}`);

  const toggleStart = () => {
    if (streamState.isStreaming === false) {
      navigator.mediaDevices.getUserMedia(constrains).then((stream) => {
        streamState.liveStream = stream;

        video.style.display = 'none';
        video.srcObject = stream;
        video.play();
      }).catch(handleError);
    } else {
      const tracks = streamState.liveStream.getTracks();
      tracks.forEach((track) => track.stop());

      video.pause();
    };
  };

  const handleTakePhoto = () => {
    if (streamState.isStreaming === true) {      
      const { imgCount } = streamState;
      const photo = canvasVideo.toDataURL('image/png');

      const a = document.createElement('a');
      a.target = '_blank';
      a.download = `image_${imgCount}_${Date.now()}.png`;
      a.href = photo;

      const img = document.createElement('img');
      img.className = 'photo';
      img.src = photo.toString();

      a.append(img);
      photoContainer.prepend(a);

      streamState.imgCount += 1;
    };
  };

  const handleVideoPlay = () => {
    streamState.isStreaming = true;
    btnTakePhoto.disabled = false;
    canvasVideo.classList.add('streaming');
    btnToggleStart.classList.add('on');
    toggleStartText.textContent = toggleStartText.textContent.replace('Start', 'Stop');
    
    drawVideo();
  };

  const handleVideoPause = () => {
    streamState.liveStream = undefined;
    streamState.isStreaming = false;
    btnTakePhoto.disabled = true;
    canvasVideo.classList.remove('streaming');
    btnToggleStart.classList.remove('on');
    toggleStartText.textContent = toggleStartText.textContent.replace('Stop', 'Start');
  };

  const handleColorChange = (e) => {
    filters.colorize.type = e.target.value;
  };

  const handleChromaChange = (e) => {
    const value = !!parseInt(e.target.value, 10);
    filters.chroma.isOn = value


    rangeInputs.forEach((input) => {
      input.disabled = !value;
    });
  };

  const handleInputChange = (e) => {
    e.target.value = e.target.value.replace('-', '');

    const value = e.target.value.trim();
    const idx = e.target.dataset.index;

    if (value > 255) {
      e.target.value = 255;
    };

    if (value < 0) {
      e.target.value = 0;
    };

    filters.chroma.value[idx] = value;
    drawColorPreview();
  };

  const handleUploadClick = async () => {
    filters.background.image = await createImageBitmap(filters.background.files[0], 0, 0, videoCWidth, videoCHeight);
    pictureCtx.drawImage(filters.background.image, 0, 0, pictureCWidth, pictureCHeight);
  };
  
  const handleClearClick = () => {
    fileUpload.value = '';
    btnUpload.disabled = true;
    btnClear.disabled = true;

    filters.background.files = undefined;
    filters.background.imageData = undefined;

    drawBackgroundPreview();
  };

  const handleFileUploadChange = (e) => {
    const value = e.target.value;

    if (value.length > 0) {
      filters.background.files = e.target.files;
      btnUpload.disabled = false;
      btnClear.disabled = false;
    } else {
      btnUpload.disabled = true;
      btnClear.disabled = true;
    };
  };
  
  const handleCanvasClick = (e) => {
    if (streamState.isStreaming) {
      const x = e.layerX;
      const y = e.layerY;
      const imageData = videoCtx.getImageData(x, y, 1, 1);
      
      const [r, g, b] = imageData.data;

      rangeInputs.forEach((input) => {
        const idx = parseInt(input.dataset.index, 10);
        
        if (idx === 0) { input.value = r; };
        if (idx === 1) { input.value = g; };
        if (idx === 2) { input.value = b };
      });

      filters.chroma.value = Array.prototype.slice.call(imageData.data);
      drawColorPreview();
    };
  };

  const handleGhostingChange = (e) => {
    const value = !!parseInt(e.target.value, 10);
    filters.ghosting = value;
  };

  video.addEventListener('pause', handleVideoPause);
  video.addEventListener('play', handleVideoPlay);

  fileUpload.addEventListener('change', handleFileUploadChange);

  btnUpload.addEventListener('click', handleUploadClick);
  btnClear.addEventListener('click', handleClearClick);
  btnToggleStart.addEventListener('click', toggleStart);
  btnTakePhoto.addEventListener('click', handleTakePhoto);

  ghostRadio.forEach((radio) => {
    radio.addEventListener('change', handleGhostingChange);
  });

  colorRadio.forEach((radio) => {
    radio.addEventListener('change', handleColorChange);
  });
  
  chromaRadio.forEach((radio) => {
    radio.addEventListener('change', handleChromaChange);
  });

  rangeInputs.forEach((input) => {
    input.addEventListener('input', handleInputChange);
  });

  canvasVideo.addEventListener('click', handleCanvasClick);
}());