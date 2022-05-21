/* eslint-disable node/no-unpublished-require */
/* eslint linebreak-style: ["error", "windows"] */

const { MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');
const { color } = require('../../../config.json');
const { prefix } = require('../../../config.json');
const { inviteLink } = require('../../../config.json');
const showInvite = require('../../../config.json').showInviteLinkInHelp;

let embed;

module.exports = {
  name: 'help',
  usage: `${prefix}help`,
  emoji: 'ℹ',
  description: 'For me to help you',

  run: async (client, message, args) => {
    if (!args[0]) {
      const categories = [];
      const ignored = ['owner'];
      const emo = {
        general: '🛄',
        ai: '⌨️',
        fun: '🥳',
      };

      readdirSync('./src/commands').forEach((dir) => {
        if (ignored.includes(dir.toLowerCase())) return;
        const name = `${emo[dir.toLowerCase()]} ${dir.toUpperCase()}`;
        const cats = {
          name,
          value: `\`${prefix}help ${dir.toLowerCase()}\``,
          inline: false,
        };

        categories.push(cats);
      });

      let embedDescription = `__**Prefix:**__ \`${prefix}\`\n\n`;
      if (showInvite) {
        embedDescription += `__**Invite Me To Your Server**__\n**[By Clicking This Link](${inviteLink})**\n\n`;
      }
      embedDescription += `__**Additional Help:**__\n\`${prefix}help [category or cmd]\`\n\n__**Categories**__`;

      embed = new MessageEmbed()
        .setTitle('Help Menu:')
        .setDescription(embedDescription)
        .addFields(categories)
        .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()
        .setThumbnail(
          client.user.displayAvatarURL({
            dynamic: true,
          }),
        )
        .setColor(`${color}`);

      return message.channel.send({ embeds: [embed] });
    }
    const cots = [];
    const catts = [];

    readdirSync('./src/commands/').forEach((dir) => {
      if (dir.toLowerCase() !== args[0].toLowerCase()) return;
      const commands = readdirSync(`./src/commands/${dir}/`).filter((file) => file.endsWith('.js'));

      const cmds = commands.map((cmd) => {
        const file = require(`../${dir}/${cmd}`);

        if (!file.name) return 'No command name.';

        const name = file.name.replace('.js', '');

        const des = `${client.commands.get(name).description}`;
        const emo = `${client.commands.get(name).emoji}`;

        return { cname: `${emo} \`${name}\``, des };
      });

      let dota = new Object();

      cmds.map((co) => {
        dota = {
          name: `${cmds.length === 0 ? 'In progress.' : co.cname}`,
          value: co.des ? co.des : 'No Description',
          inline: true,
        };
        catts.push(dota);
      });

      cots.push(dir.toLowerCase());
    });

    const command = client.commands.get(args[0].toLowerCase()); // ||
    // client.commands.find(
    //   (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
    // );

    if (cots.includes(args[0].toLowerCase())) {
      const combed = new MessageEmbed()
        .setTitle(
          `__${args[0].charAt(0).toUpperCase() + args[0].slice(1)
          } Commands__`,
        )
        .setDescription(
          `Use \`${prefix}help [cmd]\`\n\n`,
        )
        .addFields(catts)
        .setColor(`${color}`);

      return message.channel.send({ embeds: [combed] });
    }

    if (!command) {
      embed = new MessageEmbed()
        .setTitle(
          `Invalid command! Use \`${prefix}help\` for all of my commands!`,
        )
        .setColor('RED');
      return message.channel.send({ embeds: [embed] });
    }

    embed = new MessageEmbed()
      .setTitle(`${command.emoji} ${command.name}`)
      .addField(
        'Command:',
        command.name ? `\`${command.name}\`` : 'No name for this command.',
      )
      // .addField(
      //   "Aliases:",
      //   command.aliases
      //     ? `\`${command.aliases.join("` `")}\``
      //     : "No aliases for this command."
      // )
      .addField(
        'Usage:',
        command.usage
          ? `\`${command.usage}\``
          : `\`${prefix}${command.name}\``,
      )
      .addField(
        'Command Description:',
        command.description
          ? command.description
          : 'No description for this command.',
      )
      .setColor(`${color}`);
    return message.channel.send({ embeds: [embed] });
  },
};
