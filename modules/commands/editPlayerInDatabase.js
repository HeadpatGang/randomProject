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
        if(!message.content.toLowerCase().includes('editthedatabase')) return;
        let messageQuery = (message.content.split(' '))
        console.log(messageQuery[1], messageQuery[2], messageQuery[3], messageQuery[4])
        let searchQuery = `SELECT * FROM Leech WHERE playerName = '${messageQuery[2] + ' ' + messageQuery[3]}'`;
        let editQuery = `UPDATE Leech SET ${messageQuery[1]} = '${messageQuery[4]}' WHERE playerName = '${messageQuery[2] + ' ' + messageQuery[3]}'`
        connection.query(searchQuery, function (error, result) {
            if (error) throw error;
            for(let i = 0; i < result.length; i++) {
                const editPlayerOriginalEmbed = new Discord.MessageEmbed()
                    .setColor('#006400')
                    .setTitle('Updating Player: Original Content')
                    .addFields(
                        { name: 'Player Name', value: `${result[i].playerName}`, inline: true},
                        { name: '\u200B', value: '\u200B', inline: true},
                        { name: 'Lured By', value: `${result[i].luredBy}`, inline: true},
                        { name: 'Loot from Lure', value: `${result[i].lootFromLure}`}
                    )
                    .setFooter(`Edited By: ${message.author.id}, ${message.author.tag}`)
                    message.guild.channels.cache.get('841025013406367784').send(editPlayerOriginalEmbed)
            }
        });
        connection.query(editQuery, function (err) {
            if (err) throw err;
        });
        connection.query(searchQuery, function(err, result) {
            for(let i = 0; i < result.length; i++) {
                const editPlayerUpdatedEmbed = new Discord.MessageEmbed()
                    .setColor('#006400')
                    .setTitle('Updating Player: Updated Content')
                    .addFields(
                        { name: 'Player Name', value: `${result[i].playerName}`, inline: true},
                        { name: '\u200B', value: '\u200B', inline: true},
                        { name: 'Lured By', value: `${result[i].luredBy}`, inline: true},
                        { name: 'Loot from Lure', value: `${result[i].lootFromLure}`}
                    )
                    .setFooter(`Edited By: ${message.author.id}, ${message.author.tag}`)
                    message.guild.channels.cache.get('840950795445075990').send(editPlayerUpdatedEmbed)
            }
        })
    })
}