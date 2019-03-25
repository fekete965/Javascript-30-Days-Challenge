(function () {
    "use strict";

    const controls = document.querySelectorAll('.controls input');

    const onHandleUpdate = (e) => {
        const value = e.target.value;
        const suffix = e.target.dataset.suffix || '';
        const name = e.target.name;
        
        document.documentElement.style.setProperty(`--${name}`, value + suffix);
    };

    controls.forEach((el) => el.addEventListener('change', onHandleUpdate));

}());