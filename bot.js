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

// Bot logs into discord with its token
client.login(process.env.TOKEN);

// As soon as the bot is ready
client.once('ready', () => {
  console.log('I am ready!');
});

// command handler
client.on('interactionCreate', async (interaction) => {
  // return if interaction is not a command
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  // return if command does not exist
  if (!command) return;

  // reply by executing appropriate command
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'There was an error while executing this command',
      ephemeral: true});
  }
});
