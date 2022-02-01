module.exports = {
    name: 'interactionCreate',
    on: true,
    async execute(interaction) {
        if(!interaction.isCommand()) return;
        const command = interaction.client.commands.get(interaction.commandName);
                
        return command.execute(interaction);
    }
}