console.log('Hello World');
require('dotenv').config();

const Discord = require('discord.js');
/**
 * Setup bot client with intents. Note that the intents spcify which
 * events the bot will receive.
 * TODO: add intents once the bot needs more event to work with!
 */
const {Client, Intents} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES]});

// As soon as the bot is ready
client.once('ready', () => {
  console.log('I am ready!');
});

// Bot logs into discord with its token
client.login(process.env.TOKEN);

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const {commandName} = interaction;

  if (commandName === 'ping') {
    await interaction.reply('Pong!');
  } else if (commandName === 'server') {
    await interaction.reply('Server info.');
  } else if (commandName === 'user') {
    await interaction.reply('User info.');
  }
});
