import api from './api'

const restaurantService = {
    async getRestaurants() {
        try {
            const response = await api.get('restaurantes')
            return response ? response.data : []
        } catch (error) {
            return error.response           
        }
    },
    async getRestaurantMenu(idRestaurante) {
        try {
            const response = await api.get('restaurantes/cardapio/'+idRestaurante)
            return response ? response.data : []
        } catch (error) {
            return error.response           
        }
    }
}

export default restaurantService
