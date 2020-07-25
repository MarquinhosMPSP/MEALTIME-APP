import axios from 'axios'

const api = axios.create({
    baseURL: "https://staging-mealtime-api.herokuapp.com/"
})

export default api;