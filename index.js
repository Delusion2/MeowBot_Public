/* eslint-disable node/no-unpublished-require */
/* eslint linebreak-style: ["error", "windows"] */

const fs = require('fs-extra');
const { Client, Collection, Intents } = require('discord.js');

const config = require('./config.json');

const intents = new Intents();
intents.add(
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
);

const client = new Client({ intents });

// global variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.features = new Collection();

// command handler
const folders = fs.readdirSync('./src/commands/');
folders.forEach((dir) => {
  const commandFiles = fs.readdirSync(`./src/commands/${dir}/`)
    .filter((file) => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(`./src/commands/${dir}/${file}`);
    client.commands.set(command.name, command);
  }
});

// event handler
const eventFiles = fs.readdirSync('./src/events')
  .filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./src/events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// feature handler
const featureFiles = fs.readdirSync('./src/features')
  .filter((file) => file.endsWith('.js'));

for (const file of featureFiles) {
  const feature = require(`./src/features/${file}`);
  client.features.set(feature.name, feature);
}

// send token to discord gateway for login
client.login(config.token);
