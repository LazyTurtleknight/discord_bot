const fs = require('fs');
const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');
require('dotenv').config();
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;
const TOKEN = process.env.TOKEN;

const commands = [];

const commandFiles = fs.readdirSync('./commands').
    filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  // require source with command
  const command = require(`./commands/${file}`);
  // add command as JSON to commands array
  commands.push(command.data.toJSON());
}

const rest = new REST({version: '9'}).setToken(TOKEN);

rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {body: commands})
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
