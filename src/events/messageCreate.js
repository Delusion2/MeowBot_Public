const prefix = require("../../config.json").prefix;

module.exports = {
	name: 'messageCreate',
	async execute(message) {
		try {
			if (message.author.id == message.client.user.id) return;
			const c = message.client.features.get('console');
			const args = message.content.slice(prefix.length).trim().split(/ +/g);
			const cmd = args.shift().toLowerCase();
			const command = message.client.commands.get(cmd);

			if (command) {
				if (!message.content.startsWith(prefix)) return;
				command.run(message.client, message, args);
				c.cmd(message.client, message, args);
			}
			else {
				c.msg(message.client, message);
				const ai = message.client.features.get('ai');
				ai.run(message.client, message);
			}
			return;
		}
		catch (error) {
			console.log(error);
		}
	},
};