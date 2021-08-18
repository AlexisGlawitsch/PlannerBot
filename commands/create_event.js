const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createevent')
		.setDescription('Creates a new event')
    .addStringOption(option => option.setName('name').setDescription('Enter the name of the event.'))
    .addStringOption(option => option.setName('description').setDescription('Enter a description for the event.')),
    async execute(interaction) {
      const eventEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .addFields(
          { name: 'Regular field title', value: 'Some value here' },
          { name: '\u200B', value: '\u200B' },
          { name: 'Inline field title', value: 'Some value here', inline: true },
          { name: 'Inline field title', value: 'Some value here', inline: true },
        )
        .addField('Inline field title', 'Some value here', true)
        .setTimestamp();

      eventName = interaction.options.getString('name')
      if (eventName) {
        eventEmbed.setTitle(eventName);
      } else {
        eventEmbed.setTitle('Untitled Event');
      }

      eventDescription = interaction.options.getString('description')
      if (eventDescription) {
        eventEmbed.setDescription(eventDescription);
      }

      await interaction.reply({embeds: [eventEmbed], fetchReply: true}).then(async () => {
        const filter = m => interaction.user.id === m.author.id;

        if (!eventName) {
          await interaction.followUp({content: 'Please enter the name of the event.', ephemeral: true});

          interaction.channel.awaitMessages({ filter, time: 30000, max: 1, errors: ['time'] })
            .then(messages => {
              interaction.followUp(`You've entered: ${messages.first().content}`);
            })
            .catch(() => {
              interaction.followUp('Event creation session timed out.')
            });
        }
      });
	  },
};