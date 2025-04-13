const { Client, GatewayIntentBits, Collection } = require("discord.js")
const { token } = require('./config.json')

const client = new Client({
  intents: [
    1, 512, 32768, 2, 128,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMessageReactions,
  ]
});

module.exports = client;

client.slashCommands = new Collection();
client.prefixCommands = new Collection();

require("./handler")(client);

client.on('ready', () => {
  console.log(`${client.user.username} está online.`);
});

client.login(token);

// anti-crash, prevents the bot from shutting down if something goes wrong.
process.on('multipleResolutions', (type, reason, promise) => {
  console.log(`🔴 Erro Detectado\n\n` + type, promise, reason)
});

process.on('unhandledRejection', (reason, promise) => {
  console.log(`🔵 Erro Detectado:\n\n` + reason, promise);
});

process.on('uncaughtException', (error, origin) => {
  console.log(`🟡 Erro Detectado:\n\n` + error.stack, origin)
});

process.on('uncaughtExceptionMonitor', (error, origin) => {
  console.log(`🚫 Erro Detectado:\n\n` + error.stack, origin)
});