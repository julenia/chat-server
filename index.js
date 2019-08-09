const express = require('express')
const Sse = require('json-sse')
const bodyParser = require('body-parser')
const cors = require('cors')

const messages = ['hello world']
const data=JSON.stringify(messages)

const sse = new Sse(data)

const app = express()
const middleware = cors()
app.use(middleware)
const jsonParser = bodyParser.json()
app.use(jsonParser)

app.get('/stream', sse.init)

app.post('/message', (req, res) => {
  const { message } = req.body
  messages.push(message)

  const data = JSON.stringify(messages)
  sse.updateInit(data)
  sse.send(data)

  res.send(message)
})

const port = process.env.PORT || 5000

app.listen(port, ()=> console.log(`Listening on :${port}`))