/* eslint-disable node/no-unpublished-require */
/* eslint linebreak-style: ["error", "windows"] */

const { MessageEmbed } = require('discord.js');
const { prefix } = require('../../../config.json');
const { color } = require('../../../config.json');

module.exports = {
  name: 'ping',
  description: 'get client->server latency',
  usage: `${prefix}ping`,
  emoji: '📶',

  run: (client, message) => {
    const gatewayLatency = Math.floor(client.ws.ping);
    message.channel.send('Pinging...').then((m) => {
      const trip = Math.floor(m.createdTimestamp - message.createdTimestamp);
      const embed = new MessageEmbed()
        .setTitle('Pong!')
        .addField('API Latency', `${gatewayLatency}ms`, true)
        .addField('Client Latency', `${trip}ms`, true)
        .setColor(`${color}`)
        .setTimestamp();
      m.edit({ embeds: [embed] });
    }).catch(() => {
      console.log('Promise Rejected');
    });
  },
};
