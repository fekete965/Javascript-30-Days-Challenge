(function () {
    const player = document.getElementById('player');
    const playerSrc = document.getElementById('videoSource');
    const progressBar = document.getElementById('progressBar');
    const progressBarFill = document.getElementById('progressBarFill');
    const progressBarKnob = document.getElementById('progressBarKnob');
    const progressBarBuffer = document.getElementById('progressBarBuffer');
    const videoCurrentTime = document.getElementById('videoCurrentTime');
    const videoDuration = document.getElementById('videoDuration');
    const containerPrimaryActions = document.getElementById('containerPrimaryActions');
    const btnPlayPause = document.getElementById('btnPlayPause');
    const containerVolume = document.getElementById('containerVolume');
    const btnVolume = document.getElementById('btnVolume');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeSliderFill = document.getElementById('volumeSliderFill');
    const volumeSliderKnob = document.getElementById('volumeSliderKnob');
    const speedOptionSpans = document.querySelectorAll('#speedOptions > span');
    const btnSpeed = document.getElementById('btnSpeed');
    const btnSkipForward = document.getElementById('btnSkipForward');
    const btnSkipBackward = document.getElementById('btnSkipBackward');
    const btnFullscreen = document.getElementById('btnFullscreen');
    const overlay = document.getElementById('overlay');

    const state = {
        currentTime: 0,
        currentVolume: 0,
        isFullscreenOn: false,
        mouseEnter: false,
        mouseMove: undefined,
        prevVolume: 0,
        progressClicked: false,
        savedFrame: 0,
        speedOptionsClicked: false,
        startPlay: undefined,
        volumeClicked: false,
        wasPlayingBefore: false
    };

    const playbackRatedMap = {
        '3': 0.5,
        '2': 1,
        '1': 1.5,
        '0': 2,
    };

    // Player
    const handlePlayerMouseEnter = () => {
        state.mouseEnter = true;
    };
    
    const handlePlayerMouseLeave = () => {
        state.mouseEnter = false;
    };

    const handlePlayerMouseMouse = () => {
        player.classList.remove('hide');
        window.clearTimeout(state.mouseMove);
        state.mouseMove = window.setTimeout(() => {
            player.classList.toggle('hide', state.mouseMove !== undefined && state.isFullscreenOn === true);
            state.mouseMove = undefined;
        }, 600);
        updateProgressSlider();
    };

    player.addEventListener('mouseenter', handlePlayerMouseEnter);

    player.addEventListener('mouseleave', handlePlayerMouseLeave);

    player.addEventListener('mousemove', handlePlayerMouseMouse);

    // Window
    const handleMouseUp = (e) => {
        e.stopPropagation(); 
        
        state.volumeClicked = state.volumeClicked === true && false;
        if (state.progressClicked === true) {
            state.progressClicked = false;
            setCurrentTime();
        };

        if (state.wasPlayingBefore === true) {
            state.wasPlayingBefore = false;
            playerSrc.play();
        };
    };

    const handleMouseMove = (e) => {
        e.stopPropagation();
        
        if (state.mouseEnter === true) {
            if (state.progressClicked === true) {
                state.savedFrame = e.x;
                setProgressbar();
                updateProgressSlider();
            };

            if (state.volumeClicked === true) {
                setVolume(e.x);
            };
        };
    };

    const handleWindowMouseClick = (e) => {
        e.stopPropagation();
        
        if (state.speedOptionsClicked === true) {
            state.speedOptionsClicked = false;
            btnSpeed.classList.toggle('opened', state.speedOptionsClicked);
        };
    };

    window.addEventListener('mouseup', handleMouseUp);

    window.addEventListener('mousemove', handleMouseMove);

    window.addEventListener('selectstart', (e) => e.preventDefault());

    window.addEventListener('click', handleWindowMouseClick);


    // Progress Bar
    const setProgressbar = () => {
        const bounders = progressBar.getBoundingClientRect();
        const coordinate = state.savedFrame - bounders.x;
        state.currentTime = playerSrc.duration * (Math.max(Math.min((coordinate / bounders.width), 1), 0));
    };

    const setCurrentTime = () => {
        playerSrc.currentTime = state.currentTime;
    };

    const handleProgressMouseDown = (e) => {
        e.stopPropagation()

        state.progressClicked = true;
        state.savedFrame = e.x;
        
        if (playerSrc.paused === false) {
            state.wasPlayingBefore = true;
            playerSrc.pause();
        };
        
        setProgressbar();
    };

    const updateProgressSlider = () => {
        if (state.isFullscreenOn === false || state.mouseMove) {
            const barWidth = state.currentTime / playerSrc.duration;
            progressBarFill.style.transform = `scaleX(${barWidth})`;
            player.classList.toggle('over', playerSrc.ended === true);

            const bounders = progressBar.getBoundingClientRect();
            const knobX = bounders.width * barWidth;
            progressBarKnob.style.transform = `translateX(${knobX}px)`;

            changeTimestamp();

            if (playerSrc.paused === false ) {
                window.requestAnimationFrame(updateProgressSlider);
            } else {
                window.cancelAnimationFrame(updateProgressSlider);
            };
        };
    };

    const handleProgressSelectStart = (e) => {
        e.stopPropagation();
        e.preventDefault();
    };

    progressBar.addEventListener('mousedown', handleProgressMouseDown);

    progressBar.addEventListener('selectStart', handleProgressSelectStart);


    // Progress Bar Fill
    const handleOnTimeUpdate = () => {
        if (state.progressClicked === false) {
            state.currentTime = playerSrc.currentTime;
        };
        updateProgressSlider();
    };

    playerSrc.addEventListener('timeupdate', handleOnTimeUpdate);


    // Progress Bar Buffer
    const handleBufferProgress = () => {
        const duration = playerSrc.duration;
        const buffered = playerSrc.buffered;
        const bufferedLng = buffered.length;
        const seekable = playerSrc.seekable;

        if (duration > 0) {
            for (let i = 0; i < bufferedLng; i += 1) {
                const idx = bufferedLng - 1 - i;

                if (buffered.start(idx) >= seekable.start(0)) {
                    const bufferSize =  buffered.end(idx) / duration;
                    progressBarBuffer.style.transform = `scaleX(${bufferSize})`;
                };
            }; 
        };
    };

    const handleBufferCanPlayThrough = () => {
        progressBarBuffer.style.transform = `scaleX(1)`;
    };

    playerSrc.addEventListener('progress', handleBufferProgress);

    playerSrc.addEventListener('canplaythrough', handleBufferCanPlayThrough);


    // Timestamp
    const setVideoDuration = () => {
        const durationMin = (Math.floor(playerSrc.duration / 60)).toString();
        const durationSec = (Math.floor(playerSrc.duration % 60)).toString().padStart(2, '0');
        
        videoDuration.textContent = `${durationMin}:${durationSec}`;
    };

    const changeTimestamp = () => {
        const currentMin = (Math.floor(playerSrc.currentTime / 60)).toString();
        const currentSec = (Math.floor(playerSrc.currentTime % 60)).toString().padStart(2, '0');

        videoCurrentTime.textContent = `${currentMin}:${currentSec}`;
    };

    playerSrc.addEventListener('loadeddata', setVideoDuration);

    const toggleFullscreen = () => {
        if (state.isFullscreenOn === false) {
            if (player.requestFullscreen) {
                player.requestFullscreen();
            } else if (player.mozRequestFullScreen) {
                player.mozRequestFullScreen();
            } else if (player.webkitRequestFullscreen) {
                player.webkitRequestFullscreen();
            } else if (player.msRequestFullscreen) { 
                player.msRequestFullscreen();
            };
        } else if (state.isFullscreenOn === true) {
            if (document.exitFullscreen()) {
                document.exitFullscreen();
            } else if (document.mozRequestFullScreen) {
                document.mozexitFullscreen();
            } else if (document.webkitRequestFullscreen) {
                document.webkitexitFullscreen();
            } else if (document.msRequestFullscreen) { 
                document.msexitFullscreen();
            };
        };
    };
    
    // Button Fullscreen
    const handleFullscreen = () => {
        window.clearInterval(state.startPlay);
        state.startPlay = undefined;

        toggleFullscreen();
    };

    const handleFullScreenChange = (e) => {
        state.isFullscreenOn = !state.isFullscreenOn;
        playerSrc.classList.toggle('fullscreen', state.isFullscreenOn);
        btnFullscreen.classList.toggle('on', state.isFullscreenOn);
    };

    playerSrc.addEventListener('dblclick', handleFullscreen);

    btnFullscreen.addEventListener('click', handleFullscreen);

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    document.addEventListener('webkitfullscreenchange', handleFullScreenChange);

    document.addEventListener('mozfullscreenchange', handleFullScreenChange);

    document.addEventListener('MSFullscreenChange', handleFullScreenChange);


    // Button Play
    const handlePlayButtonOnClick = () => {
        if (playerSrc.paused === false) {
            playerSrc.pause();
        } else {
            playerSrc.play();
        };
        state.startPlay = undefined;
    };

    const handlePlayerSourceOnClick = (e) => {
        e.stopPropagation();

        if (state.startPlay === undefined) {
            state.startPlay = setTimeout(() =>{
                if (playerSrc.paused === false) {
                    playerSrc.pause();
                } else {
                    playerSrc.play();
                };
                state.startPlay = undefined;
            }, 300);
        };
    };

    const handleOnPlay = () => {
        player.classList.toggle('paused', playerSrc.paused);
        player.classList.toggle('playing', !playerSrc.paused);
        overlay.classList.add('animation-1');
        updateProgressSlider();
    }

    const handleOnPause = () => {
        player.classList.toggle('paused', playerSrc.paused);
        player.classList.toggle('playing', !playerSrc.paused);
        overlay.classList.add('animation-1');
        updateProgressSlider();
    };

    const handleOnEnded = () => {
        updateProgressSlider();
    };

    btnPlayPause.addEventListener('click', handlePlayButtonOnClick);
    
    playerSrc.addEventListener('click', handlePlayerSourceOnClick);

    playerSrc.addEventListener('play', handleOnPlay);

    playerSrc.addEventListener('pause', handleOnPause);

    playerSrc.addEventListener('ended', handleOnEnded);


    // Button Volume
    const handleVolumeClick = () => {
        
        if (playerSrc.volume === 0) {
            playerSrc.volume = Math.max(state.prevVolume, 0.3);
        } else {
            state.prevVolume = Math.max(playerSrc.volume, 0.3);
            playerSrc.volume = 0;
        };
    };

    const updateVolumeSlider = () => {        
        const knobX = volumeSlider.getBoundingClientRect().width * playerSrc.volume;

        volumeSliderFill.style.transform = `scaleX(${playerSrc.volume})`;
        volumeSliderKnob.style.transform = `translateX(${knobX}px)`;
        
        if (state.volumeClicked === true) {
            window.requestAnimationFrame(updateVolumeSlider);
        } else {
            window.cancelAnimationFrame(updateVolumeSlider);
        };
    };

    const handleVolumeMouseEnter = () => {
        containerVolume.classList.add('hover');
    };

    const handlePrimaryActionsMouseLeave = () => {
        containerVolume.classList.remove('hover');
    };

    const handleOnVolumeChange = () => {
        if (playerSrc.volume === 0) {
            playerSrc.muted = true;
        } else {
            playerSrc.muted = playerSrc.muted != false && false;
        };
        
        btnVolume.classList.toggle('muted', playerSrc.muted);
        updateVolumeSlider();
    };

    btnVolume.addEventListener('click', handleVolumeClick);

    btnVolume.addEventListener('mouseenter', handleVolumeMouseEnter);

    containerPrimaryActions.addEventListener('mouseleave', handlePrimaryActionsMouseLeave);

    playerSrc.addEventListener('volumechange', handleOnVolumeChange); 


    // Slider Volume
    const setVolume = (x) => {
        const bounders = volumeSlider.getBoundingClientRect();
        const width = bounders.width;
        const coordinates = x - bounders.x;
        playerSrc.volume = Math.min(Math.max(((coordinates / width)), 0), 1);
    };

    const handleVolumeMouseDown = (e) => {
        e.stopPropagation();
        
        state.volumeClicked = true;
        setVolume(e.x);
    };

    volumeSlider.addEventListener('mousedown', handleVolumeMouseDown); 


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


    // Button Speed
    const handlSpeedOnClick = (e) => {
        e.stopPropagation();

        state.speedOptionsClicked = !state.speedOptionsClicked;
        btnSpeed.classList.toggle('opened');
    };

    btnSpeed.addEventListener('click', handlSpeedOnClick);


    // Speed Options
    const handleSpeedOptionOnClick = (index) => (e) => {
        e.stopPropagation();

        speedOptionSpans.forEach((span, i) => {
            if (i === index) {
                playerSrc.playbackRate = playbackRatedMap[index];
                span.classList.add('selected');
            } else {
                span.classList.remove('selected');
            };
        });
    };

    speedOptionSpans.forEach((span, index) => {
        span.addEventListener('click', handleSpeedOptionOnClick(index));
    });


    // Overlay
    const handleAnimationEnd = () => {
        overlay.classList.remove('animation-1');
    };

    const handleWaiting = () => {
        player.classList.add('loading');
        overlay.classList.add('animation-2');
    };
    
    const handleCanPlay = () => {
        player.classList.remove('loading');
        overlay.classList.remove('animation-2');
    };

    overlay.addEventListener('animationend', handleAnimationEnd);

    playerSrc.addEventListener('waiting', handleWaiting);

    playerSrc.addEventListener('canplay', handleCanPlay);
}());