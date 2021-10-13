const {events} = require('../../werewolf/constants.js');
const gameInstance = require('../../werewolf/WerewolfGame.js');

module.exports = {
  name: events.votePlayer,
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
    // keep track of player who voted
    // every player has only one vote
    const countVoters = new Set();
    if (!(interaction.member.user.id in countVoters)) {
      gameInstance.votePlayer(interaction.values[0]);
      countVoters.add(interaction.member.user.id);
    }
  },
};