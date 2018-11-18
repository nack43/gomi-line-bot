const express = require('express');
const line = require('@line/bot-sdk');
const app = express();

const port = process.env.PORT || 8080;

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new line.Client(config);

app.post('/', line.middleware(config), (req, res) => {
  const event = req.body.events[0];
  client.replyMessage(event.replyToken, { type: 'text', test: event.message.text });
  res.sendStatus(200)
})

app.listen(port);
