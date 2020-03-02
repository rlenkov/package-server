const express = require('express')

const auth = require('../middleware/auth')
const userGroupCallbacks = require('../../data/queries/userGroups')
const userGroupsUtility = require('../../data/queries/utility/userGroupsUtility')

const router = express.Router()

router.post('/remove_group', auth.admin, async (req, res) => {
    const { userGroupName, groupId } = req.body
    if (!userGroupName || !groupId) {
        res.status(404).send()
        return
    }
    try {
        const locations = await userGroupsUtility.ifGroupInUserGroupHead(
            userGroupName,
            groupId
        )
        if (locations.length >= 1) {
            const userGroups = await userGroupCallbacks.removeGroupFromUserGroup(
                userGroupName,
                groupId
            )
            res.json({ userGroups })
        } else {
            res.status(403).send({
                error: 'Group not found in usergroup trees',
            })
        }
    } catch (e) {
        console.error(e)
        res.status(403).send({ error: e.message })
    }
})

router.post('/insert_group', auth.admin, async (req, res) => {
    const { userGroupName, groupId } = req.body
    if (!userGroupName || !groupId) {
        res.status(404).send()
        return
    }
    try {
        const locations = await userGroupsUtility.ifGroupInUserGroupHead(
            userGroupName,
            groupId
        )
        if (locations.length > 0) {
            throw new Error('User can already access that group!')
        } else if (locations.length === 0) {
            const insertion = await userGroupCallbacks.insertGroupToUserGroup(
                userGroupName,
                groupId
            )
            res.json({ insertion })
        }
    } catch (e) {
        console.error(e)
        res.status(403).send({ error: e.message })
    }
})

router.post('/create_group', auth.admin, async (req, res) => {
    const { userGroupName } = req.body
    if (!userGroupName) {
        res.status(404).send()
        return
    }
    try {
        const userGroup = await userGroupCallbacks.createUserGroup(
            userGroupName.trim()
        )
        res.json({ userGroup })
    } catch (e) {
        console.error(e)
        res.status(403).send({ error: e.message })
    }
})

router.post('/delete_group', auth.admin, async (req, res) => {
    const { userGroupName } = req.body
    if (!userGroupName) {
        res.status(404).send()
        return
    }
    try {
        const userGroup = await userGroupCallbacks.deleteUserGroup(
            userGroupName
        )
        res.json({ userGroup })
    } catch (e) {
        console.error(e)
        res.status(403).send({ error: e.message })
    }
})

module.exports = router
