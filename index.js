const express = require('express')
const Sse = require('json-sse')
const bodyParser = require('body-parser')

const messages = ['hello world']

const sse = new Sse(messages)

const app = express()
const jsonParser = bodyParser.json()
app.use(jsonParser)

app.get('/stream', sse.init)

app.post('/message', (req, res) => {
  const { message } = req.body
  messages.push(message)

  sse.updateInit(messages)
  sse.send(message)
  
  res.send(message)
})

const port = process.env.PORT || 5000

app.listen(port, ()=> console.log(`Listening on :${port}`))