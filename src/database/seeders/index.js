const userSeeder = require('./UserSeeder');

async function seederGenerator() {
  await userSeeder();
}

module.exports = seederGenerator;
