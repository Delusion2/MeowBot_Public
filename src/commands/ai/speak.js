/* eslint-disable node/no-unpublished-require */
/* eslint linebreak-style: ["error", "windows"] */

const { prefix } = require('../../../config.json');

module.exports = {
  name: 'speak',
  description: 'say something',
  emoji: '🟢',
  usage: `${prefix}speak`,

  run: async (client, message) => {
    try {
      const ai = client.features.get('ai');
      const banter = await ai.generate(client, message);
      message.reply(banter);
    } catch (error) {
      console.log(error);
    }
  },
};
