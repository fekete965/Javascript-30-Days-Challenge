(function() {
  const messageDiv = document.getElementById('message');
  const newCodeDiv = document.getElementById('newCode');
  const btnResetCode = document.getElementById('resetCode');
  const btnCreateCode = document.getElementById('createCode');

  // State
  const state = {
    code: {
      default: ['Up', 'Down', 'Left', 'Right'],
      live: [],
      input: []
    },
    domElements: {
      p: undefined,
      span: undefined,
    },
    isRecording: false,
    timeout: undefined
  };

  // state.live = [].concat(state.default);
  // state.live = state.default.concat();
  // state.live = state.default.slice(0);
  state.code.live = [...state.code.default];
  
  // Creators
  const createTextContent = () => {
    if (state.code.live.length > 0) {
      let textContent = '';

      state.code.live.forEach((key, index) => {
        textContent += `${key}`;

        if (index !== state.code.live.length - 1) {
          textContent += ', ';
        };
      });

      return textContent;
    };

    return '';
  };

  const createNewCodeElement = () => {
    if (state.pElement === undefined) {
      const h3 = document.createElement('h3');
      h3.textContent =  'Your Code';

      state.domElements.p = document.createElement('p');
      state.domElements.p.textContent = 'Press: ';
      
      state.domElements.span = document.createElement('span');
      state.domElements.span.textContent = createTextContent();

      state.domElements.p.appendChild(state.domElements.span);

      newCodeDiv.appendChild(h3);
      newCodeDiv.appendChild(state.domElements.p);
    } else {
      state.domElements.span.textContent = createTextContent();
    };
  };

  const createMessageElement = (message) => {
    const p = document.createElement('p');
    p.textContent = message;

    messageDiv.appendChild(p);
  };

  // Logic
  const translateKey = (keyIn) => {
    const regex = new RegExp('Arrow', 'g');
    const keyOut = keyIn.replace(regex, '');

    if (keyOut === ' ') {
      return 'Space';
    };

    if (keyOut.length === 1) {
      return keyOut.toUpperCase();
    };

    return keyOut;
  };

  const checkCode = () => {
    const { input, live } = state.code;
    let result = true;

    if (input.length !== live.length) {
      result = false;
    };
    
    if (input.length === live.length) {
      let i = 0;

      for (i; i < input.length; i += 1) {
        if (input[i] !== live[i]) {
          result = false;
          break;
        };
      };
    };
    return result;
  };


  // Event Listeners
  const handleOnKeyUp = (e) => {
    if (e.key !== 'F5') {
      if (state.timeout !== undefined) {
        clearTimeout(state.timeout);
      };

      const key = translateKey(e.key);
      state.code.input.push(key);

      if (state.isRecording === false) {
        state.timeout = setTimeout(() => {
          const message = checkCode() === true ? 'Well done, you did it!!!' :'Wrong combination';

          createMessageElement(message);

          state.code.input = [];
        }, 750);
      };
    };
  };

  const handleResetOnClick = () => {
    state.code.live = [...state.code.default];

    state.domElements.p.remove();
    state.domElements.p = undefined;
  };

  const handleCreateOnClick = () => {
    if (state.isRecording === false) {
      state.isRecording = true;

      btnCreateCode.textContent = 'Stop Recording';
    } else {
      state.isRecording = false;
      btnCreateCode.textContent = 'Create New Code';

      if (state.code.input.length !== 0) {
        state.code.live = state.code.input;
        state.code.input = [];
        
        createNewCodeElement();
      };
    };
  };

  window.addEventListener('keyup', handleOnKeyUp);

  btnResetCode.addEventListener('click', handleResetOnClick);

  btnCreateCode.addEventListener('click', handleCreateOnClick);
}());