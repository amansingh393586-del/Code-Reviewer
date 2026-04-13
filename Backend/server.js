// require('dotenv').config()
import 'dotenv/config'
// const app = require('./src/app')
import app from './src/app.js'



app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})