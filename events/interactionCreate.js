module.exports = {
  name: 'interactionCreate',
  execute(interaction) {
    console.log(`${interaction.user.tag} in #${interaction.channel.name}` +
    `triggered an interaction.`);

    // command handler
    // return if interaction is not a command
    if (!interaction.isCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

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
  },
};
