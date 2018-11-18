const express = require('express');
const line = require('@line/bot-sdk');
const moment = require('moment-timezone');

const RUBBISH_TYPE = {
  0: 'Nothing Today',
  1: 'Burnable',
  2: 'Cans/Bottles',
  3: 'Plastic',
  4: 'Burnable',
  5: 'Unburnable',
  6: 'Nothing Today',
};
const ROOM = {
  0: '2D',
  1: '1A',
  2: '1B',
  3: '2A, 2B',
  4: '2C',
};
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const app = express();
const port = process.env.PORT || 8080;
const client = new line.Client(config);
const regex = new RegExp('^[Rr]ubbish*');

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text' || !event.message.text.match(regex)) {
    return Promise.resolve(null);
  }
  const today = moment().tz('Asia/Tokyo');
  const room = ROOM[today.get('isoWeek') % 5];
  const type = RUBBISH_TYPE[today.day()];
  const ms = `ROOM: ${room}\nTYPE: ${type}`;
  const msObj = { type: 'text', text: ms };
  return client.replyMessage(event.replyToken, msObj);
}

app.post('/', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

app.listen(port);
