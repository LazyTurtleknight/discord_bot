const {events} = require('../../werewolf/constants.js');
const gameInstance = require('../../werewolf/WerewolfGame.js');

module.exports = {
  name: events.start,
  async execute(interaction) {
    interaction.reply({
      content: `The game starts!`,
    });
    gameInstance.start();
  },
};
