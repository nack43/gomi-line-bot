const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.post('/', (req, res) => {
  console.log(req)
  res.sendStatus(200)
})

app.listen(port);
