const express = require('express')
const expressHandlebars = require('express-handlebars')
// const fortune = require('./lib/fortune')
const handlers = require('./lib/handlers')
const getWeatherData = require('./lib/middleware/getWeatherData')


const app = express()
/* eslint-disable  */
const port = process.env.PORT || 3000

// route all to public
app.use(express.static(__dirname + '/public')) 
/* eslint-disable */

// define rendering enging as handlebars and set default layout path
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
  helpers: {
    section: function(name, options) {
      if(!this._sections) this._sections = {}
      this._sections[name] = options.fn(this)
      return null
    },
  },
}))
app.set('view engine', 'handlebars') 
app.use(getWeatherData)
app.get('/', handlers.home)

app.get('/about', handlers.about)
app.get('/section-test', handlers.sectionTest)
//custom 404 page
app.use(handlers.notFound)
// custom 500 page 
app.use(handlers.serverError)


// app.listen(port, () => console.log(
//   `Express started on http://localhost: ${port}; ` 
//   + 'press Ctrl-C to terminate.')
// )

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Express started on http://localhost: ${port}; `
    + 'press Ctrl-C to terminate.')
  })
} else {
    module.exports = app
}
