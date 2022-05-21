/* eslint-disable node/no-unpublished-require */
/* eslint linebreak-style: ["error", "windows"] */

const axios = require('axios');
const { prefix } = require('../../../config.json');

const url = 'https://nekos.life/api/v2/8ball';

module.exports = {
  name: '8ball',
  description: "it's magic",
  emoji: '🎱',
  usage: `${prefix}8ball`,

  run: async (_client, message) => {
    try {
      axios({ method: 'GET', url })
        .then((res) => {
          const { data } = res;
          message.reply({ content: `${data.response}`, files: [data.url] });
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
