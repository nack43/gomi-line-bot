const express = require('express');
const line = require('@line/bot-sdk');
const app = express();
const moment = require('moment-timezone');

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

ROOM = {
  0: '2D',
  1: '1A',
  2: '1B',
  3: '2A, 2B',
  4: '2C',
}

const client = new line.Client(config);
const today = moment().tz('Asia/Tokyo');

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
  const room = ROOM[today.get('isoWeek') % 5]
  const ms = `ROOM: ${room}\nTYPE: ${RUBBISH_TYPE[today.day()]}`
  const msObj = { type: 'text', text: ms };
  return client.replyMessage(event.replyToken, msObj );
}

app.listen(port);
