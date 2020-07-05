import axios from 'axios'

const url = "https://staging-mealtime-api.herokuapp.com/"

const loginService = {
    async login(login, senha) {
        try {
            const response = await axios.post(url + 'login', { login, senha })
            return response
        } catch (error) {
            return error            
        }
    }
}

export default loginService
