/* eslint-disable node/no-unpublished-require */
/* eslint linebreak-style: ["error", "windows"] */

const axios = require('axios');
const { prefix } = require('../../../config.json');

const url = 'https://nekos.life/api/v2/img/meow';

module.exports = {
  name: 'cat',
  description: 'meow!',
  emoji: '🐱',
  usage: `${prefix}cat`,

  run: async (_client, message) => {
    try {
      axios({ method: 'GET', url })
        .then((res) => {
          const { data } = res;
          message.channel.send(data.url);
        })
        .catch((err) => {
          console.log('error in request', err);
          return message.reply('There was an error when trying to complete your request. Try again later.');
        });
    } catch (error) {
      console.log(error);
    }
  },
};
