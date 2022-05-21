const axios = require('axios');
const { prefix } = require('../../../config.json');
/* eslint-disable node/no-unpublished-require */
/* eslint linebreak-style: ["error", "windows"] */

const url = 'https://nekos.life/api/v2/fact';

module.exports = {
  name: 'fact',
  description: 'random fact',
  emoji: '🤔',
  usage: `${prefix}fact`,

  run: async (_client, message) => {
    try {
      axios({ method: 'GET', url })
        .then((res) => {
          const { data } = res;
          message.channel.send(data.fact);
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
