/* eslint-disable node/no-unpublished-require */
/* eslint linebreak-style: ["error", "windows"] */

const { MessageEmbed } = require('discord.js');
const { prefix } = require('../../../config.json');
const { color } = require('../../../config.json');

module.exports = {
  name: 'stats',
  description: 'stats and info',
  emoji: '📊',
  usage: `${prefix}stats`,

  run: async (client, message) => {
    try {
      const ai = client.features.get('ai');
      const stats = ai.getStats();
      console.log(stats);

      const embed = new MessageEmbed()
        .setTitle('AI Stats')
        .setColor(`${color}`)
        .setThumbnail(
          client.user.displayAvatarURL({
            dynamic: true,
          }),
        )
        .addField('Total Lines', `${stats.lines}`, true)
        .addField('Total Words', `${stats.words}`, true)
        .addField('Unique Words', `${stats.unique}`, true)
        .addField('Word Pairs', `${stats.nGrams}`, true)
        .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setTimestamp();

      await message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.log(error);
    }
  },
};
