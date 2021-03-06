import api from './api'

const reservationService = {
    async checkAvailability(idRestaurante, dataReserva, qtdPessoas) {
        try {
            const response = await api.get(`reservas/${idRestaurante}/disponibilidade?dataReserva=${dataReserva}&qtdPessoas=${qtdPessoas}`)
            return response ? response.data : []
        } catch (error) {
            return error.response           
        }
    },
    async makeReservation(idRestaurante, idCliente, idMesa, dataReserva) {
        try {
            const response = await api.post('reservas', {
                idRestaurante, idCliente, idMesa, dataReserva
            })
            return response ? response.data : []
        } catch (error) {
            return error.response
        }
    },
    async getReservations(idCliente) {
        try {
            const response = await api.get('reservas/cliente/' + idCliente)
            return response ? response.data : []
        } catch (error) {
            return error.response
        }
    },
    async finishReservation(idReserva) {
        try {
            const response = await api.put('reservas/' + idReserva, { status: 'finalizada' })
            return response
        } catch (error) {
            return error.response
        }
    },
    async getOrderPadsAndTables(idRestaurante) {
        try {
            const response = await api.get('reservas/mesas-comandas/' + idRestaurante)
            return response ? response.data : []
        } catch (error) {
            return error.response
        }
    },
}

export default reservationService
