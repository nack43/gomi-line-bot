const express = require('express');
const line = require('@line/bot-sdk');
const app = express();
const moment = require('moment');

const port = process.env.PORT || 8080;

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const BURNABLE = 'Burnable'
const NOTHING = 'Nothing Today'
const RUBBISH_TYPE = {
  0: NOTHING,
  1: BURNABLE,
  2: 'Cans/Bottles',
  3: 'Plastic',
  4: BURNABLE,
  5: 'Unburnable',
  6: NOTHING,
}
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
  const regex = new RegExp('^[Rr]ubbish*');
  if (event.type !== 'message' || event.message.type !== 'text' || !event.message.text.match(regex)) {
    return Promise.resolve(null);
  }

  const ms = `ROOMS: ${room}\nRUBBISH TYPE: ${RUBBISH_TYPE[moment().day()]}`
  const msObj = { type: 'text', text: ms };
  return client.replyMessage(event.replyToken, msObj );
}

app.listen(port);
