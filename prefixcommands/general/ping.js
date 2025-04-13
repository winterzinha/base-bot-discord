module.exports = {
  name: "ping",
  aliases: ["ping"],

  run: (client, message) => {
    message.channel.send(`🏓 Pong, meu ping está em ${client.ws.ping}`)
    .then((msg) => {
      setTimeout(() => {
        msg.delete()
      }, 10000);
    })
  }
}

//If you want the message not to be deleted after the time, just remove the code from line 7 to line 11