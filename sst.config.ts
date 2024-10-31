/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
   app(input) {
      return {
         name: process.env.APP_NAME,
         removal: 'remove',
         home: 'aws',
         providers: {
            aws: {
               profile: 'hexcode',
               // profile: input.stage === 'production' ? 'hexcode-production' : 'hexcode-development'
            },
         },
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
