(function() {
    // Solution 1
    const videos = document.querySelectorAll('.videos > li');
    const videosArr = Array.prototype.slice.call(videos);
    const videoLengths = videosArr.map((videos) => videos.dataset.time);

    const convertTime = (string) => {
        const nums = string.split(':');
        
        return {
            hours: (parseInt(nums[0]) / 60),
            minutes: parseInt(nums[0]),
            seconds: 60 + parseInt(nums[1]),
            totalSeconds: parseInt(nums[0]) * 60 + parseInt(nums[1])            
        };
    };

    const totalTime = videoLengths.reduce((accumulator, next) => {
        const time = convertTime(next);
        
        accumulator.hours += time.hours;
        accumulator.minutes += time.minutes;
        accumulator.seconds += time.seconds;
        accumulator.totalSeconds += time.totalSeconds;

        return accumulator;
    }, {
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalSeconds: 0
    });

    console.log(totalTime);


    // Solution 2
    // const timeNodes = Array.from(document.querySelectorAll('[data-time]'));

    // const seconds = timeNodes
    //     .map((node => node.dataset.time))
    //     .map(timeCode => {
    //         const [mins, secs] = timeCode.split(':').map(parseFloat);
    //         return (mins * 60) + secs;
    //     })
    //     .reduce((total, vidSeconds) => total + vidSeconds);

    // let secondsLeft = seconds;
    // const hours = Math.floor(secondsLeft / 3600);
    // secondsLeft = secondsLeft % 3600;

    // const mins = Math.floor(secondsLeft / 60);
    // secondsLeft = secondsLeft % 60;
}());