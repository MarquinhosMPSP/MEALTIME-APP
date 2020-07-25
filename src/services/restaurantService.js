import api from './api'

const restaurantService = {
    async getRestaurants(login, senha) {
        try {
            const response = await api.get('restaurantes')
            return response ? response.data : []
        } catch (error) {
            return error.response           
        }
    }
}

export default restaurantService
