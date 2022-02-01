const discord = require('discord.js');
module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`PlexSuggester started and logged in as ${client.user.tag}.`)

        if (process.env.startupMessage === "true") {
            var app = await client.application.fetch()
            // console.log(channel)

            const startEmbed = new discord.MessageEmbed()
            .setAuthor({ name: `PlexSuggester` })
            .setColor(`#eb9b34`)
            .setTitle(`Started!`)
            .setDescription(`If you're reading this, the bot has successfully started! See **/help** for assistance!\n_**Hint:**_ this message can be disabled in .env! Change **startupMessage** to **false**!`)

            return app.owner.send({ embeds: [startEmbed] })
        }
    }
}