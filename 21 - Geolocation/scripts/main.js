(function () {
  const info = document.getElementById('info');
  const firstLong = document.getElementById('firstLong');
  const firstLat = document.getElementById('firstLat');
  const currentLong = document.getElementById('currentLong');
  const currentLat = document.getElementById('currentLat');
  const speedValue = document.getElementById('speedValue');
  const compassHousing = document.getElementById('compassHousing');
  const btnToggleWatch = document.getElementById('toggleWatch');

  const locationState = {
    coords: {
      longitude: undefined,
      latitude: undefined,
      speed: 0,
      heading: 0
    },
    isWatching: false,
    watchId: undefined
  };

  const watchPosition = {
    enableHighAccuracy: true
  };


  const handleSuccess = (position) => {
    const long = position.coords.longitude;
    const lat = position.coords.latitude;

    firstLong.innerText = long;
    firstLat.innerText = lat;
  };

  const handleError = (error) => {
    info.innerHTML = `Error: ${error.message}<br>Please refresh the page.`;
  };

  if (navigator.geolocation === false) {
    firstLocation.textContent = `Geolocation is not supported by your browser.`;
  } else {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  };

  const handleWatchSuccess = (position) => {
    const long = position.coords.longitude;
    const lat = position.coords.latitude;
    const speed = position.coords.speed;
    const heading = isNaN(position.coords.heading) || position.coords.heading === null ? 0 : position.coords.heading;

    // Saving information for further caluclations (if there is any)
    locationState.coords.longitude = long;
    locationState.coords.latitude = lat;
    locationState.coords.speed = speed;
    locationState.coords.heading = heading;
    
    currentLong.innerText = long;
    currentLat.innerText = lat;

    speedValue.textContent = speed === null ? 0 : speed;
    compassHousing.style.transform = `rotate(${heading}deg)`;
  };

  const toggleWatch = () => {
    if (locationState.isWatching === false) {
      btnToggleWatch.textContent = 'Stop Watch';
      locationState.watchId = navigator.geolocation.watchPosition(handleWatchSuccess, handleError, watchPosition);
    } else {
      btnToggleWatch.textContent = 'Start Watch';
      navigator.geolocation.clearWatch(locationState.watchId);
    };
    
    locationState.isWatching = !locationState.isWatching;
  };

  btnToggleWatch.addEventListener('click',toggleWatch);


  //-----------------------------------------------//
  // If you wanna calculate the speed by yourself: //
  //-----------------------------------------------//

  // Haversine formula:
    // Formula:	a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
    // c = 2 ⋅ atan2( √a, √(1−a) )
    // d = R ⋅ c
    // where	φ is latitude, λ is longitude, R is earth’s radius (mean radius = 6,371km);
    // note that angles need to be in radians to pass to trig functions!

  // Calculating distance using Haversine formula //
  //----------------------------------------------//

  /*
    const toRadians = (degree) => (Math.PI / 180) * degree;

    const calculateDistance = () => {
      const { prevLat, prevLong, currentLat, currentLong } = locationState;
      // Earth's radius
      const R = 6371e3;
      // Change degree in radian
      const lat1 = toRadians(prevLat);
      const lat2 = toRadians(currentLat);
      // Calculate difference
      const latDif = toRadians(lat2 - lat1);
      const longDif = toRadians(currentLong - prevLong);

      // 'A' is the square of half the chord length between the points
      const A = Math.pow(Math.sin(latDif / 2), 2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.pow(Math.sin(longDif / 2 ), 2);
      // 'C' is the angular distance in radians
      const C = 2 * Math.atan2(Math.sqrt(A), Math.sqrt( 1 - A));
      // Distance
      const D = R * C;

      return D;
    };
  */

  // You will need to save the last position to calculate the speed //
  //----------------------------------------------------------------//
  /*
    const locationState = {
      currentLong: undefined,
      currentLat: undefined,
      currentTimestamp: undefined,
      isWatching: false,
      prevLat: undefined,
      prevLat: undefined,
      prevTimestamp: undefined,
      watchId: undefined
    };
  */

  /*
    const handleWatchSuccess = (position) => {
      const long = position.coords.longitude;
      const lat = position.coords.latitude;
      const speed = position.coords.speed;
      const timestamp = position.timestamp

      locationState.currentTimestamp = timestamp;
      locationState.currentLong = long;
      locationState.currentLat = lat;
      
      locationState.prevTimestamp = locationState.currentTimestamp;
      locationState.prevLong = locationState.currentLong;
      locationState.prevLat = locationState.currentLat;
      
      currentLong.innerText = long;
      currentLat.innerText = lat;

      const distance = calculateDistance();
      const time = locationState.currentTimestamp - locationState.prevTimestamp;

      speedValue.textContent = time === 0 ? 0 : distance / time;
    };
  */
}());