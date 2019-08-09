const express = require('express')

const app = express()
const port = process.env.PORT || 5000

app.listen(5000, ()=> console.log(`Listening on :${port}`))