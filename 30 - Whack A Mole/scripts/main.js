(function() {
  const wrapper = document.getElementById('wrapper');
  const holes = document.querySelectorAll('.hole');
  const moles = document.querySelectorAll('.mole');
  const scoreBoard = document.getElementById('scoreBoard');
  const btnToggleStart = document.getElementById('btnToggleStart');
  const btnHighscore = document.getElementById('btnHighscore');

  const game = {
    highscore: [],
    score: 0,
    started: false,
    time: {
      interval: undefined,
      left: 5,
    },
  };

  // Local storage
  const retrieveData = () => {
    const data = localStorage.getItem('highscore');

    try {
      game.highscore = data ? JSON.parse(data) : [];
    } catch {
      game.highscore = [];
    };
  };

  const saveData = () => {
    localStorage.setItem('highscore', JSON.stringify(game.highscore));
  };

  const resetHighscore = () => {
    game.highscore = [];
    localStorage.clear();
  };

  const createHighscore = (name) => {
    const newScore = {
      name,
      score: game.score
    };

    game.highscore.push(newScore);
    game.highscore.sort((a, b) => b.score - a.score);

    if (game.highscore.length > 10) {
      game.splice(11);
    };

    saveData();
  };


  // Hud
  const buttonHandler = ({ start, score }) => {
    btnToggleStart.disabled = start !== undefined ? start : btnToggleStart.disabled;
    btnHighscore.disabled = score !== undefined ? start : btnHighscore.disabled;
  };

  const updateScoreHud = () => {
    scoreBoard.textContent = game.score;
  };

  const showHighscore = () => {
    const div = document.createElement('div');
    div.className = 'window'

    const header = document.createElement('h3');
    header.textContent = 'Highscore';

    const list = document.createElement('ul');

    if (game.highscore.length === 0) {
      list.textContent = 'No highscore to show.';
      list.style.fontWeight = 'bold';
    } else {
      game.highscore.forEach((player) => {
        const li = document.createElement('li');
        li.textContent = `${player.name}: ${player.score}`;

        list.appendChild(li);
      });
    };

    const actions = document.createElement('div');
    actions.className = 'container container--actions';

    const btnClose = document.createElement('button');
    btnClose.className = 'button';
    btnClose.textContent = 'Close';
    btnClose.addEventListener('click', () => {
      buttonHandler({ score: false, start: false });
      div.remove();
    });

    const btnReset = document.createElement('button');
    btnReset.className = 'button button--reset';
    btnReset.textContent = 'Reset';
    btnReset.addEventListener('click', resetHighscore);

    actions.appendChild(btnReset);
    actions.appendChild(btnClose);

    div.appendChild(header);
    div.appendChild(list);
    div.appendChild(actions);

    wrapper.appendChild(div);
  };

  const showGameOver = () => {
    const div = document.createElement('div');
    div.className = 'window';

    const header = document.createElement('h3');
    header.textContent = 'Game Over';

    const message = document.createElement('h2');
    message.textContent = 'Your score is : ' + game.score;

    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 10
    input.placeholder = 'Enter your name...';
    input.className = 'input';

    const actions = document.createElement('div');
    actions.className = 'container container--actions';

    const btnClose = document.createElement('button');
    btnClose.className = 'button';
    btnClose.textContent = 'Close';
    btnClose.addEventListener('click', () => {
      buttonHandler({ score: false, start: false });
      div.remove();
    });

    const btnSubmit = document.createElement('button');
    btnSubmit.className = 'button button--submit';
    btnSubmit.textContent = 'Submit';
    btnSubmit.addEventListener('click', () => {
      const name = input.value.trim('').length === 0 ? 'Unknown' : input.value.substring(0, 10);

      createHighscore(name);
      div.remove();
      showHighscore();
    });

    actions.appendChild(btnSubmit);
    actions.appendChild(btnClose);

    div.appendChild(header);
    div.appendChild(message);
    div.appendChild(input);
    div.appendChild(actions);

    wrapper.appendChild(div);
  };


  // Mole Controller
  const moleController = (spec) => {
    let { holes, moles, clickCallback } = spec;
    let clicked = false;
    let timeout = undefined;
    let lastMole = undefined;

    const showMole = (id) => {
      lastMole = id;
      holes[id].classList.add('up')
    };

    const hideMole = () => {
      if (lastMole !== undefined) {
        holes[lastMole].classList.remove('up')
      };
    };
    
    const spawnMoles = () => {
      if (game.started === true) {
        const id = Math.floor(Math.random() * moles.length);
        const ms = Math.max(Math.floor((Math.random() * 800)), 400);

        showMole(id);
        setTimeout(() => {
          hideMole();
          spawnMoles();
        }, ms);
      };
    };

    const handleOnClickMole = (id) => () => {
      if (clicked === false) {
        clicked = true;
        
        clickCallback();
        timeout = setTimeout(() => { clicked = false }, 500);
      };
    };

    moles.forEach((mole, id) => {
      mole.addEventListener('click', handleOnClickMole(id));
    });

    return Object.freeze({
      hideMole,
      showMole,
      spawnMoles
    });
  };


  // Game Functions
  const gameinterval = () => {
    game.time.left -= 1;

    if (game.time.left === 0) {
      buttonHandler({ score: true, start: true });
      stopGame();
      showGameOver();
    };
  };

  const startGame = () => {
    game.score = 0;
    game.started = true;
    btnToggleStart.textContent = 'Stop';

    game.time.interval = setInterval(gameinterval, 1000);

    controller.spawnMoles();
    updateScoreHud();
  };

  const stopGame = () => {
    game.started = false;
    btnToggleStart.textContent = 'Start';

    clearInterval(game.time.interval);
  };


  // Event Handlers
  const handleOnClickToggleStart = () => {
    if (game.started === false) {
      buttonHandler({ score: true });
      startGame();
    } else {
      buttonHandler({ score: false, start: false });
      stopGame();
    };
  };

  const handleOnClickHighscore = () => {
    if (game.started === true) {
      stopGame();
    };

    buttonHandler({ score: false, start: false });
    showHighscore();
  };

  const handleStorage = (e) => {
    if (e.key === 'highscore') {
      retrieveData();
    };
  };


  // Event Listeners
  btnToggleStart.addEventListener('click', handleOnClickToggleStart);
  btnHighscore.addEventListener('click', handleOnClickHighscore);

  window.addEventListener('storage', handleStorage);


  // Init Game
  retrieveData();

  const clickCallback = () => {
    game.score += 1;
    updateScoreHud();
  };
  const spec = { holes, moles, clickCallback };
  const controller = moleController(spec);
}());