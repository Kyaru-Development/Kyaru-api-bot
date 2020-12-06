
const User = require("../schemas/User");
const { owners } = require('../config.json')
const { MessageEmbed } = require("discord.js");
module.exports.run = async (bot, message, args) => {
    if (!owners.includes(message.author.id)) {
        require("../utils/error").error(message, 'Вы не администратор')
        return
    }
    function randoma(length = 40) {
        var result = "";
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    if (args[0] === 'send') {
        if (!args[1]) return require("../utils/error").error(message, 'Укажите пользователя')
        if (!bot.guilds.cache.get("771254053246205952").members.cache.get(args[0])) return require("../utils/error").error(message, 'Этого пользователя нету на сервере **Kyaru Development**')
        let u = await User.findOne({ userID: args[0] })
        if (u) return require("../utils/error").error(message, 'У данного пользователя уже есть токен для доступа к API')
        bot.users.cache.get(args[1]).send(`You token for **https://kyaru-api.ml** \n\n\`${randoma()}\`\n\nDo **NOT** share this with anyone but yourself.`).catch(h => require("../utils/error").error(message, 'Ошибка отправки,у данного пользователя закрыт лс'))
        User.create({ userID: args[1], api_key: randoma() })
    }
    if (args[0] === 'delete') {
        let u = await User.findOne({ userID: args[0] })
        if (!args[1]) return require("../utils/error").error(message, 'Укажите пользователя')
        if (!u) return require("../utils/error").error(message, 'Такого пользователя не знаю')
        User.deleteOne({ userID: args[1] }).catch(h => console.log(h))
        require("../utils/ok").ok(message, ` Пользователя: (\`${args[1]}\`) ,Токен для доступа к API был удалён успешно`)
    }
    if (args[0] === 'list') {
        let u = await User.find({});
        let usize = await User.countDocuments({});
        message.channel.send(new MessageEmbed()
            .setAuthor('Информация о токенах')
            .addField("Количество токенов ", `\`${usize}\``)
            .setColor("GREEN")
            .setTimestamp())
        //u.forEach(h=>
        //message.channel.send(`ID - (\`${h.userID}\`)\nAPI-KEY - ||\`${h.api_key}\`||`))

    }
}
module.exports.help = {
    name: "api",
    description: 'Команды для управлением апи',
    category: 'Developer',
    using: '<send/delete/list> <user id>'
}