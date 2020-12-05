const { MessageEmbed } = require("discord.js")
const User = require("../user");
const { owners } = require('../config.json')

module.exports.run = async (bot, message, args) => {
    let usize = await User.countDocuments({});

    message.channel.send(new MessageEmbed()
    .setTitle('Информация про меня')
     .addField('Всего людей в базе',`\`${usize}\``)
     .addField('Создатели',`${owners.map(h=>`\`${bot.users.cache.get(h).username}\``).join(",")}`)
    .setColor("#20B2AA")
    .setTimestamp()
    )
   }
module.exports.help = {
       name: "info",
        description: 'Информация о апи',
       category: 'General',
}