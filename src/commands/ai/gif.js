/* eslint-disable node/no-unpublished-require */
/* eslint linebreak-style: ["error", "windows"] */

const axios = require('axios');

// gifKey is from tenor and can be obtained through their developers platform
const { prefix, gifKey } = require('../../../config.json');

module.exports = {
  name: 'gif',
  description: 'gif in chat',
  emoji: '🖼️',
  usage: `${prefix}gif [search]`,

  run: async (client, message, args) => {
    try {
      const ai = client.features.get('ai');

      let url = 'https://g.tenor.com/v1/random/?key=';
      const limit = 10;

      let query = args.join(' ').trim();
      if (query === '') {
        query = ai.getRandomWord();
      }
      url += `${gifKey}&q=${query}&limit=${limit}`;
      url.replaceAll(' ', '%20');
      axios({ method: 'GET', url })
        .then((res) => {
          const result = Math.floor(Math.random() * res.data.results.length);
          const c = client.features.get('console');
          const gif = res.data.results[result].itemurl;
          ai.storeGif(gif);
          c.server(client, `${'GIF'.padEnd(24, ' ')} ${query.padEnd(25, ' ')} ${gif}`);
          message.channel.send(`${gif}`);
        })
        .catch((error) => {
          console.log(error);
          return message.reply('There was an error when trying to complete your request. Try again later.');
        });
    } catch (error) {
      console.log(error);
    }
  },
};
