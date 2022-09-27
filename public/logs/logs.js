const timeSortElement = document.getElementById('sortByTime');
const moodSortElement = document.getElementById('sortByMood');

const displayData = (data) => {
  // console.log({ data });
  const dataContainerElement = document.getElementById('dataContainer');
  dataContainerElement.innerHTML = '';
  if (data.length === 0) {
    dataContainerElement.innerHTML = `<p>There is no data available!</p>`;
  }
  data.forEach((eachData) => {
    const root = document.createElement('p');
    root.classList.add('root-data');
    const geo = document.createElement('div');
    geo.classList.add('geo-data');
    const date = document.createElement('div');
    date.classList.add('date');
    const image = document.createElement('img');
    image.classList.add('img');
    const moodDisplayElement = document.createElement('p');

    geo.textContent = `Latitude: ${eachData.lat}°, Longitude: ${eachData.lng}°`;
    //   const dateString = new Date(eachData.timestamp).toLocalString();
    const dateString = new Date(eachData.timestamp);
    date.textContent = `Date-Time: ${dateString}`;
    moodDisplayElement.textContent = `Mood: ${eachData.moodText}`;
    image.src = eachData.imageBase64;
    image.alt = 'some picture';

    root.append(geo, date, moodDisplayElement, image);
    dataContainerElement.append(root);
  });
};

const sortDataByTime = async () => {
  let data = await getAllData();
  const sortedByTimeData = data.sort((a, b) => a.timestamp - b.timestamp);
  displayData(sortedByTimeData);
};

const sortDataByMood = async () => {
  let data = await getAllData();
  const sortedByMoodData = data.sort((a, b) => {
    const m1 = a['moodText'].toLowerCase();
    const m2 = b['moodText'].toLowerCase();
    if (m1 > m2) {
      return 1;
    }
    if (m1 < m2) {
      return -1;
    }
    return 0;
  });
  displayData(sortedByMoodData);
};

const getAllData = async () => {
  const response = await fetch('/getAll');
  const data = await response.json();
  return data;
};

timeSortElement.addEventListener('click', sortDataByTime);
moodSortElement.addEventListener('click', sortDataByMood);

getAllData()
  .then((data) => {
    displayData(data);
  })
  .catch((e) => console.log(e));
