const express = require('express')
// const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')
const files = require('./routers/files')
const fileManager = require('./fileManagers/fileManager')

const app = express()
const publicPath = path.join(__dirname, '..', 'public')
const resourcesPath = path.join(__dirname, '..', 'resources')

// Heroku sets this
const port = process.env.PORT || 9000

app.use(express.static(publicPath))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/files', files)
app.use('/packages', express.static(resourcesPath))

// always just serve index.html on random routes
app.get('*', (req, resp) => {
    resp.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

// Start cleanup cycle every 30 minutes
setInterval(fileManager.intervalCleanup, 1800000)
