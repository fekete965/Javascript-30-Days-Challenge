(function () {
    "use strict";

    const handHour = document.querySelector('.hand--hour');
    const handMinute = document.querySelector('.hand--minute');
    const handSecond = document.querySelector('.hand--second');

    const date = new Date();
    let hourDegree = ((date.getHours() / 12) * 360 + 90);
    let minuteDegree = ((date.getMinutes() / 60) * 360 + 90)
    let secondDegree = ((date.getSeconds() / 60) * 360 + 90);

    handHour.style.transform = `translate(100%, -50%) rotate(${hourDegree}deg)`;
    handMinute.style.transform = `translate(50%, -50%) rotate(${minuteDegree}deg)`;
    handSecond.style.transform = `translate(12%, -50%) rotate(${secondDegree}deg)`;

    function setClock() {
        hourDegree +=  360 / (3600 * 12);
        minuteDegree += 360 / (60 * 60);
        secondDegree += 360 / 60;
        handHour.style.transform = `translate(100%, -50%) rotate(${hourDegree}deg)`;
        handMinute.style.transform = `translate(50%, -50%) rotate(${minuteDegree}deg)`;
        handSecond.style.transform = `translate(12%, -50%) rotate(${secondDegree}deg)`;
    };

    setInterval(setClock, 1000);
}());