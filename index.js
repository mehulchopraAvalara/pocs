/* jshint esversion:6 */

const sql = require('mssql');

const config = {
  user: 'sa',
  password: 'dbroot@123',
  server: 'localhost',
  database: 'books',
};

const price = 1000;

/*sql.connect(config).then((pool) => {
  return pool.request()
    .input('book_price', sql.Int, price)
    .execute('WithinPriceBooks')
    .then((result) => {
      console.dir(result);
    }).catch((err) => {
      console.log(err);
    });
});

sql.on('error', (err) => {
  console.log(err);
});*/

sql.on('error', (err) => {
  console.log(err);
});

function connect() {
  return sql.connect(config);
}

function executeRequest(pool, price) {
  return new Promise((resolve, reject) => {
    const records = [];
    const request = new sql.Request(pool);
    request.stream = true;

    request.input('book_price', sql.Int, price)
      .execute('WithinPriceBooks');

    request.on('recordset', (recordset) => {
      console.log('Record set received from this query');
      console.log(recordset);
    });

    request.on('row', (row) => {
      console.log('Row received from the recordset');
      console.log(row);
      records.push(row);
    });

    request.on('error', (err) => {
      console.log(err);
      reject(err);
    });

    request.on('done', (result) => {
      console.log('Done with!');
      resolve(records);
    });
  });
}

function getBooksWithinPriceRange(price) {
  return new Promise((resolve, reject) => {
    connect()
      .then((pool) => {
        return executeRequest(pool, price);
      })
      .then((records) => {
        resolve(records);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

module.exports.getBooksWithinPriceRange = getBooksWithinPriceRange;

//querying for large tables
/*sql.connect(config).then((pool) => {
  const request = new sql.Request(pool);
  request.stream = true;

  request.input('book_price', sql.Int, price)
    .execute('WithinPriceBooks');

  request.on('recordset', (recordset) => {
    console.log('Record set received from this query');
    console.log(recordset);
  });

  request.on('row', (row) => {
    console.log('Row received from the recordset');
    console.log(row);
  });

  request.on('error', (err) => {
    console.log(err);
  });

  request.on('done', (result) => {
    console.log('Done with!');
    console.log(result);
  });
});*/
