const {events} = require('../../werewolf/constants.js');
const gameInstance = require('../../werewolf/WerewolfGame.js');

module.exports = {
  name: events.startVote,
  async execute(interaction) {
    // collect all possible roles
    const nominees = [];
    for (const player of gameInstance.nominees) {
      roleArray.push({
        label: player.name,
        value: player,
      });
    }
    const voteNominee = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId(events.votePlayer)
                .setPlaceholder('Nominee')
                .addOptions(nominees),
        );
    await interaction.reply({
      content: `Vote for a player to hang.`,
      components: [voteNominee],
    });
  },
};
