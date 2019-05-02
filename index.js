console.log('Starting server...');
const express = require('express');
const port = 3001;
const { get } = require('./src/http');

const app = express();

app.get('/api/get', (req, res) => {
    get()
        .then((data) => res.send(data))
        .catch(console.log);
});

app.listen(port);
console.log(`Server started at the port ${port}`);
