const express = require('express')

const auth = require('../middleware/auth')
const misc = require('../../data/queries/misc')

const router = express.Router()

router.get('/list_all', auth.admin, async (req, res) => {
    try {
        const collection = await misc.listAll()
        res.json(collection)
    } catch (e) {
        console.error(e)
        res.status(404).send(e)
    }
})

module.exports = router
