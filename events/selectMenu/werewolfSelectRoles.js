const {events} = require('../../werewolf/constants.js');
const gameInstance = require('../../werewolf/WerewolfGame.js');

module.exports = {
  name: events.selectRoles,
  async execute(interaction) {
    for (const role of interaction.values) {
      gameInstance.handleRole(role);
    }
    gameInstance.start();
    await interaction.reply('this worked');
  },
};
