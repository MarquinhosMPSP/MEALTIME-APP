import api from './api'

const restaurantService = {
    async getOrders() {
        try {
            const response = await api.get('restaurantes')
            return response ? response.data : []
        } catch (error) {
            return error.response           
        }
    },
    async makeOrder(data) {
        try {
            const response = await api.post('pedidos/novo', data)
            return response
        } catch (error) {
            return error.response           
        }
    },
    async getUsersOrderByOrderPad(idComanda) {
        try {
            const response = await api.get('pedidos/' + idComanda)
            return response && response['data'] ? response['data'] : []
        } catch (error) {
            return error.response           
        }
    }
}

export default restaurantService
