const gameInstance = require('../../werewolf/WerewolfGame');
const {MessageActionRow, MessageButton, MessageEmbed} =
    require('discord.js');

module.exports = {
  name: 'joinWerewolf',
  execute(interaction) {
    console.log(`${interaction.user.tag} in #${interaction.channel.name} ` +
    `tried to join the game.`);
    // add player to game container
    gameInstance.addPlayer(interaction.member.user.id);
    // button to start the game
    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('startWerewolf')
                .setLabel('Start')
                .setStyle('SUCCESS'),
        );
    // collect username by their id saved in the game container
    let playerNames = '';
    gameInstance.players.forEach((player) => {
      playerNames += interaction.client.users.cache.get(player).username;
    });
    // display players
    const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Players')
        .setDescription(`${playerNames}`);

    interaction.update({
      content: interaction.message.content,
      components: [interaction.message.components[0], row],
      embeds: [embed],
    });
  },
};
