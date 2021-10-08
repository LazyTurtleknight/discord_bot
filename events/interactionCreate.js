module.exports = {
  name: 'interactionCreate',
  execute(interaction) {
    console.log(`${interaction.user.tag} in #${interaction.channel.name} ` +
    `triggered an interaction.`);

    // command handler
    if (interaction.isCommand()) {
      const command = interaction.client.commands.get(
          interaction.commandName);

      // return if command does not exist
      if (!command) return;

      // reply by executing appropriate command
      try {
        command.execute(interaction);
      } catch (error) {
        console.error(error);
        interaction.reply({
          content: 'There was an error while executing this command',
          ephemeral: true});
      }
    } else if (interaction.isSelectMenu()) {
      const SelectMenuEvent = interaction.client.selectMenu
          .get(interaction.component.customId);

      // return if isSelectMenuEvent does not exist
      if (!SelectMenuEvent) return;

      // reply by executing
      try {
        SelectMenuEvent.execute(interaction);
      } catch (error) {
        console.error(error);
        interaction.reply({
          content: 'There was an error while executing this command',
          ephemeral: true});
      }
    } else if (interaction.isButton()) {
      const buttonEvent = interaction.client.buttons
          .get(interaction.component.customId);

      // return if isSelectMenuEvent does not exist
      if (!buttonEvent) return;

      // reply by executing
      try {
        buttonEvent.execute(interaction);
      } catch (error) {
        console.error(error);
        interaction.reply({
          content: 'There was an error while executing this command',
          ephemeral: true});
      }
    }
  },
};
