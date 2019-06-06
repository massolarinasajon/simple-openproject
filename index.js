console.log('Starting server...');
const express = require('express');
const port = 3001;
const { getTasks, getStatuses, getTask } = require('./src/http');

const app = express();

app.get('/api/tasks', (req, res) => {
    const { page } = req.query;
    getTasks(page)
        .then(data => res.send(data))
        .catch(console.log);
});

app.get('/api/task/:id', (req, res) => {
    getTask(req.params.id)
        .then(data => res.send(data))
        .catch(console.log);
});

app.get('/api/statuses', (req, res) => {
    getStatuses()
        .then(data => res.send(data._embedded.elements))
        .catch(console.log);
});

app.listen(port);
console.log(`Server started at the port ${port}`);
