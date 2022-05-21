module.exports = {
	name: 'guildDelete',
	async execute(guild) {
        try {
            const c = guild.client.features.get('console');
			c.service(guild.client, `GUILD DELETED: ${guild.name} #${guild.id}`);
			return;
		}
		catch (error) {
			console.log(error);
		}
	},
};