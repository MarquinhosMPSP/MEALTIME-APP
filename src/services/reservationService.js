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
    }
}

export default reservationService
