import io from "socket.io-client";

import { Observable } from 'rxjs'

class WebsocketService {
    _socket = null

    connect(user) {
        this._socket = io('https://charon-push.herokuapp.com', { query: { key: user } });
    }

    listenTo(event, fn) {
        this.unsubscribe(event)
        this._socket.on(event, fn)
    }

    from = event => 
        Observable.create(observer => {
            this._socket.on(event, data => observer.next(data))
        })

    unsubscribe(event) {
        this._socket.off(event)
    }
    
    disconnect() {
        this._socket.close()
    }
}

const websocketInstance = new WebsocketService()
export default websocketInstance