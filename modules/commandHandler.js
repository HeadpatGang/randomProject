const fs = require('fs');
const Discord = require('discord.js');
const config = require('../json/config.json')
const prefix = config.client.prefix;
module.exports = client => {
    client.commands = new Discord.Collection();
    const commandFolder = fs.readdirSync('./modules/commands');
    for (const file of commandFolder) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);  
    }

    client.on('message', message => {
        if(message.author.bot) return;
        if(!message.content.startsWith(prefix)) return;
        const args = message.content.slice(prefix.length).trim().split(/\r|\n| +/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName) 
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if(!command) return;
        if(command.args && !args.length) {
            let reply = `You did not provide any arguements for the ${commandName} command, ${message.author}\n This message will delete in 5 seconds`;
            message.delete();
            return message.channel.send(reply)
            .then(msg => {
                msg.delete({ timeout: 5000 });
            })
            .catch();
        }
        try {
            command.execute(message, args);
        } catch (err) {
            console.error(err);
            message.reply(`There was a problem, check the log`)
        }
    })
}

