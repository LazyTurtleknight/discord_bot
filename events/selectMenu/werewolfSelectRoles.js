const {events} = require('../../werewolf/constants.js');
const gameInstance = require('../../werewolf/WerewolfGame.js');
const {MessageActionRow, MessageButton} = require('discord.js');

module.exports = {
  name: events.selectRoles,
  async execute(interaction) {
    for (const role of interaction.values) {
      gameInstance.handleRole(role);
    }

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(events.start)
                .setLabel('Start')
                .setStyle('SUCCESS'),
        );
    await interaction.reply({
      content: `Everything is set up. Press Start when everyone is ready`,
      components: [row],
    });
  },
};
