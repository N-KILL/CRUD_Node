const path = require('path')
const data = require('dotenv').config({
    path: path.resolve(__dirname, `../enviroments/.env.${process.env.NODE_ENV}`)
})

module.exports = {
    PORT: data.parsed.PORT,
    API: data.parsed.ROOT_API,
    FILE_LOCATION: data.parsed.FILE_LOCATION,
    DATABASE: data.parsed.DATABASE
}