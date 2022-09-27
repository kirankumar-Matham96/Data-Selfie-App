const getCoordinates = (position) => {
  console.log(position.coords.latitude, position.coords.longitude);
};

const getMyLocation = async () => {
  if ('geolocation' in navigator) {
    console.log('geolocation is available');
    navigator.geolocation.getCurrentPosition(getCoordinates);
  } else {
    console.log('geolocation IS NOT available');
  }
};
