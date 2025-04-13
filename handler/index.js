const fs = require("fs")

module.exports = async (client) => {

  const SlashsArray = []

  fs.readdir(`././slashcommands/`, (erro, pasta) => {
    pasta.forEach(subpasta => {
      fs.readdir(`././slashcommands/${subpasta}/`, (erro, arquivos) => {
        arquivos.forEach(arquivo => {
          if (!arquivo?.endsWith('.js')) return;
          arquivo = require(`../slashcommands/${subpasta}/${arquivo}`);
          if (!arquivo?.name) return;
          client.slashCommands.set(arquivo?.name, arquivo);
          SlashsArray.push(arquivo)
        });
      });
    });
  });

  client.on("ready", async () => {
    client.application.commands.set(SlashsArray);
  });

  fs.readdir(`././prefixcommands/`, (erro, pastas) => {
    pastas.forEach(subpastas => {
      fs.readdir(`././prefixcommands/${subpastas}/`, (erro, arquivos) => {
        arquivos.forEach(arquivo => {
          if (!arquivo?.endsWith('.js')) return;
          comando = require(`../prefixcommands/${subpastas}/${arquivo}`);
          client.prefixCommands.set(arquivo.replace(/.js/g, ""), comando);
          if (comando?.aliases?.length) {
            comando.aliases.forEach(cmd => client.prefixCommands.set(cmd, comando))
          }
        });
      });
    });
  });

  fs.readdir(`././events/`, (erro, pastas) => {
    pastas.forEach(subpastas => {
      fs.readdir(`././events/${subpastas}/`, (erro, arquivos) => {
        arquivos.forEach(arquivo => {
          if (!arquivo.endsWith('.js')) return; require(`../events/${subpastas}/${arquivo}`);
        });
      });
    });
  });
};