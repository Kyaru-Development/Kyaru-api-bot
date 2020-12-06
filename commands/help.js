const { MessageEmbed } = require("discord.js")

 module.exports.run = async (bot, message, args) => {
    message.channel.send(new MessageEmbed()
    .setTitle("📄Все мои команды")
    .addField(`General `,bot.commands.filter(h=>h.help.category === 'General').map(a=>`\`!${a.help.name}\` - ${a.help.description}`).join("\n"))
    .addField(`Developer `,bot.commands.filter(h=>h.help.category === 'Developer').map(a=>`\`!${a.help.name}\` - ${a.help.description}`).join("\n"))
    .setColor("#20B2AA")
    .setTimestamp())
   }
module.exports.help = {
       name: "help",
        description: 'Все мои команды',
       category: 'General',
}