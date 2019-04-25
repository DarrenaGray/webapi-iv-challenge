require('dotenv').config();

const server = require('./server');

const port = process.env.POST || 5000;

server.listen(port, () => {
    console.log('\n* Server running on http://localhost:5000 *\n')
});