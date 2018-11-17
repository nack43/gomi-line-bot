const line = require('@line/bot-sdk');
require('dotenv').config();
const request = require('request');

// const config = {
//   channelAccessToken: process.env.ACCESS_TOKEN,
//   channelSecret: process.env.CHANNEL_SECRET,
// };

// const client = new line.Client(config);

exports.handler = async (event) => {
  const pos = request.post({
    headers: {'Content-Type' : 'application/json', 'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`},
    url: 'https://api.line.me/v2/bot/message/push',
    body: JSON.stringify({"to": process.env.USER_ID,"messages": [{"type": "text","text": "you are rubbish"}]})
  });
  // TODO implement
  const response = {
      statusCode: 200,
      body: JSON.stringify('Hello from Lambda!'),
      secre: process.env.CHANNEL_ID,
      id: process.env.CHANNEL_SECRET,
  };
  return response;
};
