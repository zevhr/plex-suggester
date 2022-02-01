const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const chalk = require('chalk');
const path = require('path')
require('dotenv').config();

const commands = [];
const commandFiles = fs.readdirSync(path.resolve(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.resolve(__dirname, 'commands/' + file))
	commands.push(command.data.toJSON());
}

var token = process.env.token;
var clientId = process.env.clientid;
var guildId = process.env.guildid;

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(chalk.greenBright.bold('Successfully registered application commands.'));
		process.exit(0);
	} catch (error) {
		console.error(error);
	}
})();