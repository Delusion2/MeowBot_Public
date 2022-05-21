module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if(!interaction.isButton()) return;
		
		try {
			const c = interaction.client.features.get('console');
			c.service(interaction.client, `INTERACTION: [${interaction.guild.name}] #${interaction.channel.name} - ${interaction.user.username}: Interaction ID: ${interaction.customId}`);
			return;
		}
		catch (error) {
			console.log(error);
		}

		// if (interaction.customId == "") {
		// 	interaction.deferUpdate()
		// 		.then(console.log)
		// 		.catch(console.error);
		// }

	}
};