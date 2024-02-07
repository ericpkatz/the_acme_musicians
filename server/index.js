const express = require('express');
const app = express();
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/acme_musicians_db');

app.get('/api/musicians', async(req, res, next)=> {
  try {
    const SQL = `
      SELECT *
      FROM musicians
    `;
    const response = await client.query(SQL);
    res.send(response.rows);
  }
  catch(ex){
    next(ex);
  }
});


const setup = async()=> {
  await client.connect();
  console.log('connected to database');

  let SQL = `
    DROP TABLE IF EXISTS musicians;
    CREATE TABLE musicians(
      id SERIAL PRIMARY KEY,
      name VARCHAR(100)
    );
  `;
  await client.query(SQL);
  console.log('tables created');

  SQL = `
    INSERT INTO musicians(name) VALUES('Taylor Swift');
    INSERT INTO musicians(name) VALUES('Anybody');
    INSERT INTO musicians(name) VALUES('Morgan Wallen');
    INSERT INTO musicians(name) VALUES('The Beatles');
  `;
  await client.query(SQL);
  console.log('data seeded');

  const port = process.env.PORT || 3000;
  app.listen(port, ()=> console.log(`listening on port ${port}`));
}

setup();
