const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('rng')
      .setDescription('Generate a random number.')
      .addIntegerOption((option) => option
          .setName('lowerbound')
          .setDescription('Smallest possible number.')
          .setRequired(true))
      .addIntegerOption((option) => option
          .setName('upperbound')
          .setDescription('Biggest possible number.')
          .setRequired(true)),
  async execute(interaction) {
    const lowerBound = interaction.options.getInteger('lowerbound');
    const upperBound = interaction.options.getInteger('upperbound');
    if (lowerBound >= upperBound) {
      await interaction.reply(
          `You are a funny one huh.\n` +
          `Try again :)`);
    } else {
      const min = Math.ceil(lowerBound);
      const max = Math.floor(upperBound);
      const answer = Math.floor(Math.random() * (max - min +1)) + min;
      await interaction.reply(
          `It is a ${answer}.`);
    }
  },
};
