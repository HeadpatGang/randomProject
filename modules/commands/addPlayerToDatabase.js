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
        if(!message.content.toLowerCase().includes('addtodatabase')) return;
        let messageQuery = (message.content.split(' '))
        console.log(messageQuery[1] + ' ' + messageQuery[2], messageQuery[3], messageQuery[4])
        let addQuery = `INSERT INTO Leech (playerName, luredBy, lootFromLure) VALUES ('${messageQuery[1] + ' ' + messageQuery[2]}', '${messageQuery[3]}', '${messageQuery[4]}')`;
        let searchQuery = `SELECT * FROM Leech WHERE playerName = '${messageQuery[1] + ' ' + messageQuery[2]}'`;
        connection.query(addQuery, function (err, result) {
            if (err) throw err; 
        });
        connection.query(searchQuery, function (err, result) {
            console.log('Gets this far')
            console.log(result)
            console.log(messageQuery[1] + ' ' + messageQuery[2])
            if (err) throw err;
            for(let i = 0; i < result.length; i++) {
                const addPlayerEmbed = new Discord.MessageEmbed()
                    .setColor('#006400')
                    .setTitle('Added this Player')
                    .addFields(
                        { name: 'Player Name', value: `${result[i].playerName}`, inline: true},
                        { name: '\u200B', value: '\u200B', inline: true},
                        { name: 'Lured By', value: `${result[i].luredBy}`, inline: true},
                        { name: 'Loot from Lure', value: `${result[i].lootFromLure}`}
                    )
                    .setFooter(`Added by: ${message.author.id}, ${message.author.tag}`)
                    message.guild.channels.cache.get('840958458333233153').send(addPlayerEmbed)
            }
        });
    })
}

