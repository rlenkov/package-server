import axios from 'axios'
import { logoutUser, getJwt } from './auth'

export const getRequest = (
    path,
    success,
    failed,
    headers = {
        'Content-Type': 'application/json',
    },
    withAuth = false,
) => {
    if (withAuth) {
        const token = getJwt()
        if (token) {
            headers.Authorization = `Bearer ${token}`
        }
    }
    axios
        .get(path, { headers })
        .then(response => {
            success(response.data)
            return response.data
        })
        .catch(error => {
            console.error(error)
            if (
                error.response.status === 401 &&
                error.response.data.error === 'token-expired'
            ) {
                console.error('Your session have expired!')
                alert('Your session have expired!')
                logoutUser()
                if (typeof window === 'object') {
                    window.location.reload()
                    // useEffect history listen at Chest catches this
                }
                return error
            }
            failed(error)
            return error
        })
}

export const getRequestWithAuth = (
    path,
    success,
    failed,
    headers = {
        'Content-Type': 'application/json',
    },
) => getRequest(path, success, failed, headers, true)

export const postRequest = async (
    path,
    messageBody,
    success,
    failed,
    headers = {
        'Content-Type': 'application/json',
    },
    withAuth = false,
) => {
    if (withAuth) {
        const token = getJwt()
        if (token) {
            headers.Authorization = `Bearer ${token}`
        }
    }
    const response = await axios
        .post(path, messageBody, {
            headers,
        })
        .then(response => {
            success(response.data, response.status)
            return response.data
        })
        .catch(error => {
            console.error(error.response.data.error)
            if (
                error.response.status === 401 &&
                error.response.data.error === 'token-expired'
            ) {
                console.error('Your session have expired!')
                alert('Your session have expired!')
                logoutUser()
                if (typeof window === 'object') {
                    window.location.reload()
                    // useEffect history listen at Chest catches this
                }
                return error
            }
            failed(error)
            return error
        })
    return response
}

export const postRequestWithAuth = (
    path,
    messageBody,
    success,
    failed,
    headers = {
        'Content-Type': 'application/json',
    },
) => postRequest(path, messageBody, success, failed, headers, true)
