// const getMyLocation = require('geoLocationAPI.js');

const map = L.map('locationMap').setView([0, 0], 1);

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const attribution =
  '&copy; <a href="https://www.openstreatmap.org/copyright">Open Street Map</a>';

const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);

const myIcon = L.icon({
  iconUrl:
    'https://res.cloudinary.com/do4v7miwh/image/upload/v1663930505/samples/people/man_icon_r0yify.jpg',
  iconSize: [50, 32],
  iconAnchor: [25, 16],
});

let marker = L.marker([0, 0], { icon: myIcon }).addTo(map);

getMyLocation();
