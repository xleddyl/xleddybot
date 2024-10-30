/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
   app(input) {
      return {
         name: process.env.APP_NAME,
         removal: 'remove',
         home: 'aws',
      }
   },
   async run() {
      const api = new sst.aws.ApiGatewayV2('xleddylbot_api')
      api.route('POST /', {
         handler: 'functions/index.echo',
         environment: {
            BOT_TOKEN: process.env.BOT_TOKEN,
         },
      })
   },
})
