module.exports = {
	name: 'channelDelete',
	async execute(channel) {
        try {
            const c = channel.client.features.get('console');
			c.service(channel.client, `CHANNEL DELETED: [${channel.guild.name}] (${channel.id}) #${channel.name}`);
			return;
		}
		catch (error) {
			console.log(error);
		}
	},
};