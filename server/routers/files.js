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
        req.res.json({ message: url })
    } catch (e) {
        console.error(e)
        res.status(404).send(e)
    }
})

router.post('/download_collection', async (req, res) => {
    try {
        const { rootNode, nodes, items } = req.body
        if (!rootNode || !nodes || !items) {
            // manage cases later
            res.status(404).send()
            return
        }
        const sessionDirectory = await fileManager.getSessionDir()
        await fileManager.setupDirectoryTree(
            rootNode,
            nodes,
            items,
            sessionDirectory,
        )
        const zipPackage = await fileManager.createPackage(sessionDirectory)
        // serve up package for download
        req.res.json({
            package: zipPackage,
            hostname: req.headers.host,
            path: 'packages',
        })
    } catch (e) {
        console.error(e)
        res.status(404).send(e)
    }
})

module.exports = router
