module.exports = {
	name: 'messageDelete',
	async execute(message) {
		try {
			if (message.author.id !== message.client.user.id) {
				const c = message.client.features.get('console');
                c.service(message.client, `MESSAGE DELETE: [${message.guild.name}] #${message.channel.name} - ${message.author.username} "${message.content}"`);
				return;
			}
		}
		catch (error) {
			console.log(error);
		}
	},
};