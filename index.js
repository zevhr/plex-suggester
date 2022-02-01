const { Intents, Collection, Client } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const client = new Client(
    { 
        intents: [
            Intents.FLAGS.GUILDS, 
            Intents.FLAGS.GUILD_MESSAGES
        ] 
    });

// Command Handling
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Event Handling
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

if(!process.env.guildid || !process.env.clientid || !process.env.x_plex_token || !process.env.serverip || !process.env.token)  {
    throw new Error(`You haven't provided all required fields. Please correct before starting this bot.`)
} else client.login(process.env.token)