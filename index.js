const express = require('express');
const app = express();
const router = require('./src/routes/routes')
const bodyParser = require('body-parser')
require('./db')

app.use(bodyParser.json())
app.use('/api', router)

app.listen(2000, () => {
    console.log(`2000 port running`)
})