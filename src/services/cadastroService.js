import api from './api'

const cadastroService = {

async signUp(nome, login, senha) {
    try {
        const response = await api.post('usuarios', {
            nome, login, senha
        })
        return response ? response.data : []
    } catch (error) {
        return error.response
    }
},

}

export default cadastroService