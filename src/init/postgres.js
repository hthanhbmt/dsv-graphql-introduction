const { Pool } = require('pg');
const format = require('pg-format');
const authorsData = require('../../data/authors.json');

const authorsArray = authorsData.map((authorObject) => {
  const booksArrayString = `{
    ${authorObject.books.map(b => `"${b}"`).join(', ')}
  }`;
  return [
    authorObject.id,
    authorObject.name,
    booksArrayString,
  ];
});

const authorsInsertQuery = format('INSERT INTO authors (id, name, books) VALUES %L returning id', authorsArray);

// init postgres connection
const pool = new Pool({
  user: 'root',
  host: 'postgres',
  database: 'dsv',
  password: 'example',
  port: 5432,
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1);
});

pool.connect((error, client, done) => {
  if (error) {
    throw error;
  } else {
    console.log('🌍 Successfully connect to Postgres');
    feedData();
  }
});

const createTable = async () => {
  try {
    await pool.query(`CREATE TABLE authors(
      id TEXT PRIMARY KEY,
      name TEXT not null,
      books TEXT []
    )`);
  } catch (error) {
    if (!/already exists/.test(error.message)) {
      throw error;
    }
  }
};

const insertData = async () => {
  try {
    const existed = await pool.query('SELECT * FROM authors');
    if (existed && existed.rows && existed.rows.length) {
      // do nothing
      console.log('(Authors) feed data already inserted');
    } else {
      // insert feed data
      console.log('(Authors) inserting feed data');
      await pool.query(authorsInsertQuery);
      console.log('(Authors) done inserting feed data');
    }
  } catch (error) {
    console.log(error);
  }
};

const feedData = async () => {
  await createTable();
  await insertData();
};

module.exports = pool;
