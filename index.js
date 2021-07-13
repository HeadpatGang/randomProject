const Discord = require('discord.js')
const { 
    databaseConnection,
    commandHandler,
} = require('./modules')

const client = new Discord.Client();
require('dotenv').config()
const discordAuthToken = process.env.discordAuthToken;

client.on('ready', () => {
    console.log(`Client has logged into ${client.guilds.cache.size} Guilds`)
    client.user.setPresence({
        status: 'online',
        activity: {
            name: 'Money',
            type: 'COMPETING',
            url: 'https://www.youtube.com/user/MLGAnixie'
        }
    })
    databaseConnection(client)
    commandHandler(client)
})

client.login(discordAuthToken)