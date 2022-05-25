/* eslint linebreak-style: ["error", "windows"] */
/* eslint-disable node/no-unpublished-require */

module.exports = {
  name: 'channelCreate',
  async execute(channel) {
    try {
      const c = channel.client.features.get('console');
      c.service(channel.client, ` [${channel.guild.name}] (${channel.id}) #${channel.name}`);
      return;
    } catch (error) {
      console.log(error);
    }
  },
};
