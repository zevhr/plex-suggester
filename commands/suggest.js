const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require('axios');
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'suggest',
    data: new SlashCommandBuilder()
        .setName('suggest')
        .setDescription('I will suggest you content from your Plex server!')
        .addStringOption(option => 
            option.setName('type')
                .setDescription('Pick a category to get a suggestion for!')
                .setRequired(true)
                .addChoice('Movies', 'movie')
                .addChoice('TV', 'show')
                .addChoice('Music', 'artist')),
    async execute(interaction) {
        // Grab arguments
        var content_type = interaction.options.getString('type');

        // Fetch library
        var ldat = await axios.get(`http://${process.env.serverip}:32400/library/sections?X-Plex-Token=${process.env.x_plex_token}`)
        var obj = ldat.data.MediaContainer.Directory
        var lkey = [];

        Object.keys(obj).forEach(async function(keys) {
            if(obj[keys].type === content_type) {
                lkey.push(obj[keys].key)
            }
        })

        if (lkey.length === 0) return await interaction.reply(`Sorry, a **${content_type}** library doesn't exist!`)

        // Fetch all content available
        var list = await axios.get(`http://${process.env.serverip}:32400/library/sections/${lkey[0]}/all?X-Plex-Token=${process.env.x_plex_token}`)

        // Setup keys for indexing
        var total_movies = Math.round(list.data.MediaContainer.size - 1);
        var random_num = Math.floor(Math.random() * (total_movies - 0) + 0);

        var dataObj = list.data.MediaContainer.Metadata[random_num]

        // gogogoogogogogoogogogogogogogogoo!!!!!!
        var dataEmbed = new MessageEmbed()
        .setColor(`#eb9b34`)

        switch(content_type) {
            case 'movie':
                var duration = new Date(dataObj.Media[0].duration).toISOString().slice(11, -1)
                dataEmbed
                .setAuthor({ name: `${dataObj.title} -- ${dataObj.Genre[0].tag}`})
                .setDescription(`${dataObj.summary}`)
                .addFields(
                    { name: "Directed by", value: dataObj.Director[0].tag, inline: true },
                    { name: 'Duration', value: duration, inline: true }
                )
                .setFooter({ text: `Released in ${dataObj.year}` })
                if(dataObj.tagline) dataEmbed.setTitle(dataObj.tagline)
            break;
            case 'artist':
                dataEmbed
                    .setAuthor({ name: `${dataObj.title}` })
                    .setTitle(dataObj.title)
                    .setDescription(`I've suggested you this artist to listen to!`)
            break;
            case 'show':
                var duration = new Date(dataObj.duration).toISOString().slice(11, -1)
                dataEmbed
                .setAuthor({ name: `${dataObj.title} -- ${dataObj.Genre[0].tag}`})
                .setDescription(`${dataObj.summary}`)
                .addFields(
                    { name: 'Duration', value: duration, inline: true },
                    { name: 'Available Episodes Total', value: `${dataObj.leafCount}`, inline: true },
                    { name: 'Available Seasons Total', value: `${dataObj.childCount}`, inline: true }
                )
                .setFooter({ text: `Released in ${dataObj.year}` })
                if(dataObj.tagline) dataEmbed.setTitle(dataObj.tagline)
            break;
        }

        return await interaction.reply({ embeds: [dataEmbed ] });
    }
}