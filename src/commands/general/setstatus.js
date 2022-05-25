/* eslint-disable node/no-unpublished-require */
/* eslint linebreak-style: ["error", "windows"] */

const { prefix } = require('../../../config.json');

module.exports = {
  name: 'setstatus',
  description: 'set activity status',
  emoji: '⛳',
  usage: `${prefix}setstatus <activity>`,

  run: async (client, message, args) => {
    try {
      if (!args[0]) return message.reply(`what activity?? Usage: \`${prefix}setstatus <activity>\``);
      const ai = client.features.get('ai');
      const banter = await ai.generate(client, message);
      client.user.setActivity(args[0]);
      message.react('✅');
      message.reply(banter);
    } catch (error) {
      console.log(error);
    }
  },
};
