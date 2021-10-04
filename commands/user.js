const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('user')
      .setDescription('Replies with user info!'),
  async execute(interaction) {
    await interaction.reply(
        `User name: ${interaction.user.username}\n`+
        `VIP Member since: ${interaction.member.joinedAt}`);
  },
};
