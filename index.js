require('dotenv').config();

const server = require('./server');

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log('\n* Server running on https://webapi-iv-challenge-dg.herokuapp.com/ *\n')
});