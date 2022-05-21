/* eslint-disable node/no-unpublished-require */
/* eslint linebreak-style: ["error", "windows"] */

const { MessageEmbed } = require('discord.js');
const { prefix } = require('../../../config.json');
const { color } = require('../../../config.json');

module.exports = {
  name: 'info',
  description: 'general info',
  emoji: '🔎',
  usage: `${prefix}info`,

  run: async (client, message) => {
    try {
      const days = Math.floor(client.uptime / 86400000);
      const hours = Math.floor(client.uptime / 3600000) % 24; // 1 Day = 24 Hours
      const minutes = Math.floor(client.uptime / 60000) % 60; // 1 Hour = 60 Minutes
      const seconds = Math.floor(client.uptime / 1000) % 60; // 1 Minute = 60 Seconds
      const uptime = (d, h, m, s) => d.toString().isZero('d') + h.toString().isZero('h') + m.toString().isZero('m') + s.toString().isZero('s');

      const Guilds = client.guilds.cache.map((guild) => [guild.id, guild.name, guild.memberCount, guild.presences, guild.joinedAt, guild.systemChannel]);
      let totalUsers = 0;
      const totalServers = Guilds.length;
      for (const g of Guilds) {
        totalUsers += g[2];
      }

      const embed = new MessageEmbed()
        .setTitle('General Info')
        .setThumbnail(
          client.user.displayAvatarURL({
            dynamic: true,
          }),
        )
        .setColor(`${color}`)
        .addField('Servers', `\`${totalServers}\``, true)
        .addField('Users', `\`${totalUsers}\``, true)
        .addField('Uptime', `\`${uptime(days, hours, minutes, seconds).trim()}\``, false)
        .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setTimestamp();

      await message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.log(error);
    }
  },
};
