const {events} = require('../../werewolf/constants.js');
const gameInstance = require('../../werewolf/WerewolfGame.js');

module.exports = {
  name: events.start,
  async execute(interaction) {
    // After the start button is pressed remove it.
    await interaction.update({
      content: interaction.message.content,
      components: [],
    });
    await interaction.followUp({
      content: `The game starts!`,
    });
    gameInstance.start();
  },
};
