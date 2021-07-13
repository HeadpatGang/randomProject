const Discord = require('discord.js')
module.exports = client => {
    const prefixConfig = require('../../json/config.json')
    const prefix = prefixConfig.client.prefix
    const { 
        mysql,
        config,
        connection 
    } = require('../dataBaseConnection')

    client.on('message', message => {
        if(message.author.bot) return;
        if(!message.content.startsWith(prefix)) return;
        if(!message.content.toLowerCase().includes('deletefromdatabase')) return;
        let messageQuery = (message.content.split(' '))
        let deleteQuery = `DELETE FROM Leech WHERE playerName= '${messageQuery[1] + ' ' + messageQuery[2]}'`;
        let searchQuery = `SELECT * FROM Leech WHERE playerName = '${messageQuery[1] + ' ' + messageQuery[2]}'`;
        connection.query(searchQuery, function (error, result) {
            if (error) throw error;
            for(let i = 0; i < result.length; i++) {
                const addPlayerEmbed = new Discord.MessageEmbed()
                    .setColor('#006400')
                    .setTitle('Deleted this player')
                    .addFields(
                        { name: 'Player Name', value: `${result[i].playerName}`, inline: true},
                        { name: '\u200B', value: '\u200B', inline: true},
                        { name: 'Lured By', value: `${result[i].luredBy}`, inline: true},
                        { name: 'Loot from Lure', value: `${result[i].lootFromLure}`}
                    )
                    .setFooter(`Deleted By: ${message.author.id}, ${message.author.tag}`)
                    message.guild.channels.cache.get('840950781083779072').send(addPlayerEmbed)
            }
        });
        connection.query(deleteQuery, function (err) {
            if (err) throw err;
        });
    })
}