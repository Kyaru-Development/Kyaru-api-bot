const {Client,Collection} = require("discord.js")
const bot = new Client()
const mongoose = require('mongoose');
const fs = require('fs')
const config = require('./config.json')
bot.commands = new Collection()
mongoose.connect(config.mongodbURL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('err', err => {
     console.log(`[MONGODB] Errro ${err.stack}`);
});
mongoose.connection.on('disconnected', () => {
    console.log(`[MONGODB] Disconnected `);
});
mongoose.connection.on('connected', async () => {
    console.log(`[MONGODB] Connected ${mongoose.connection.name}.`)
});
fs.readdir('./commands', (err, files) => {
  if (err) console.log(err)
  let jsfile = files.filter(f => f.split('.').pop() === 'js')
  if (jsfile.length <= 0) return console.log('Команды не найдены!')
  console.log(`Загружено ${jsfile.length} команд`)
  jsfile.forEach((f, i) => { 
      let props = require(`./commands/${f}`)
      bot.commands.set(props.help.name, props);
  });
});
bot.on('message', async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  if(!message.content.startsWith(config.prefix)) return;
  let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  let  cmd = args.shift().toLowerCase();
   let commandfile = bot.commands.get(cmd);
  if(commandfile) commandfile.run(bot, message, args);
});
bot.login(config.token)
 
