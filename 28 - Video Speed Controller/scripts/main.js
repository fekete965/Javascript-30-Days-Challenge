const label = document.getElementById('label');
const video = document.getElementById('video');
const speedBarContainer = document.getElementById('speedBarContainer');
const speedBar = document.getElementById('speedBar');
const speedLabel = document.getElementById('speedLabel');

const mouse = {
  clicked: false
}

// Functions
const setSpeedLabel = (text) => {
  speedLabel.textContent = text.toFixed(1) + '×';
};

const changePlaybackRate = (rate) => {
  const min = 0.5;
  const max = 3;

  rate = Math.min(Math.max(min, rate * max), max);
  video.playbackRate = rate
};

const setSpeedBar = (e) => {
  const scale = (e.clientY - speedBarContainer.offsetTop) / speedBarContainer.offsetHeight;
  speedBar.style.transform = `scaleY(${scale})`;

  changePlaybackRate(scale);
};

// Event Handlers
const handleSpeedBarMouseDown = (e) => {
  mouse.clicked = true;
  setSpeedBar(e);
};

const handleSpeedBarMouseUp = (e) => {
  mouse.clicked = false;
};

const handleSpeedBarMouseMove = (e) => {
  if (mouse.clicked) {
    setSpeedBar(e);
  };
};

const handleRateChange = () => {
  setSpeedLabel(video.playbackRate);
};

// Event Listeners
video.addEventListener('ratechange', handleRateChange);

speedBarContainer.addEventListener('mousedown', handleSpeedBarMouseDown);

window.addEventListener('mouseup', handleSpeedBarMouseUp);
window.addEventListener('mousemove', handleSpeedBarMouseMove);