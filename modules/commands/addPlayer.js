const databaseCommands = require('../commandModules/databaseCommands')
module.exports = {
  name: 'add',
  aliases: ['import', 'insert'],
  description: 'Adds people to the Database',
  args: 'true',
  execute(message, args) {
    let playerName = args.join(' ')
    databaseCommands.add(playerName, message)
  }
}