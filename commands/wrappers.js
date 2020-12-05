const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot, message, args) => {
    message.channel.send(new MessageEmbed()
    .setTitle('⚙️Wrappers')
    .addField('Python',`**Author**: [perssBest](https://github.com/perssBest)
    **Github-code**: https://github.com/Kyaru-Development/Kyaru-api.py`)
    .addField('NodeJS',`**Author**: [perssBest](https://github.com/perssBest)
    **Github-code**: https://github.com/Kyaru-Development/Kyaru-api.js`)
    .setColor("#20B2AA")
    .setTimestamp()
    )
   }
module.exports.help = {
       name: "wrappers",
        description: 'Узнать о всех wrappers для апи',
       category: 'General',
}