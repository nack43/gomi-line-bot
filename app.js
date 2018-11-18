const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  console.log(req.body)
  res.sendStatus(200)
})

app.listen(port);
