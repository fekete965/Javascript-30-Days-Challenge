(function() {
    const btnOptions = document.querySelectorAll('button.button--timer');
    const btnStop = document.getElementById('buttonStop');

    const customForm = document.getElementById('customForm');
    const customInput = document.getElementById('customInput');

    const timeLeft = document.getElementById('timeLeft');
    const timeEnd = document.getElementById('timeEnd');

    const timer = {
        currentTime: 0,
        end: 0,
        interval: undefined,
        secondsLeft: 0
    };

    // Functions
    const resetTimer = () => {
        clearInterval(timer.interval);

        timer.currentTime = 0;
        timer.end = 0;
        timer.secondsLeft = 0;

        resetVisualTimer();
    };

    const resetVisualTimer = () => {
        btnStop.disabled = true;
        timeLeft.textContent = '';
        timeEnd.textContent = '';
    };

    const showTimer = () => {
        const tempMin = parseInt(timer.secondsLeft / 60, 10);
        const calcMin = parseInt(tempMin / 60, 10);

        const time = {
            sec: (Math.round(timer.secondsLeft % 60, 10)).toString().padStart(2, '0'),
            min: tempMin.toString().padStart(2, '0'),
            hour: '00'
        };

        if (calcMin / 60 > 0) {
            time.min = (tempMin % 60).toString().padStart(2, '0');
            time.hour = parseInt((tempMin / 60), 10).toString().padStart(2, '0');
        };

        const { hour, min, sec } = time;
        timeLeft.textContent = `${hour}:${min}:${sec}`;
    };


    const checkTimerEnd = () => {
        if (timer.secondsLeft === 0) {
            clearInterval(timer.interval);
            timeLeft.textContent = "IT'S TIME!";
        };
    };

    const startTimer = (seconds) => {
        resetTimer();

        btnStop.disabled = false; 

        const currentTime = new Date().getTime();
        
        timer.secondsLeft = seconds;
        timer.currentTime = currentTime;
        timer.end = currentTime + seconds * 1000;

        const tempDate = new Date(timer.end);

        const min = tempDate.getMinutes().toString().padStart(2, '0');
        const hour = tempDate.getHours().toString().padStart(2, '0');

        timeEnd.textContent = `Be back at: ${hour}:${min}`;
        
        showTimer();
        timer.interval = setInterval(() => {
            timer.secondsLeft -= 1;

            showTimer();
            checkTimerEnd();
        }, 1000);
    };

    // Event Handler
    const handleCustomFormSubmit = (e) => {
        e.preventDefault();

        if (customInput.value.length > 0) {
            const value = parseFloat(customInput.value * 60);

            startTimer(value);

            customForm.reset();
        };
    };

    const handleCustomInputChange = (e) => {
        e.target.value = e.target.value.replace(/[^\d.-]/g, '');
    };

    const handleOptionsClick = (e) => {
        startTimer(e.target.dataset['time']);
    };

    const handleStopClick = (e) => {
        resetTimer();
    };

    // Event Listeners
    customForm.addEventListener('submit', handleCustomFormSubmit);

    customInput.addEventListener('input', handleCustomInputChange);

    btnStop.addEventListener('click', handleStopClick);

    btnOptions.forEach((button) => {
        button.addEventListener('click', handleOptionsClick);
    });
}());