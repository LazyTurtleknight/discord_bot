
const {game, roles, subcommands} = require('../werewolf/constants.js');
const {SlashCommandBuilder} = require('@discordjs/builders');
const gameInstance = require('../werewolf/WerewolfGame.js');
const {MessageActionRow, MessageSelectMenu, MessageButton} =
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
          .setName(subcommands.start)
          .setDescription('Starts the game.'))
      .addSubcommand((subcommand) => subcommand
          .setName(subcommands.end)
          .setDescription('Manually end the game.')),
  async execute(interaction) {
    switch (interaction.options.getSubcommand()) {
      case subcommands.info:
        // quick explanation how to play
        interaction.reply(
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
          interaction.reply(`Successfully created a game. ` +
          `Players can join the game now.`);
          const row = new MessageActionRow()
              .addComponents(
                  new MessageButton()
                      .setCustomId('joinWerewolf')
                      .setLabel('Join')
                      .setStyle('PRIMARY'),
              );
          interaction.followUp({
            content: `Join by pressing the button.`,
            components: [row],
          });
        } catch (error) {
          console.error(error);
          interaction.reply(`Something went wrong while creating a game.`);
        }
        break;

      // start the game
      case subcommands.start:
        if (!gameInstance) {
          interaction.reply(`Before starting a game` +
          ` you need to create a game with the create command.`);
        } else {
          switch (gameInstance.status) {
            case game.STATUS.inCreation:
              // player need to select possible roles
              const roleArray = [];
              for (const key of Object.keys(roles)) {
                roleArray.push({
                  label: roles[key],
                  description: roles[key],
                  value: `Value of ${key}`,
                });
              }
              const row = new MessageActionRow()
                  .addComponents(
                      new MessageSelectMenu()
                          .setCustomId('select')
                          .setPlaceholder('Possible roles')
                          .setMinValues(0)
                          .setMaxValues(gameInstance.getPlayerCount())
                          .addOptions(roleArray),
                  );
              interaction.reply({
                content: 'Choose possible roles.',
                components: [row],
                ephemeral: true,
              });
              gameInstance.start();
              break;

            case game.STATUS.running:
              interaction.reply(`Game is already running.`);
              break;

            default:
              interaction.reply(`Something unexpected happened.` +
              `Try ending the game with the end command and ` +
              `then create a new game with the create command.`);
              console.log(gameInstance.status,
                  interaction.options.getSubcommand());
              break;
          }
        }

        break;

      // end the game
      case subcommands.end:
        if (!gameInstance) {
          interaction.reply(`Before ending a game` +
          ` you need to create a game with the create command.`);
        } else {
          switch (gameInstance.status) {
            case game.STATUS.inCreation:
              interaction.reply(`Ending the game.`);
              gameInstance.clear();
              break;

            case game.STATUS.running:
              interaction.reply(`Ending the game.`);
              gameInstance.clear();
              break;

            default:
              interaction.reply(`Something unexpected happened.` +
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
