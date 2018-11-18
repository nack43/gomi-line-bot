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
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
})

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text' || event.message.text === 'rubbish') {
    return Promise.resolve(null);
  }

  const room = '1Aです！！'
  const message = { type: 'text', text: room };
  return client.replyMessage(event.replyToken, message );
}

app.listen(port);
