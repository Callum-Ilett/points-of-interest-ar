const getLocation = () =>
  new Promise((resolve, reject) => {
    window.navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        resolve([latitude.toFixed(2), longitude.toFixed(2)]);
      },
      (err) => reject(err),

      { enableHighAccuracy: true, maximumAge: 5000 }
    );
  });

const setCurrentLocation = (latitude, longitude) => {
  const currentLocation = document.querySelector(".current-location");
  currentLocation.innerText = `latitude: ${latitude}, longitude:   ${longitude}`;
};

export { getLocation, setCurrentLocation };
