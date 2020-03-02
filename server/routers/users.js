const express = require('express')

const auth = require('../middleware/auth')
const userCallbacks = require('../../data/queries/users')
const usersUtility = require('../../data/queries/utility/usersUtility')
const userGroupCallbacks = require('../../data/queries/userGroups')

const router = express.Router()

router.post('/', async (req, res) => {
    const { email, name, pass } = req.body
    if (!email || !name || !pass) {
        res.status(404).send()
        return
    }
    try {
        const user = await userCallbacks.createUser(email, name, pass)
        res.status(201).send({
            name: user[0].name,
            email: user[0].email,
            jwt: user[0].token,
            group_id: user[0].group_id,
        })
    } catch (e) {
        res.status(404).send()
    }
})

router.post('/admin_create', auth.admin, async (req, res) => {
    const { email, name, pass } = req.body
    if (!email || !name || !pass) {
        res.status(404).send()
        return
    }
    try {
        const user = await userCallbacks.createUser(email, name, pass)
        res.status(201).send({
            name: user[0].name,
            email: user[0].email,
            jwt: user[0].token,
            group_id: user[0].group_id,
        })
    } catch (e) {
        res.status(404).send()
    }
})

// router.get('/get_users_in_group/:group_name', auth.admin, async (req, res) => {
//     try {
//         const name = req.params.group_name
//         const users = await usersUtility.getUsersInGroup(name)
//         res.json({ users })
//     } catch (e) {
//         res.status(404).send()
//     }
// })

router.post('/login', async (req, res) => {
    const { email, pass } = req.body
    if (!email || !pass) {
        res.status(404).send()
        return
    }
    try {
        const user = await userCallbacks.validateUser(email, pass)
        if (user) {
            // if (!req.session.token) {
            //     req.session.token = token
            // }
            // const hour = 3600000
            // req.session.cookie.expires = new Date(Date.now() + hour)
            // req.session.cookie.maxAge = hour
            res.json({
                name: user.name,
                email: user.email,
                jwt: user.token,
                isAdmin: user.isAdmin,
            })
        }
        res.status(401).send()
    } catch (e) {
        res.status(404).send()
    }
})

router.post('/remove', auth.admin, async (req, res) => {
    const { userId } = req.body
    if (!userId) {
        res.status(404).send()
        return
    }
    try {
        const users = await userCallbacks.removeUser(userId)
        if (users.length !== 0) {
            res.json({ users })
        }
        res.status(401).send()
    } catch (e) {
        console.error(e)
        res.status(404).send(e)
    }
})

router.post('/add_user_to_group', auth.admin, async (req, res) => {
    const { username, groupName } = req.body
    if (!username || !groupName) {
        res.status(404).send()
        return
    }
    try {
        const groupId = await userGroupCallbacks.getGroupId(groupName)
        const users = await userCallbacks.setUserGroup(groupId, username)

        if (users.length !== 0) {
            res.json({ users })
        }
        res.status(401).send()
    } catch (e) {
        console.error(e)
        res.status(404).send(e)
    }
})

router.post('/remove_user_from_group', auth.admin, async (req, res) => {
    const { username, groupName } = req.body
    if (!username || !groupName) {
        res.status(404).send()
        return
    }
    try {
        const groupId = await userGroupCallbacks.getGroupId(groupName)
        const users = await userCallbacks.removeUserFromGroup(groupId, username)

        if (users.length !== 0) {
            res.json({ users })
        }
        res.status(401).send()
    } catch (e) {
        console.error(e)
        res.status(404).send(e)
    }
})

router.post('/update_user_main_access', auth.admin, async (req, res) => {
    const { userId, groupName } = req.body
    if (!userId || !groupName) {
        res.status(404).send()
        return
    }
    try {
        const groupId = await userGroupCallbacks.getGroupId(groupName)
        const users = await userCallbacks.updateUserMainGroup(userId, groupId)

        if (users.length !== 0) {
            res.json({ users })
        }
        res.status(401).send()
    } catch (e) {
        console.error(e)
        res.status(404).send(e)
    }
})

module.exports = router
