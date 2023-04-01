process.env.NTBA_FIX_319 = 'test'

import { TelegenTS, Types } from '@xleddyl/telegen-ts'
import { MongoClient } from 'mongodb'
import dayjs = require('dayjs')
import utc = require('dayjs/plugin/utc')
import tz = require('dayjs/plugin/timezone')

dayjs.extend(utc)
dayjs.extend(tz)
dayjs.tz.setDefault('Europe/Rome')

try {
   require('dotenv').config()
} catch (e) {
   // do nothing
}

const _telegramtoken = process.env.TELEGRAM_TOKEN || ''
const _mongo = process.env.MONGO || ''

const _bot = new TelegenTS(_telegramtoken)
const _mongoClient = new MongoClient(_mongo)

module.exports = async (req: any, res: any) => {
   const update: Types.Update = req.body

   try {
      await _mongoClient.connect()
      if (update.message) await messageHandler(update.message, update)
      await _mongoClient.close()
   } catch (e) {
      console.log(e)
   }

   res.send()
}

/** FUNCTIONS */

async function messageHandler(message: Types.Message, update: Types.Update) {
   if (message.entities) return await parseEntities(message, message.entities)

   // placeholder
   await _bot.sendMessage(`🧙🏼‍♂️`, message.chat.id, {
      reply_to_message_id: message.message_id,
   })
}

async function parseEntities(message: Types.Message, entities: Types.MessageEntity[]) {
   for (let entity of entities) {
      if (entity.type === 'bot_command') {
         if (message.text === '/start') {
            const user = message.from

            const collection = _mongoClient.db('xleddybot').collection('users')
            if (!user) return
            else if (await collection.findOne({ id: user.id })) collection.replaceOne({ id: user.id }, user)
            else await collection.insertOne(user)

            await _bot.sendMessage(`welcome, ${user.first_name} 🧙🏼‍♂️`, message.chat.id)
            return
         } else if (message.text?.startsWith('/gtt ')) {
            const payload = message.text.replace('/gtt ', '')
            const result = convertGttDate(payload)
            await _bot.sendMessage(result, message.chat.id, { parse_mode: 'MarkdownV2' })
         }
      }
   }
}

function convertGttDate(payload: string): string {
   const datePattern = 'YYYY-MM-DD HH:mm'
   const gttEpoch = 1104534000 // seconds from unix epoch
   const hexRegexp = /[0-9A-Fa-f]{6}/g

   if (payload === 'info') return `${datePattern}\nor\n6 digits HEX number`
   if (payload === 'now') return `\`${Math.floor((dayjs(dayjs.tz(undefined).format(datePattern), datePattern).unix() - gttEpoch) / 60).toString(16).toUpperCase()}\``
   if (payload.match(hexRegexp)) return `\`${dayjs.unix(parseInt(payload, 16) * 60 + gttEpoch).format(datePattern)}\``
   else return `\`${Math.floor((dayjs(payload, datePattern).unix() - gttEpoch) / 60).toString(16).toUpperCase()}\``
}
