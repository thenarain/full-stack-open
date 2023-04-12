import axios from "axios";

const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    const response =  axios.get(baseUrl)
    return response.then(response => response.data)
}

const create = (newObject) => {
    const response = axios.post(baseUrl, newObject)
    return response.then(response.data)
}

export default {getAll, create}