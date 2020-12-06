const { Client, Collection } = require("discord.js")
const bot = new Client()
const mongoose = require('mongoose');
const fs = require('fs')
const { token, prefix, mongodbURL } = require('./config.json')
bot.commands = new Collection()
mongoose.connect(mongodbURL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('err', err => {
  console.log(`[ MONGODB ] Errro ${err.stack}`);
});
mongoose.connection.on('disconnected', () => {
  console.log(`[ MONGODB ] Disconnected `);
});
mongoose.connection.on('connected', async () => {
  console.log(`[ MONGODB ] Connected ${mongoose.connection.name}`)
});
fs.readdir('./src/commands', (err, files) => {
  if (err) console.log(err)
  let jsfile = files.filter(f => f.split('.').pop() === 'js')
  if (jsfile.length <= 0) return console.log('[ COMMANDS ] No commands found ')
  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`)
    console.log(`[ COMMANDS ] Loaded commands ${props.help.name} successfully`)
    bot.commands.set(props.help.name, props);
  });
});
bot.on('ready', () => {
  console.log(`[ BOT START ] Bot started is ${bot.user.username}`);
});
bot.on('message', async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (!message.content.startsWith(prefix)) return;
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let cmdname = args.shift().toLowerCase()
  let cmd = bot.commands.get(cmdname)
  if (!cmd) return
  cmd.run(bot, message, args);
});
bot.login(token)