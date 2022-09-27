const moodInputElement = document.getElementById('mood');
let moodText = '';
moodInputElement.addEventListener('change', (e) => {
  console.log({ e });
  moodText = e.target.value;
});

// p5.js
function setup() {
  noCanvas();
  const video = createCapture(VIDEO);
  video.size(400, 400);

  /* Geolocation API*/
  let lat = null;
  let lng = null;
  const latElement = document.getElementById('lat');
  const lngElement = document.getElementById('lng');
  const locationBtn = document.getElementById('locationBtn');
  const timeElement = document.getElementById('timestamp');
  const getMyLocation = () => {
    if ('geolocation' in navigator) {
      console.log('Geo location is available!');
      navigator.geolocation.getCurrentPosition(async (position) => {
        // console.log(position.coords.latitude);
        // console.log(position.coords.longitude);
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        video.loadPixels();
        const imageBase64 = video.canvas.toDataURL();
        const data = { lat, lng, moodText, imageBase64 };
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        };
        const response = await fetch('/send_location', options);
        const jsonResponse = await response.json();
        latElement.textContent = jsonResponse.lat;
        lngElement.textContent = jsonResponse.lng;
        timeElement.textContent = new Date(jsonResponse.timestamp);
      });
    } else {
      console.log('Geo location is not available!');
    }
  };

  locationBtn.addEventListener('click', () => {
    getMyLocation();
  });
}
