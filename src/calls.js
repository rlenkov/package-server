import { getRequest, postRequest } from './requests'

export const testQuery = printer => {
    const rootNode = {
        id: 1,
        group_name: 'vtv',
        parent: null,
    }
    const nodes = [
        {
            id: 2,
            group_name: 'interface',
            parent: 1,
        },
        {
            id: 3,
            group_name: 'brand',
            parent: 1,
        },
        {
            id: 4,
            group_name: 'screens',
            parent: 2,
        },
        {
            id: 5,
            group_name: 'videos',
            parent: 2,
        },
        {
            id: 6,
            group_name: 'release 6',
            parent: 4,
        },
        {
            id: 7,
            group_name: 'release 7',
            parent: 4,
        },
    ]
    const items = [
        {
            id: 1,
            item_name: 'book',
            item_url: 'https://i.imgur.com/97aDZ5K.png',
            group_id: 6,
        },
        {
            id: 2,
            item_name: 'repair',
            item_url: 'https://i.imgur.com/8CaScJY.png',
            group_id: 6,
        },
        {
            id: 3,
            item_name: 'pencil',
            item_url: 'https://i.imgur.com/4IFQctc.png',
            group_id: 6,
        },
        {
            id: 4,
            item_name: 'cloud',
            item_url: 'https://i.imgur.com/vfIEmgO.png',
            group_id: 7,
        },
        {
            id: 5,
            item_name: 'loader',
            item_url: 'https://i.imgur.com/STBK97L.png',
            group_id: 7,
        },
    ]
    const messageBody = {
        rootNode,
        nodes,
        items,
    }
    const header = {
        'Content-Type': 'application/json',
    }
    postRequest(
        '/files/download_collection',
        messageBody,
        (response, status) => {
            printer(`Files Downloaded and packaged: ${response.package}`)
        },
        () => {
            console.error('Invalid Operation!')
            alert('Invalid Operation!')
        },
        header,
    )
}

export const getFileFromUrl = (url, printer) => {
    const messageBody = {
        url,
    }
    const header = {
        'Content-Type': 'application/json',
    }
    postRequest(
        '/files/download',
        messageBody,
        (response, status) => {
            printer(`File Downloaded: ${response.message}`)
        },
        () => {
            console.error('Invalid Operation!')
            alert('Invalid Operation!')
        },
        header,
    )
}

export const listFiles = printer => {
    const header = {
        'Content-Type': 'application/json',
    }
    getRequest(
        '/files/ls',
        (response, status) => {
            printer(response.files)
        },
        () => {
            console.error('Invalid Operation!')
            alert('Invalid Operation!')
        },
        header,
    )
}

export default getFileFromUrl

// export const getAvailableChildNodes = (
//     userName,
//     rootNode,
//     setChildrenOnResponse,
// ) => {
//     const messageBody = {
//         userName,
//         rootNode,
//     }
//     const header = {
//         'Content-Type': 'application/json',
//     }

//     postRequestWithAuth(
//         '/groups/get_auth_child_groups',
//         messageBody,
//         (response, status) => {
//             if (status === 204) {
//                 setChildrenOnResponse(response, true)
//             } else {
//                 setChildrenOnResponse(response, false)
//             }
//         },
//         () => {
//             console.error('Invalid Operation!')
//             alert('Invalid Operation!')
//         },
//         header,
//     )
// }

// export const addGroup = (
//     parentId,
//     groupName,
//     description,
//     userGroups = [],
//     refresh,
// ) => {
//     const messageBody = {
//         parentId,
//         groupName,
//         description,
//         userGroups,
//     }
//     const header = {
//         'Content-Type': 'application/json',
//     }

//     postRequestWithAuth(
//         '/groups/add_group',
//         messageBody,
//         () => {
//             refresh()
//         },
//         () => {
//             console.log('Invalid Operation!')
//             alert('Invalid operation!')
//         },
//         header,
//     )
// }

// export const editGroup = (
//     groupId,
//     groupName,
//     description,
//     userGroups = [],
//     refresh,
// ) => {
//     const messageBody = {
//         groupId,
//         groupName,
//         description,
//         userGroups,
//     }
//     const header = {
//         'Content-Type': 'application/json',
//     }

//     postRequestWithAuth(
//         '/groups/edit_group',
//         messageBody,
//         () => {
//             refresh()
//         },
//         () => {
//             console.log('Invalid Operation!')
//             alert('Invalid operation!')
//         },
//         header,
//     )
// }

// export const removeGroup = (groupId, refresh) => {
//     const messageBody = {
//         groupId,
//     }
//     const header = {
//         'Content-Type': 'application/json',
//     }

//     postRequestWithAuth(
//         '/groups/remove_group',
//         messageBody,
//         () => {
//             refresh()
//         },
//         error => {
//             console.log('Invalid Operation!')
//             alert(`Invalid operation! ${error.response.data.error}`)
//         },
//         header,
//     )
// }

// export const insertItem = (groupId, file, name, refresh) => {
//     const formData = new FormData()
//     formData.append('file', file)
//     formData.append('given_name', name)
//     if (groupId) {
//         formData.append('group_id', groupId)
//     }

//     const header = {
//         'Content-Type': 'multipart/form-data',
//     }
//     postRequestWithAuth(
//         '/items/add_item',
//         formData,
//         () => {
//             refresh()
//         },
//         () => {
//             console.log('Invalid File!')
//             alert('Invalid file!')
//         },
//         header,
//     )
// }

// export const insertMultipleItem = (groupId, files, refresh) => {
//     const formData = new FormData()
//     files.forEach(file => formData.append('file', file))
//     if (groupId) {
//         formData.append('group_id', groupId)
//     }

//     const header = {
//         'Content-Type': 'multipart/form-data',
//     }
//     postRequestWithAuth(
//         '/items/add_multiple_item',
//         formData,
//         () => {
//             refresh()
//         },
//         () => {
//             console.log('Invalid File!')
//             alert('Invalid file!')
//         },
//         header,
//     )
// }

// export const editItem = (itemId, file, name, refresh) => {
//     const formData = new FormData()
//     formData.append('file', file)
//     formData.append('given_name', name)
//     if (itemId) {
//         formData.append('item_id', itemId)
//     }

//     const header = {
//         'Content-Type': 'multipart/form-data',
//     }
//     postRequestWithAuth(
//         '/items/edit_item',
//         formData,
//         () => {
//             refresh()
//         },
//         () => {
//             alert('Invalid file!')
//         },
//         header,
//     )
// }

// export const removeItem = (itemId, refresh) => {
//     const messageBody = {
//         itemId,
//     }
//     const header = {
//         'Content-Type': 'application/json',
//     }

//     postRequestWithAuth(
//         '/items/remove',
//         messageBody,
//         () => {
//             refresh()
//         },
//         () => {
//             console.log('Invalid Operation!')
//             alert('Invalid operation!')
//         },
//         header,
//     )
// }

// export const createNewUserGroup = (userGroupName, refresh) => {
//     const messageBody = {
//         userGroupName,
//     }
//     const header = {
//         'Content-Type': 'application/json',
//     }

//     postRequestWithAuth(
//         '/user_groups/create_group',
//         messageBody,
//         () => {
//             refresh()
//         },
//         error => {
//             alert(`Invalid operation! ${error.response.data.error}`)
//         },
//         header,
//     )
// }

// export const deleteUserGroup = (userGroupName, refresh) => {
//     const messageBody = {
//         userGroupName,
//     }
//     const header = {
//         'Content-Type': 'application/json',
//     }

//     postRequestWithAuth(
//         '/user_groups/delete_group',
//         messageBody,
//         () => {
//             refresh()
//         },
//         error => {
//             alert(`Invalid operation! ${error.response.data.error}`)
//         },
//         header,
//     )
// }

// export const emailIsValid = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

// export const insertUser = (email, name, password, refresh) => {
//     if (!emailIsValid(email)) {
//         alert('Invalid email!')
//         return
//     }
//     if (password.length < 3) {
//         alert('Too short password!')
//         return
//     }
//     const messageBody = {
//         email,
//         name,
//         pass: password,
//     }

//     const header = {
//         'Content-Type': 'application/json',
//     }

//     postRequestWithAuth(
//         '/users/admin_create',
//         messageBody,
//         () => {
//             refresh()
//         },
//         () => {
//             console.log('Invalid User Creation!')
//             alert('Invalid details!')
//         },
//         header,
//     )
// }

// export const removeUser = (userId, refresh) => {
//     const messageBody = {
//         userId,
//     }
//     const header = {
//         'Content-Type': 'application/json',
//     }

//     postRequestWithAuth(
//         '/users/remove',
//         messageBody,
//         () => {
//             refresh()
//         },
//         () => {
//             console.log('Invalid Operation!')
//             alert('Invalid operation!')
//         },
//         header,
//     )
// }

// export const updateUserAccess = (userId, groupName, refresh) => {
//     const messageBody = {
//         userId,
//         groupName,
//     }
//     const header = {
//         'Content-Type': 'application/json',
//     }

//     postRequestWithAuth(
//         '/users/update_user_main_access',
//         messageBody,
//         () => {
//             refresh()
//         },
//         () => {
//             console.log('Invalid Operation!')
//             alert('Invalid operation!')
//         },
//         header,
//     )
// }

// export default getAvailableChildNodes
