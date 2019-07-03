'use strict'

class YoutubeController {
    constructor ({ socket, request }) {
        this.socket = socket
        this.request = request

        console.log(this.socket)
    }
    onMessage (data){
        this.broadcastToAll('message', data)
        //console.log(message)
    }
}

module.exports = YoutubeController
