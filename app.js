const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(env.process.PORT || port, () => console.log(`Example app listening on port ${port}!`));