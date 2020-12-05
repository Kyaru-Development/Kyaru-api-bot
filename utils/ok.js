const {  MessageEmbed } = require("discord.js")
module.exports.ok = (message,text) =>  {
    message.channel.send(new MessageEmbed()
    .setTitle('<:sys:784785474026864640>Успешно')
    .setColor("GREEN")
    .setDescription(`**${message.author.username}**,${text}`)
    .setTimestamp())
   }