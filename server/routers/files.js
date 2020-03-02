const express = require('express')
const fileManager = require('../fileManagers/fileManager')

const router = express.Router()

router.get('/ls', async (req, res) => {
    try {
        const files = await fileManager.listFiles()
        console.log(files)
        res.json({ files })
    } catch (e) {
        console.error(e)
        res.status(404).send(e)
    }
})

router.post('/download', async (req, res) => {
    try {
        const { url } = req.body
        console.log(url)
        fileManager.downloadFileHttpget(url)
        req.res.json({ message: 'ur files bro' })
    } catch (e) {
        console.error(e)
        res.status(404).send(e)
    }
})

module.exports = router
