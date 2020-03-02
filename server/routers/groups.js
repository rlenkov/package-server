const express = require('express')

const auth = require('../middleware/auth')
const groupCallbacks = require('../../data/queries/groups')
const userGroupCallbacks = require('../../data/queries/userGroups')
const misc = require('../../data/queries/misc')

const router = express.Router()

router.post('/add_group', auth.admin, async (req, res) => {
    const { parentId, groupName, description, userGroups } = req.body
    if (!parentId || !groupName || !userGroups) {
        res.status(404).send()
        return
    }
    try {
        const group = await groupCallbacks.insertGroup(
            groupName,
            parentId,
            description,
        )
        console.log('group successfully added')
        if (userGroups.length > 0 && group[0].id) {
            const results = await userGroupCallbacks.insertGroupToUserGroupList(
                userGroups,
                group[0].id,
            )
            console.log(results)
        }
        if (group[0].id) {
            const evaluation = await userGroupCallbacks.evaluateGroupAddition(
                group[0].id,
            )
            console.log(evaluation)
        }
        res.status(200).send(group)
    } catch (e) {
        res.status(404).send()
    }
})

router.post('/edit_group', auth.admin, async (req, res) => {
    const { groupId, groupName, description, userGroups } = req.body
    if (!groupId || !groupName || !userGroups) {
        res.status(404).send()
        return
    }
    try {
        const group = await groupCallbacks.updateGroup(
            groupName,
            groupId,
            description,
        )
        console.log('group successfully updated')
        if (group[0].id) {
            const results = await userGroupCallbacks.insertGroupToUserGroupList(
                userGroups,
                group[0].id,
            )
            console.log(results)
        }
        if (group[0].id) {
            const evaluation = await userGroupCallbacks.evaluateGroupAddition(
                group[0].id,
            )
            console.log(evaluation)
        }

        res.status(200).send(group)
    } catch (e) {
        res.status(404).send()
    }
})

router.post('/remove_group', auth.admin, async (req, res) => {
    const { groupId } = req.body
    if (!groupId) {
        res.status(404).send()
        return
    }
    try {
        const group = await groupCallbacks.removeGroup(groupId)
        console.log('group successfully removed now')
        res.status(200).send(group[0])
    } catch (e) {
        console.error(`${e.name}: ${e.message}`)
        res.status(404).send({ error: e.message })
    }
})

router.post('/new_release', auth.admin, async (req, res) => {
    const { groupId, releaseName } = req.body
    if (!groupId || !releaseName) {
        res.status(404).send()
        return
    }
    try {
        const result = await groupCallbacks.newRelease(groupId, releaseName)
        res.status(200).send(result[0])
    } catch (e) {
        console.error(`${e.name}: ${e.message}`)
        res.status(404).send({ error: e.message })
    }
})

router.post('/get_auth_child_groups', auth.auth, async (req, res) => {
    const { userName, rootNode } = req.body
    if (!userName || !rootNode) {
        res.status(404).send()
        return
    }
    if (req.user.name !== userName) {
        res.status(404).send()
        return
    }
    try {
        // console.log(`for user ${userName} at ${rootNode}`)
        const result = await misc.getChildGroupsForUser(req.user, rootNode)
        if (result.length === 0) {
            res.status(204).send()
        } else {
            res.status(200).send(result)
        }
    } catch (e) {
        console.error(`${e.name}: ${e.message}`)
        res.status(404).send({ error: e.message })
    }
})

module.exports = router
