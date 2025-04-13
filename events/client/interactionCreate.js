const client = require("../../app");

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const cmd = client.slashCommands.get(interaction.commandName);
  if (!cmd) return;

  try {
    await cmd.run(client, interaction);
  } catch (err) {
    console.error(`Erro ao executar o comando ${interaction.commandName}:`, err);
  }
});
