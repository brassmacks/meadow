const express = require('express')
const ExpressHandlebars = require('express-handlebars')
const fortune = require('./lib/fortune')
const handlers = require('./lib/handlers')



const app = express()
const port = process.env.PORT || 3000

// route all to public
app.use(express.static(__dirname + '/public')) 

// define rendering enging as handlebars and set default layout path
app.engine('handlebars', ExpressHandlebars({
  defaultLayout: 'main',
}))
app.set('view engine', 'handlebars') 


app.get('/', handlers.home)

app.get('/about', handlers.about)
//custom 404 page
app.use(handlers.notFound)
// custom 500 page 
app.use(handlers.serverError)

app.listen(port, () => console.log(
  `Express started on http://localhost: ${port}; ` 
  + 'press Ctrl-C to terminate.')
)

