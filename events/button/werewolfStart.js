const {events, roles} = require('../../werewolf/constants.js');
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

    // Send a direct message to each player and annouce their role.
    for (const [playerId, role] of gameInstance.playerRoles.entries()) {
      const user = await interaction.client.users.fetch(
          playerId).catch(() => null);
      if (!user) {
        return console.log(`${user} is not a valid user.`);
      }
      await user.send({
        content: `Your role is ${roles[role].name}.`,
      }).catch(() => {
        console.log(
            `User${user} has DMs closed or has no mutual servers with the bot`,
        );
      });
    }
  },
};
