
const {game, subcommands, events} = require('../werewolf/constants.js');
const {SlashCommandBuilder} = require('@discordjs/builders');
const gameInstance = require('../werewolf/WerewolfGame.js');
const {MessageActionRow, MessageButton} =
    require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
      .setName(game.NAME)
      .setDescription('Play werewolf.')
      .addSubcommand((subcommand) => subcommand
          .setName(subcommands.info)
          .setDescription('Gives all information you need to play werewolf.'))
      .addSubcommand((subcommand) => subcommand
          .setName(subcommands.create)
          .setDescription('Create a game.'))
      .addSubcommand((subcommand) => subcommand
          .setName(subcommands.end)
          .setDescription('Manually end the game.')),
  async execute(interaction) {
    switch (interaction.options.getSubcommand()) {
      case subcommands.info:
        // quick explanation how to play
        await interaction.reply(
            `To creat a game use command ` +
            subcommands.create + `.\n`+
            `Then, a Join button will show up which can be used to join` +
            ` the game.\n`+
            `Once all players joined the game, start it with command ` +
            subcommands.start + ` and choose possible player roles.\n` +
            `If anything happens, just end the game manually with the command` +
            ` ` + subcommands.end + `.`);
        break;
      case subcommands.create:
        // create a werewolf game instance
        try {
          gameInstance.initialize();
          await interaction.reply(`Successfully created a game. ` +
          `Players can join the game now.`);
          const row = new MessageActionRow()
              .addComponents(
                  new MessageButton()
                      .setCustomId(events.join)
                      .setLabel('Join')
                      .setStyle('PRIMARY'),
              );
          await interaction.followUp({
            content: `Join by pressing the button.`,
            components: [row],
          });
        } catch (error) {
          console.error(error);
          await interaction.reply(
              `Something went wrong while creating a game.`);
        }
        break;

      // end the game
      case subcommands.end:
        if (!gameInstance) {
          await interaction.reply(`Before ending a game` +
          ` you need to create a game with the create command.`);
        } else {
          switch (gameInstance.status) {
            case game.STATUS.inCreation:
              await interaction.reply(`Ending the game.`);
              gameInstance.clear();
              break;

            case game.STATUS.running:
              await interaction.reply(`Ending the game.`);
              gameInstance.clear();
              break;

            default:
              await interaction.reply(`Something unexpected happened.` +
              `Try restarting the bot.`);
              console.log(gameInstance.status,
                  interaction.options.getSubcommand());
              break;
          }
        }
        break;

      // default is display case info
      default:

        break;
    }
  },
};
