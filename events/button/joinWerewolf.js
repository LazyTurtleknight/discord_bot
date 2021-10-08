const gameInstance = require('../../werewolf/WerewolfGame');

module.exports = {
  name: 'joinWerewolf',
  execute(interaction) {
    console.log(`${interaction.user.tag} in #${interaction.channel.name} ` +
    `tried to join the game.`);
    gameInstance.addPlayer(interaction.member.user.id);
    const joinedMessage = `Joined:` + gameInstance.getPlayerCount();
    interaction.update({
      content: joinedMessage,
      components: interaction.components,
    });
  },
};
