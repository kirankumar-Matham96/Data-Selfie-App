const express = require('express');
const Database = require('nedb');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT;

app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Database('location.db');
database.loadDatabase();

app.listen(PORT, () => {
  console.log(`Server is running at port number: ${PORT}`);
});

app.get('/', (req, res) => {
  res.json('Hello');
});

app.post('/send_location', (req, res) => {
  const data = req.body;
  data.timestamp = Date.now();
  database.insert(data);
  res.json(req.body);
  // console.log(req.body);
});

app.get('/getAll', (req, res) => {
  database.find({}, (err, data) => {
    if (err) {
      res.json('Error fetching data');
      res.end();
      return;
    }
    res.json(data);
  });
});
