const databaseCommands = require('../commandModules/databaseCommands')
module.exports = {
  name: 'search',
  aliases: ['query', 'find'],
  description: 'Finds people in the Database',
  args: 'true',
  execute(message, args) {
    let playerName = args.join(' ')
    databaseCommands.search(playerName, message)
  }
}