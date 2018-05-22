// Dependencies
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

// Components
const productsRoutes = require('./routes/products')

const app = express()

// Settings
app.set('port', process.env.PORT || 3000)
app.set('json spaces', 4)

// Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// Enable CORS
app.use(cors())

// Routes
app.use('/products', productsRoutes)

// Start server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'))
})
