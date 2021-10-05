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
          .setRequired(true))
      .addBooleanOption((option) => option
          .setName('hidden')
          .setDescription('Shall the answer only be seen by you ?.')),
  async execute(interaction) {
    const lowerBound = interaction.options.getInteger('lowerbound');
    const upperBound = interaction.options.getInteger('upperbound');
    const ephemeral = interaction.options.getBoolean('hidden');
    if (lowerBound >= upperBound) {
      await interaction.reply({
        content: `You are a funny one huh.\n`+
        `Try again :)\n`+
        `The lower bound should be bigger than the upper bound.`,
        ephemeral: ephemeral});
    } else {
      const min = Math.ceil(lowerBound);
      const max = Math.floor(upperBound);
      const answer = Math.floor(Math.random() * (max - min +1)) + min;
      await interaction.reply({
        content: `It is a ${answer}.`,
        ephemeral: ephemeral});
    }
  },
};
