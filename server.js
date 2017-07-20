/* jshint esversion:6 */

const index = require('./index');
const express = require('express');
const json2csv = require('json2csv');

const app = express();

app.get('/', (req, res) => {
  index.getBooksWithinPriceRange(1000)
    .then((records) => {
      console.log(records);

      const fields = ['booksId', 'title', 'price', 'pages'];
      const fieldNames = ['Id', 'Title', 'Price', 'Pages'];

      const data = json2csv({ data: records, fields: fields, fieldNames: fieldNames });
      res.attachment('books.csv');
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(3000, () => {
  console.log('App running on port 3000');
});
