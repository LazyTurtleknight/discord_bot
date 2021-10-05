const {SlashCommandBuilder} = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);

const verbs = [
  'encounter ',
  'steal ',
  'adopt ',
];

const quantities = [
  'two ',
  'three ',
  'finite ',
];

const nouns = [
  'dogs.',
  'apes.',
  'kids.',
];

/**
 * The fortune teller will initially send 'You' and then edit the
 * message based on the randomly constucted reply.
 */
module.exports = {
  data: new SlashCommandBuilder()
      .setName('fortuneteller')
      .setDescription('Tells you how much the bot is suffering today.'),
  async execute(interaction) {
    const replyArray = constructAnswer();
    let reply = 'You ';
    await interaction.reply(reply);
    for (const string of replyArray) {
      await wait(1000);
      reply += string;
      await interaction.editReply(reply);
    }
  },
};

/**
 * Constructs a simple array of strings that will form the reply for the
 * fortune teller.
 * @return {Array} constructed reply as array
 */
function constructAnswer() {
  const verbsIndex = Math.floor(Math.random() * verbs.length);
  const quantitiesIndex = Math.floor(Math.random() * quantities.length);
  const nounsIndex = Math.floor(Math.random() * nouns.length);
  const reply = [];
  reply.push(verbs[verbsIndex]);
  reply.push(quantities[quantitiesIndex]);
  reply.push(nouns[nounsIndex]);
  return reply;
}
