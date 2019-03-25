(function () {
    "use strict";

    const panels = document.querySelectorAll('div.panel');

    const handleOnClick = (e) => {
        e.target.classList.toggle('active');
        panels.forEach((el) => {
            if (e.target !== el) {
                el.classList.remove('active');
            };
        });
    };

    panels.forEach((el) => el.addEventListener('click', handleOnClick));
}());