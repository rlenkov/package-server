import { getRequest, postRequest } from './requests'

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
            console.log(response.message)
            console.log(status)
            printer('...')
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
            console.log(response.files)
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
