const express = require('express')
const app = express()
const cors = require('cors')
const router = require("./router/router");
app.listen(4000)
app.use(cors())
app.use(express.json())

app.use('/', router)