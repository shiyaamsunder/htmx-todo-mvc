const express = require('express')
const app = express()

app.use(express.static('public'))

app.get('/test', (_, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.write('<h2> the route is working </h2>')
  res.end()
})

app.listen(8080, (err) => {
  if (err) console.log(err)
  console.log('Server running at http://localhost:8080')
})
