const { MessageEmbed } = require('discord.js')
module.exports = function(result) {
    console.log('Checkpoint #5')
    this.result = result;
    this.searchEmbed = new MessageEmbed()
        .setColor('#000000')
        .setTitle('Default Title')
        .addFields(
            { name: 'Player Name', value: `${result[0].playerName}`, inline: true},
            { name: '\u200B', value: '\u200B', inline: true},
            { name: 'Time Zone', value: `${result[0].timeZone}`, inline: true},
            { name: 'Roles', value: `${result[0].raidRoles}`}
        )    
}