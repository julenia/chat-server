const express = require('express')
const Sse = require('json-sse')
const bodyParser = require('body-parser')

const data = 'hello world'

const sse = new Sse(data)

const app = express()
const jsonParser = bodyParser.json()
app.use(jsonParser)

app.get('/stream', sse.init)

app.post('/message', (req, res) => {
  const { message } = req.body
  sse.send(message)
  res.send(message)
})

const port = process.env.PORT || 5000

app.listen(port, ()=> console.log(`Listening on :${port}`))