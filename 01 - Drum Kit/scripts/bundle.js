(function () {
    "use strict";

    const audioElements = document.querySelectorAll('audio');
    const spanElements = document.querySelectorAll('span');
    const nodeContainer = {};

    for (let i = 0; i < audioElements.length; i += 1) {
        const audioNode = audioElements[i];
        const spanNode = spanElements[i];
        const nodeValue = audioNode.attributes['data-key'].nodeValue;

        nodeContainer[nodeValue] = {
            audioNode,
            spanNode
        };
    };

    const handleKeyDownEvent = (e) => {
        if (nodeContainer[e.keyCode] !== undefined) {
            const audioNode = nodeContainer[e.keyCode].audioNode;
            const spanNode = nodeContainer[e.keyCode].spanNode;
            audioNode.currentTime = 0;
            const playPromise = audioNode.play();
            
            if (playPromise !== undefined) {
                playPromise.then((res) => {
                    spanNode.classList.add('playing');
                }).catch((error) => {
                    console.error(error);
                    alert('Something went wrong, check the console for further information.');
                });
            };
        };
    };

    const handleKeyUpEvent = (e) => {
        if (nodeContainer[e.keyCode] !== undefined) {
            const spanNode = nodeContainer[e.keyCode].spanNode;
            spanNode.classList.remove('playing');
        };
    };

    window.addEventListener('keydown', handleKeyDownEvent);
    window.addEventListener('keyup', handleKeyUpEvent);
}());