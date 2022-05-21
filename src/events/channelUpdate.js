module.exports = {
    name: 'channelUpdate',
    async execute(oldChannel, newChannel) {
        try {
            const c = oldChannel.client.features.get('console');
            c.service(oldChannel.client, `CHANNEL EDIT: [${oldChannel.guild.name}] #${oldChannel.name} CHANGED TO #${newChannel.name}`);
            return;
        }
        catch (error) {
            console.log(error);
        }
    },
};