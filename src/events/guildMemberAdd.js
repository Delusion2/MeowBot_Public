module.exports = {
	name: 'guildMemberAdd',
	async execute(member) {
        try {
            const c = member.client.features.get('console');
			c.service(member.client, `MEMBER ADDED: [${member.guild.name}] #${member.id} @${member.username}`);
			return;
		}
		catch (error) {
			console.log(error);
		}
	},
};