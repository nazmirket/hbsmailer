const hbs = require('express-handlebars').create()

module.exports = async function (template, context) {
   const path = `templates/${template}.hbs`
   const html = await hbs.render(path, context)
   return html
}
