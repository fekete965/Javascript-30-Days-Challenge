(function() {
    const player = document.getElementById('player');
    const playerSrc = document.getElementById('videoSource');
    const progressBar = document.getElementById('progressBar');
    const progressBarFill = document.getElementById('progressBarFill');
    const btnPlayPause = document.getElementById('btnPlayPause');
    const btnVolume = document.getElementById('btnVolume');
    const volume = document.getElementById('sliderVolume');
    const speed = document.getElementById('sliderSpeed');
    const btnSkipForward = document.getElementById('btnSkipForward');
    const btnSkipBackward = document.getElementById('btnSkipBackward');
    const btnFullscreen = document.getElementById('btnFullscreen');

    const state = {
        isFullscreenOn: false,
        progressClicked: false,
        currentVolume: 0,
        prevVolume: 0,
    };

    // Player
    const handlePlayerMouseEnter = () => {
        player.classList.add('hover');
    };
    
    const handlePlayerMouseLeave = () => {
        player.classList.remove('hover');
    };

    player.addEventListener('mouseenter', handlePlayerMouseEnter);

    player.addEventListener('mouseleave', handlePlayerMouseLeave);

    // Window - prevent selecting player components
    window.addEventListener('selectstart', (e) => e.preventDefault());

    // Progress Bar
    const setCurrentTime = (x) => {
        const margin = 18;
        const progressBarX = progressBar.getBoundingClientRect().x;
        playerSrc.currentTime = playerSrc.duration * (x / progressBar.clientWidth) - (progressBarX - margin);
    };

    const handleProgressMouseDown = (e) => {
        state.progressClicked = true;
        setCurrentTime(e.x);
    };

    const handleProgressMouseUp = () => {
        state.progressClicked = false;
        state.mouseX = 0;
    };

    const handleProgressMouseMove = (e) => {
        if (state.progressClicked === true) {
            setCurrentTime(e.x);
        };
    };

    const changeProgressWidth = () => {
        const width = (playerSrc.currentTime / playerSrc.duration * 100).toFixed(2);
        progressBarFill.style.width = `${width}%`;
        btnPlayPause.classList.toggle('over', width >= 99);
        window.requestAnimationFrame(changeProgressWidth);
    };

    progressBar.addEventListener('mousedown', handleProgressMouseDown);

    progressBar.addEventListener('selectStart', (e) => { e.preventDefault()});

    window.addEventListener('mouseup', handleProgressMouseUp);

    window.addEventListener('mousemove', handleProgressMouseMove);

    // Progress Bar Fill
    playerSrc.ontimeupdate = () => {
        window.requestAnimationFrame(changeProgressWidth);
    };

    // Button Fullscreen
    const handleFullscreen = () => {
        state.isFullscreenOn = !state.isFullscreenOn;
        if (playerSrc.requestFullscreen) {
            playerSrc.requestFullscreen();
        } else if (playerSrc.mozRequestFullScreen) {
            playerSrc.mozRequestFullScreen();
        } else if (playerSrc.webkitRequestFullscreen) {
            playerSrc.webkitRequestFullscreen();
        } else if (playerSrc.msRequestFullscreen) { 
            playerSrc.msRequestFullscreen();
        };

        btnFullscreen.classList.toggle('on', !state.isFullscreenOn);
    };

    playerSrc.addEventListener('dblclick', () => {
        state.isFullscreenOn = !state.isFullscreenOn;
    });

    btnFullscreen.addEventListener('click', handleFullscreen);

    // Button Play
    const handlePlayButton = () => {
        if (playerSrc.paused === false) {
            playerSrc.pause();
        } else {
            playerSrc.play();
        };
    };
    
    btnPlayPause.addEventListener('click', handlePlayButton);
    
    playerSrc.onplay = () => {
        btnPlayPause.classList.toggle('over', playerSrc.ended);
        btnPlayPause.classList.toggle('paused', playerSrc.paused);
    };

    playerSrc.onpause = () => {
        btnPlayPause.classList.toggle('paused', playerSrc.paused);
    };

    playerSrc.onended = () => {
        btnPlayPause.classList.toggle('over', playerSrc.ended);
    };

    // Button Volume
    const handleVolumeClick = () => {
        playerSrc.muted = !playerSrc.muted;

        if (playerSrc.volume === 0) {
            playerSrc.volume = state.prevVolume;
        };
    };

    btnVolume.addEventListener('click', handleVolumeClick);

    playerSrc.onvolumechange = () => {
        state.prevVolume = playerSrc.volume > 0 ? playerSrc.volume : .3;

        if (playerSrc.volume === 0) {
            playerSrc.muted = true;
        };

        btnVolume.classList.toggle('muted', player.muted);
    };

    // Button Skip Forward
    const handleSkipForward = () => {
        if (playerSrc.currentTime < playerSrc.duration) {
            playerSrc.currentTime = playerSrc.currentTime + 30;
        };
    };

    btnSkipForward.addEventListener('click', handleSkipForward);

    // Button Skip Backward
    const handleSkipBackward = () => {
        if (playerSrc.currentTime !== 0) {
            playerSrc.currentTime = playerSrc.currentTime - 10;
        };
    };

    btnSkipBackward.addEventListener('click', handleSkipBackward);

    // Slider Volume
    const handleSliderVolumeChange = (e) => {
        // player.volume = e.target.value;
    };

    // volume.addEventListener('change', handleSliderVolumeChange); 

    // Slider Speed
    const handlSpeedChange = (e) => {
        playerSrc.playbackRate  = e.target.value;
    };

    // speed.addEventListener('change', handlSpeedChange); 
}());