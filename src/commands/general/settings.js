/* eslint-disable node/no-unpublished-require */
/* eslint linebreak-style: ["error", "windows"] */

const { MessageEmbed } = require('discord.js');
const { prefix } = require('../../../config.json');
const { color } = require('../../../config.json');
const randomResponseChance = require('../../../config.json').randomResponseChance / 100 || 0.015;
const randomResponseCooldown = require('../../../config.json').randomResponseCooldown * 1000 || 360;
const { ignoreBots } = require('../../../config.json');
const { learnFromBots } = require('../../../config.json');
const { ignoreDirectMessages } = require('../../../config.json');
const { learnFromDirectMessages } = require('../../../config.json');

module.exports = {
  name: 'settings',
  description: 'basic config settings',
  emoji: '⚙️',
  usage: `${prefix}settings`,

  run: async (client, message) => {
    try {
      const embed = new MessageEmbed()
        .setTitle('Basic Settings')
        .setColor(`${color}`)
        .setThumbnail(
          client.user.displayAvatarURL({
            dynamic: true,
          }),
        )
        .addField('Random Response Chance', `\`${randomResponseChance * 100}%\``, false)
        .addField('Random Response Cooldown', `\`${randomResponseCooldown}ms\``, false)
        .addField('Ignore Bots', `\`${ignoreBots}\``, false)
        .addField('Learn From Bots', `\`${learnFromBots}\``, false)
        .addField('Ignore Direct Messages', `\`${ignoreDirectMessages}\``, false)
        .addField('Learn From Direct Messages', `\`${learnFromDirectMessages}\``, false)
        .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setTimestamp();

      await message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.log(error);
    }
  },
};
