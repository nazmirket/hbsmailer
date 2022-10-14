const nodemailer = require('nodemailer')
const renderer = require('./renderer')
const configs = require('./configs.json')

// TRANSPORT
const transport = nodemailer.createTransport({
   host: configs.server.host,
   port: configs.server.port,
   secure: true,
   auth: {
      user: configs.sender.address,
      pass: configs.sender.password,
   },
})

// SEND EMAIL
module.exports.send = async function (to, template, context) {
   const html = await renderer(template, context)
   return await new Promise(function (resolve, reject) {
      transport.sendMail(
         {
            to,
            from: {
               name: configs.sender.name,
               address: configs.sender.address,
            },
            subject: context.subject,
            html,
         },
         function (err, info) {
            if (err) return reject(err)
            resolve(info)
         }
      )
   })
}
