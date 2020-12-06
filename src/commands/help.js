
const { MessageEmbed } = require("discord.js")
const { prefix } = require('../config.json')
module.exports.run = async (bot, message, args) => {
   function cmdslist() {
      message.channel.send(new MessageEmbed()
         .setTitle("📄Все мои команды")
         .addField(`General `, bot.commands.filter(h => h.help.category === 'General').map(a => `\`${prefix}${a.help.name} ${a.help.using}\` - ${a.help.description}`).join("\n"))
         .addField(`Developer `, bot.commands.filter(h => h.help.category === 'Developer').map(a => `\`${prefix}${a.help.name} ${a.help.using}\` - ${a.help.description}`).join("\n"))
         .setColor("#20B2AA")
         .setTimestamp())
   }
   if (!args[0]) {
      cmdslist()
   } else {
      if (!bot.commands.get(args[0])) {
         cmdslist()
         return
      }
      let cmd_info = bot.commands.get(args[0])
      message.channel.send(new MessageEmbed()
         .setTitle(`Информация о команде ${args[0]}`)
         .addField('Описание', cmd_info.help.description)
         .addField('Категория', cmd_info.help.category)
         .addField('Использование', cmd_info.help.using)
         .setColor("#20B2AA")
         .setTimestamp())
   }


}

module.exports.help = {
   name: "help",
   description: 'Все мои команды',
   category: 'General',
   using: '<commands name>'
}