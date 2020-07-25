let express = require('express')


let app = express()

app.use('/', require('./routes/login'))

let port = process.env.PORT || 8888
console.log(`Listening on port ${port}. Go /login to initiate authentication flow.`)
app.listen(port)