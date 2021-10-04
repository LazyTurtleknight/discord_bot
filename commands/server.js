const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('server')
      .setDescription('Replies with server info!'),
  async execute(interaction) {
    await interaction.reply(
        `Server name: ${interaction.guild.name}\n`+
        `Server Birthday: ${interaction.guild.createdAt}\n`+
        `VIP Members: ${interaction.guild.memberCount}`);
  },
};
