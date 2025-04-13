const client = require("../../app");
const { prefix } = require("../../config.json");

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild || !message.content.startsWith(prefix)) return;

  const [comando, ...args] = message.content.slice(prefix.length).trim().split(/ +/)
  const cmd = client.prefixCommands.get(comando)

  if (!cmd) {
    try {
      await message.delete();
    } catch (error) {
      console.error(`Erro ao excluir a mensagem: ${error}`);
    }
    return;
  }

  try {
    await cmd.run(client, message, args);
    message.delete()
  } catch (error) {
    console.error(`Erro: ${error.stack}`);
  }
});