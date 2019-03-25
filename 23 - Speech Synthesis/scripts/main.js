(function() {
  const inputVoices = document.getElementById('inputVoices');
  const inputRate = document.getElementById('inputRate');
  const inputPitch = document.getElementById('inputPitch');
  const inputText = document.getElementById('inputText');
  const speakButton = document.getElementById('speak');
  const stopButton = document.getElementById('stop');

  const synth = window.speechSynthesis;
  const msg = new SpeechSynthesisUtterance(); 

  let voices = [];
  let isSpeaking = false;

  // Functions
  const toggle = (startOver = false) => {
    synth.cancel();

    if (startOver === true) {
      synth.speak(msg);
    };
  };

  const setText = () => {
    text = inputText.value;

    if (text.trim() !== '') {
      msg.text = text;
    };
  };

  // Event Handlers
  const handleVoiceChange = (e) => {
    const id = e.target.value;
    msg.voice = voices[id];

    toggle(isSpeaking);
  };

  const handleRateChange = (e) => {
    msg.rate = e.target.value;
  };

  const handlePitchChange = (e) => {
    msg.pitch = e.target.value;
  };

  const handleOnClickSpeak = () => {
    setText();
    synth.speak(msg);
  };

  const handleOnClickStop = () => {
    synth.cancel();
  };

  const handleOnStart = () => {
    isSpeaking = true;
    speakButton.disabled = true;
  };

  const handleOnEnd = () => {
    isSpeaking = false;
    speakButton.disabled = false;
  };

  const handleSynthVoicesChanged = () => {
    voices = synth.getVoices();

    inputVoices.innerHTML = '';
    voices.forEach((voice, index) => {
      const option = document.createElement('option');
      option.textContent = `${voice.name} ${voice.lang}`;
      option.value = index;
      option.selected = index === 0;
      msg.voice = index === 0 ? voice : undefined;

      inputVoices.appendChild(option);
    });

    setText();
  };

  const handleWindowUnload = () => {
    synth.cancel();
  };

  // Event Listeners
  // Inputs
  inputVoices.addEventListener('change', handleVoiceChange);
  inputRate.addEventListener('change', handleRateChange);
  inputPitch.addEventListener('change', handlePitchChange);
  // Buttons
  speakButton.addEventListener('click', handleOnClickSpeak);
  stopButton.addEventListener('click', handleOnClickStop);
  // Speech Synthesis Utterance
  msg.addEventListener('start', handleOnStart);
  msg.addEventListener('end', handleOnEnd);
  // Speech Synthesis
  synth.addEventListener('voiceschanged', handleSynthVoicesChanged);
  // Window
  window.addEventListener('unload', handleWindowUnload);
}());