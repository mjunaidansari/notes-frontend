import axios from "axios"

const baseUrl = '/api/notes'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = () => {
    return axios.get(baseUrl)
}

const create = async newObject => {
    const config = {
        headers: {Authorization: token}
    }
    const response = await axios.post(baseUrl, newObject, config)
    console.log(response.data)
    return response.data
}

const update = (id, newObject) => {
    // const request = axios.put(`${baseUrl}/${id}`, newObject)
    // return request.then(response => response.data)
    return axios.put(`${baseUrl}/${id}`, newObject)
}

export default {getAll, create, update, setToken}