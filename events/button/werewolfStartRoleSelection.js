const gameInstance = require('../../werewolf/WerewolfGame');
const {roles, events} = require('../../werewolf/constants.js');
const {MessageActionRow, MessageSelectMenu} =
    require('discord.js');

module.exports = {
  name: events.startRoleSelection,
  async execute(interaction) {
    // After the start button is pressed remove it.
    await interaction.update({
      content: interaction.message.content,
      components: [],
    });
    gameInstance.startRoleSelection();
    // collect all possible roles
    const roleArray = [];
    for (const key of Object.keys(roles)) {
      roleArray.push({
        label: roles[key].name,
        description: roles[key].name,
        value: key,
      });
    }
    const roleSelectRow = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId(events.selectRoles)
                .setPlaceholder('Possible roles')
                .setMinValues(0)
                .setMaxValues(gameInstance.getPlayerCount())
                .addOptions(roleArray),
        );

    await interaction.followUp({
      content: 'Select roles to play with.',
      components: [roleSelectRow],
      ephemeral: true,
    });
  },
};
