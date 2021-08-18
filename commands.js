const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token } = require('./config.json')

const commands = [{
  name: 'ping',
  description: 'Replies with Pong!'
}, {
  name: 'info',
  description: 'basic user info'
}, {
  name: 'createevent',
  description: 'creates an event',
  options: [
    {
      type: 3,
      name: 'name',
      description: 'event name'
    }, {
      type: 3,
      name: 'description',
      description: 'event description'
    }
  ]
}]; 

const clientId = '877338305983807518'
const guildId = '775797248416153610';

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();