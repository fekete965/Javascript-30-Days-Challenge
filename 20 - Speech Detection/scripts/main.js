const btnToggleStart = document.getElementById('btnToggleStart');
const wordpad = document.getElementById('wordpad');

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const speech = {
  recognition: undefined,
  isLive: false,
  parts: []
};

if (window.SpeechRecognition) {
  speech.recognition = new window.SpeechRecognition();
  speech.recognition.lang = 'en-US';
  speech.recognition.continuous = true;
  speech.recognition.interimResults = true;
};


const handleToggleStart = () => {
  if (speech.recognition !== undefined) {
    if (speech.isLive === false) {
      speech.recognition.start();
    } else {
      speech.recognition.stop();
    };
  };
};

const handleRecognitionStart = () => {
  speech.isLive = true;
  btnToggleStart.textContent = 'Stop';
};

const handleRecognitionStop = () => {
  speech.isLive = false;
  btnToggleStart.textContent = 'Start';
};

const handleRecognitionResult = (e) => {
  const idx = e.resultIndex;
  const transcript = e.results[idx][0].transcript;

  if (speech.parts[idx] === undefined) {
    const p = document.createElement('p');
    p.textContent = ' ' + transcript;

    speech.parts.push(p);
    wordpad.append(p);
  } else {
    speech.parts[idx].textContent = transcript;
  };

};

btnToggleStart.addEventListener('click', handleToggleStart);

speech.recognition.addEventListener('start', handleRecognitionStart);
speech.recognition.addEventListener('end', handleRecognitionStop);
speech.recognition.addEventListener('result', handleRecognitionResult);