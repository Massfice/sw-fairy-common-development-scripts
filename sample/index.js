const express = require('express');

const app = express();

app.get('/', (req, res) => {
    console.log('Sample App');

    return res.send({ status: 'Sample app running', nextApp: process.env.NEXT_APP, test: process.env.TEST });
});

app.listen(process.env.APP_PORT || 3000);
