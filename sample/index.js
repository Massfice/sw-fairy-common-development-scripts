const express = require('express');

const app = express();

app.get('/', (req, res) => {
    return res.send({ status: 'Sample app running', test: process.env.TEST });
});

app.listen(process.env.APP_PORT || 3000);
