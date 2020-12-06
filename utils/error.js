 
const {  MessageEmbed } = require("discord.js")
module.exports.error = (message,text) =>  {
    message.channel.send(new MessageEmbed()
    .setTitle('<:error:784767196928540704>Произошла ошибка при выполнении команды')
    .setColor("RED")
    .setDescription(`**${message.author.username}**,${text}`)
    .setTimestamp())
}