import api from './api'

const authService = {
    async login(login, senha) {
        try {
            const response = await api.post('login', { login, senha })
            return response
        } catch (error) {
            return error.response           
        }
    }
}

export default authService
