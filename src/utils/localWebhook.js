/**
 * Start a local server and configure a webhook
 *
 * !! DO NOT RUN THIS FILE IN PRODUCTION !!
 */
;(async () => {
   const axios = require('axios')
   const express = require('express')()
   const bodyParser = require('body-parser')
   const ngrok = require('ngrok')
   const webhook = require('../../api/webhook')
   require('dotenv').config()

   const url = await ngrok.connect(process.env.PORT)

   const debug = process.env.ENV === 'dev'
   const data = {
      url: debug ? `${url}` : `xleddybot.vercel.app/api/webhook`,
   }

   try {
      const res = await axios({
         method: `POST`,
         url: `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/setWebhook`,
         headers: { 'Content-type': 'application/json' },
         data,
      })
      console.log({ ...res.data, webhook: url })
   } catch (e) {
      console.log(e)
   }

   express.post('', bodyParser.json(), async (req, res) => {
      try {
         await webhook(req, res)
      } catch (e) {
         console.log(e)
      }
   })

   express.listen(process.env.PORT, () => {
      console.log('Ready! 🚀')
   })
})()
