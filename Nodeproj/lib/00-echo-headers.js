const app = require("../meadowlark");
//use to return local req header from current browser
app.get('/headers', (req,res) => {
  res.type('text/plain')
  const headers = Object.entries(req.headers)
  .map(([key, value]) => `${key}: ${value}`)
  res.send(headers.join('\n'))
})