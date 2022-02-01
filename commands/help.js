const discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    name: 'help',
    data: new SlashCommandBuilder()
    .setName(`help`)
    .setDescription(`Simple help menu because pog`),
    async execute(interaction) {

        const helpEmbed = new discord.MessageEmbed()
        .setAuthor({ name: `Plex Suggester` })
        .setColor(`#eb9b34`)
        .setTitle(`Hello!`)
        .setDescription(`This is the Plex Suggestor bot! It can detect what is in your PMS library and suggest you something to watch.\n\nTo begin, use **/suggest** and provide a category.`)

        return await interaction.reply({ embeds: [helpEmbed] });
    }
}