/* eslint linebreak-style: ["error", "windows"] */
/* eslint-disable node/no-unpublished-require */

const { prefix } = require('../../../config.json');

module.exports = {
  name: 'count',
  description: 'word count',
  emoji: '📊',
  usage: `${prefix}count <word>`,

  run: async (client, message, args) => {
    if (!args[0]) return message.channel.send(`what word should i count? usage: \`${prefix}count <word>\``);
    try {
      const word = args[0];
      const ai = client.features.get('ai');
      const words = ai.getWords();
      const count = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
      const wordcount = count(words, word) ? count(words, word) : 0;
      return message.channel.send(`I have seen the word \`${word}\` **${wordcount}** times!`);
    } catch (error) {
      console.log(error);
    }
  },
};
