const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.post('/', (req, res) => {
  console.log(req.body)
  console.log(req)
  console.log('testtest')
  res.status(200)
})

app.listen(port);
