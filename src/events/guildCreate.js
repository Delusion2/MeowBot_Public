module.exports = {
	name: 'guildCreate',
	async execute(guild) {
        try {
            const c = guild.client.features.get('console');
			c.service(guild.client, `GUILD CREATED: ${guild.name} #${guild.id}`);
			return;
		}
		catch (error) {
			console.log(error);
		}
	},
};