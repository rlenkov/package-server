const express = require('express')
const multiparty = require('multiparty')

const auth = require('../middleware/auth')
const itemCallbacks = require('../../data/queries/items')

const router = express.Router()

router.post('/add_item', auth.admin, async (req, res) => {
    const form = new multiparty.Form()
    form.parse(req, async (error, fields, files) => {
        if (error) throw new Error(error)
        try {
            const path = files.file[0].path
            const givenName = fields.given_name[0]
            const groupId = fields.group_id[0]
            if (!path || !givenName || !groupId) {
                throw new Error('Bad parameters')
            }
            const items = await itemCallbacks.addItem(path, givenName, groupId)
            return res.status(200).send({ items })
        } catch (error) {
            return res.status(400).send(error)
        }
    })
})

router.post('/add_multiple_item', auth.admin, async (req, res) => {
    const form = new multiparty.Form()
    form.parse(req, async (error, fields, files) => {
        if (error) throw new Error(error)
        try {
            const fileObjectList = files.file
            const groupId = fields.group_id[0]
            if (!groupId || !fileObjectList) {
                throw new Error('Bad parameters')
            }
            const items = await itemCallbacks.addMultipleItem(fileObjectList, groupId)
            console.log(items)
            return res.status(200).send({ items })
        } catch (error) {
            return res.status(400).send(error)
        }
    })
})

router.post('/edit_item', auth.admin, async (req, res) => {
    const form = new multiparty.Form()
    form.parse(req, async (error, fields, files) => {
        if (error) throw new Error(error)
        try {
            let path = null
            if (files.file) {
                path = files.file[0].path
            }
            const givenName = fields.given_name[0]
            const itemId = fields.item_id[0]
            if (!givenName || !itemId) {
                throw new Error('Bad parameters')
            }
            const items = await itemCallbacks.editItem(givenName, itemId, path)
            return res.status(200).send({ items })
        } catch (error) {
            return res.status(400).send(error)
        }
    })
})

router.post('/remove', auth.admin, async (req, res) => {
    const { itemId } = req.body
    if (!itemId) {
        res.status(404).send()
        return
    }
    try {
        const items = await itemCallbacks.deleteItem(itemId)
        res.json({ items })
    } catch (error) {
        console.error(error)
        return res.status(400).send(error)
    }
})

router.post('/move', auth.admin, async (req, res) => {
    const { itemId, groupId } = req.body
    if (!itemId || !groupId) {
        res.status(404).send()
        return
    }
    try {
        const items = await itemCallbacks.moveItemToGroup(itemId, groupId)
        res.json({ items })
    } catch (error) {
        console.error(error)
        return res.status(400).send(error)
    }
})

module.exports = router
