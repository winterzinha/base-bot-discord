const Discord = require('discord.js');

module.exports = {
  name: 'avatar',
  description: 'Veja o avatar de um usuário ou o seu próprio.',
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'user',
      description: 'Escolha o membro do qual deseja ver o avatar',
      type: Discord.ApplicationCommandOptionType.User,
      required: false,
    }
  ],

  run: async (client, interaction) => {
    await interaction.deferReply();
  //await interaction.deferReply({ flags: Discord.MessageFlags.Ephemeral }), if you want the command to be sent ephemeral

    const member = interaction.options.getMember("user") || interaction.member;
    const user = member.user;
    
    const avatar = user.displayAvatarURL({ dynamic: true, size: 4096 });

    const embed = new Discord.EmbedBuilder()
      .setColor('Green')
      .setDescription(`**Avatar de ${user.username}**`)
      .setImage(avatar)
      .setFooter({ 
        text: `Requisitado por: ${interaction.user.username}`, 
        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
      });

    interaction.editReply({ embeds: [embed] });
  }
};
