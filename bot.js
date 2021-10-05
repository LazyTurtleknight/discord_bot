// require environment
require('dotenv').config();
const fs = require('fs');
/**
 * Setup bot client with intents. Note that the intents spcify which
 * events the bot will receive.
 * TODO: add intents once the bot needs more event to work with!
 */
const {Client, Collection, Intents} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES]});

// setup (slash) commands
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').
    filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  // require source with command
  const command = require(`./commands/${file}`);
  // set new item with name as key and command as value
  client.commands.set(command.data.name, command);
}

// setup events
const eventFiles = fs.readdirSync('./events').filter((file) =>
  file.endsWith('.js'));

// event handler
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Bot logs into discord with its token
client.login(process.env.TOKEN);
