import api from './api'

const authService = {
    async login(login, senha) {
        try {
            const response = await api.post('login', { login, senha, plataforma: 'app' })
            return response
        } catch (error) {
            console.log(error);
            return error.response           
        }
    }
}

export default authService
