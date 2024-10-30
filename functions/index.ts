import { TelegenTS, Types } from '@xleddyl/telegen-ts'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

export const echo = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
   const bot = new TelegenTS({ token: process.env.BOT_TOKEN })
   const update: Types.Update = JSON.parse(event.body)

   bot.sendMessage(
      {
         chat_id: update.message.chat.id,
         text: update.message.text,
      },
      {
         protect_content: true,
      }
   )

   return {
      statusCode: 200,
      body: JSON.stringify('{}'),
   }
}
