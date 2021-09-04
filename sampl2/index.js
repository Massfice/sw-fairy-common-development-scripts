// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    return res.send({ status: 'Sampl2 app running' });
});

app.listen(3001);
