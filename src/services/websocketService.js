import io from "socket.io-client";

class WebsocketService {
    _socket = null
    connect(user) {
        this._socket = io('https://charon-push.herokuapp.com', { query: { key: user } });
    }
    listenTo(event, fn) {
        this._socket.on(event, fn)
    }
    disconnect() {
        this._socket.close()
    }
}

const websocketInstance = new WebsocketService()
export default websocketInstance