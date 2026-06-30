const db = require('./config/db');
const bcrypt = require('bcryptjs');

const email = 'nitin@gmail.com';
const password = 'Education@123';

db.query('SELECT * FROM users WHERE email = ?', [email], (err, rows) => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }

  const user = rows[0];
  console.log('stored password', user.password);
  console.log('bcrypt compare', bcrypt.compareSync(password, user.password));
  db.end();
});
