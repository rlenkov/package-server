const express = require('express')
// const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const publicPath = path.join(__dirname, '..', 'public')

// Heroku sets this
const port = process.env.PORT || 5000

app.use(express.static(publicPath))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// app.use('/items', items)
// app.use('/users', users)
// app.use('/groups', groups)
// app.use('/user_groups', userGroups)
// app.use(general)

// always just serve index.html on random routes
app.get('*', (req, resp) => {
    resp.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
