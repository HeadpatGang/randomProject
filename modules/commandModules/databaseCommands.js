const { connection } = require('../dataBaseConnection')
const embedGenerator = require('../embedGenerators/globalEmbed')
const messageCollection = require('./messageCollection')
const Discord = require('discord.js')

module.exports = {
    search: function(playerName, message) {
        console.log('Checkpoint #1')
        let searchQuery = `SELECT * FROM Leech WHERE playerName = '${playerName}'`
        connection.query(searchQuery, function(err, result) {
            if (err) throw err;
            if(result.length === 0) {
                message.reply(`${playerName} not found in the database`)
                message.delete()
            } else {
                embedGenerator(result, message, Discord)
                searchEmbed.setTitle('Found this player')
                searchEmbed.setColor('#FF69B4')
                message.guild.channels.cache.get('840780360307834910').send(searchEmbed) 
            }
        })
    },
    add: function(playerName, message) {
        const messageFilter = m => m.author.id === message.author.id
        message.reply(`You wish to add Player: ${playerName}?\n reply Yes or No (case sensitive)\n Please answer in the next 10 seconds`).then(() => {
            message.channel.awaitMessages(messageFilter, { 
                max: 1,
                time: 1000 * 10,
                errors: ['time']
            })
            .then(message => {
                message = message.first()
                if(message.content === 'Yes') {
                    messageCollection(playerName, message, messageFilter, Discord)
                }
            })
        })
    },
    delete: function() {
    },
    modify: function() {
    }
};