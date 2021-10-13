const gameInstance = require('werewolf/WerewolfGame');
const {events} = require('../../werewolf/constantsjs');

module.exports = {
  name: events.nominate,
  async execute(interaction) {
    for (const nominee of interaction.values) {
      // player might choose to not nominate any player
      if (!(nominee in gameInstance.players)) {
        gameInstance.addNominee(nominee);
      }
    }

    // button to start the vote
    const startButton = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(events.startVote)
                .setLabel('Start vote')
                .setStyle('SUCCESS'),
        );

    // collect username of nominees by their id saved in the game container
    let playerNames = '';
    gameInstance.players.forEach((player) => {
      playerNames += interaction.client.users.cache.get(player).username;
    });
    // display players
    const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Nominees')
        .setDescription(`${playerNames}`);

    await interaction.update({
      content: interaction.message.content,
      components: [interaction.message.components[0], startButton],
      embeds: [embed],
    });
  },
};
