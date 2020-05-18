const pool = require('../connect_db.js');

// async/await
module.exports = async function(text,values) {

  const query = {
    text: text,
    values: values,
  }

  const client = await pool.connect();
  // async/await
  try {
    const res = await client.query(query.text, query.values);
    return res
  } catch(err) {
    throw err
  }finally {
    client.release();
  }

}