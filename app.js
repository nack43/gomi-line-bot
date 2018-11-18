const express = require('express');
const line = require('@line/bot-sdk');
const app = express();

const port = process.env.PORT || 8080;

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

app.get('/', line.middleware(config), (req, res) => {
  console.log(req.body)
  res.sendStatus(200)
})

app.listen(port);
