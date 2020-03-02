import axios from 'axios'

export const getRequest = (
    path,
    success,
    failed,
    headers = {
        'Content-Type': 'application/json',
    },
) => {
    axios
        .get(path, { headers })
        .then(response => {
            success(response.data)
            return response.data
        })
        .catch(error => {
            console.error(error)
            failed(error)
            return error
        })
}

export const postRequest = async (
    path,
    messageBody,
    success,
    failed,
    headers = {
        'Content-Type': 'application/json',
    },
) => {
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
            failed(error)
            return error
        })
    return response
}
