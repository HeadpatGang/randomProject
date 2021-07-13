module.exports = function(playerName, message, messageFilter) {
    this.collectedMessages = [`${playerName}`];
    const questions = [
        "Time Zone?",
        "What roles can you do?"
    ]
    let currentQuestion = 0

    const collector = message.channel.createMessageCollector(messageFilter, {
        max: questions.length,
        time: 1000 * 15 
    })

    message.channel.send(questions[currentQuestion++])
    collector.on('collect', m => {
        if (currentQuestion < questions.length) {
                m.channel.send(questions[currentQuestion++])
        }
    })

    collector.on('end', collected => {
        console.log(`Collected ${collected.size}`)
        message.reply(`Player Name: ${playerName} added`)
        collected.forEach((value) => {
            collectedMessages.push(value.content)
        })
        exportMessages(collectedMessages)
    })

    function exportMessages(collectedMessagesNew) {
        exports.collectedMessagesNew = collectedMessagesNew;
        console.log(collectedMessagesNew)
    }
}