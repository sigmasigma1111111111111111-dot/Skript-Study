const fs = require('fs-extra');
const path = require('path');

const SCRIPTS_FILE = path.join(__dirname, 'server', 'data', 'scripts.json');
console.log('Reading:', SCRIPTS_FILE);

try {
  const data = fs.readJsonSync(SCRIPTS_FILE);
  console.log('Success! Script count:', data.scripts.length);
} catch (err) {
  console.error('FAILED TO READ:', err.message);
  process.exit(1);
}
