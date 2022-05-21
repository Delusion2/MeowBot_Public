module.exports = {
	name: 'messageUpdate',
	async execute(oldMessage, newMessage) {
		try {
			if (oldMessage.author.id !== oldMessage.client.user.id) {
				const c = oldMessage.client.features.get('console');
                c.service(oldMessage.client, `MESSAGE EDIT: [${oldMessage.guild.name}] #${oldMessage.channel.name} - ${oldMessage.author.username}: "${oldMessage.content}" CHANGED TO "${newMessage.content}"`);
				return;
			}
		}
		catch (error) {
			console.log(error);
		}
	},
};