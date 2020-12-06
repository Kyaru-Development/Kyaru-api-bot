const { owners } = require('../config.json')
module.exports.run = async (bot, message, args) => {
  if (!owners.includes(message.author.id)) {
    require("../utils/error").error(message, 'Вы не администратор')
    return
  }
  try {

    let toEval = args.join(' '), isAsync = false, noReply = false, last = false


    toEval = toEval
      .replace(/(```(js)?)?/g, '')
      .replace('+async', () => {
        isAsync = true;
        return ''
      })
      .replace(/(--noreply)|(--n)/g, () => {
        noReply = true;
        return ''
      })
      .replace(/(--last)|(--all)/g, () => {
        last = true;
        return ''
      })

    if (toEval.includes('await')) isAsync = true

    if (isAsync) toEval = '(async() => {' + toEval + '})()'

    let before = process.hrtime.bigint()
    let evaled = eval(toEval)

    if (noReply) return message.react('😎')

    if (require('util').types.isPromise(evaled)) evaled = await evaled

    let after = process.hrtime.bigint()

    if (typeof evaled !== 'string') evaled = require('util').inspect(evaled, { depth: 0, maxArrayLength: null })

    if (evaled === 'undefined' || evaled === 'null') return message.channel.send('LOL')

    if (evaled.length >= 1900) {
      if (!last) evaled = evaled.slice(0, 1900)
      else evaled = evaled
    }

    evaled =
      'Завершено в '
      + (after - before) +
      ' наносекунды или ' + (parseInt(after - before) / 1000000).toFixed(3) + 'ms\n'
      + evaled

    //  if (
    //  evaled.includes(bot.token)
    //   || evaled.includes(bot.config.tokens.database)
    //  ) return message.channel.send('токен не сливаем, окда ')

    message.channel.send(evaled, { code: 'js', split: true })

  } catch (e) {
    let err = `${e.name}\n${e.message}`
    if (err.length >= 1980) err = err.slice(0, 1980) + '...'
    message.reply(err)
    console.log(e)
  }

}
module.exports.help = {
  name: "eval",
  description: 'Выполнить код',
  category: 'Developer',
  using: '<code JavaScript>'

}
//eval by livixx
