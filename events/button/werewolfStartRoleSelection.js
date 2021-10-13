const gameInstance = require('../../werewolf/WerewolfGame');
const {roles, events} = require('../../werewolf/constants.js');
const {MessageActionRow, MessageSelectMenu} =
    require('discord.js');

module.exports = {
  name: events.startRoleSelection,
  async execute(interaction) {
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

    await interaction.reply({
      content: 'Select roles to play with.',
      components: [roleSelectRow],
      ephemeral: true,
    });
  },
};
