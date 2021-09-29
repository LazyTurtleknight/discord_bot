console.log('Hello World');
require('dotenv').config();

const Discord = require('discord.js');
/**
 * Setup bot client with intents. Note that the intents spcify which events the bot
 * will receive.
 * TODO: add intents once the bot needs more event to work with!
 */
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.login(process.env.DISCORD_TOKEN);

client.on('ready', readyDiscord);

function readyDiscord() {
  console.log('I am ready!')
};