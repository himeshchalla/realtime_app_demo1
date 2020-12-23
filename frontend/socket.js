import {EventEmitter} from 'events';

class Socket {
    //Initializing initial constroctor dependancies
    constructor(ws = new WebSocket('ws://echo.websocket.org'), ee = new EventEmitter()){
        this.ws = ws;
        this.ee = ee;
        ws.onmessage = this.message.bind(this);
        ws.onopen = this.open.bind(this);
        ws.onclose = this.close.bind(this);
        console.log(ws.OPEN)
        console.log(ws.CONNECTING)
        console.log(ws.CLOSING)
        console.log(ws.CLOSED)
    }
    on(name, fn){
        console.log("Hello from socket.js -> on() for "+name+" start")
        console.log(this.ws.OPEN)
        console.log(this.ws.CONNECTING)
        console.log(this.ws.CLOSING)
        console.log(this.ws.CLOSED)
        console.log("Hello from socket.js -> on() for "+name+" end")
        this.ee.on(name, fn);
    }
    off(name, fn){
        console.log("Hello from socket.js -> off() for "+name+" start")
        console.log(this.ws.OPEN)
        console.log(this.ws.CONNECTING)
        console.log(this.ws.CLOSING)
        console.log(this.ws.CLOSED)
        console.log("Hello from socket.js -> off() for "+name+" end")
        this.ee.removeListener(name, fn);
    }
    emit(name, data){
        console.log("Hello from socket.js -> message() start")
        console.log(this.ws.OPEN)
        console.log(this.ws.CONNECTING)
        console.log(this.ws.CLOSING)
        console.log(this.ws.CLOSED)
        console.log("Hello from socket.js -> message() end")
        const message = JSON.stringify({name, data});
        this.ws.send(message);
    }
    message(e){
        console.log("Hello from socket.js -> message() start")
        console.log(this.ws.OPEN)
        console.log(this.ws.CONNECTING)
        console.log(this.ws.CLOSING)
        console.log(this.ws.CLOSED)
        console.log("Hello from socket.js -> message() end")
        try{
            const message = JSON.parse(e.data);
            this.ee.emit(message.name, message.data);
            if(event.name === 'channel add') {
                this.newChannel(event.data)
                console.log(event.data);
            }
        }catch(error){
            console.log("Hello from socket.js -> message() -> catch() start")
            console.log(this.ws.OPEN)
            console.log(this.ws.CONNECTING)
            console.log(this.ws.CLOSING)
            console.log(this.ws.CLOSED)
            console.log("Hello from socket.js -> message() -> catch() end")
            this.ee.emit('error', error);
            console.log('error')
            console.log(error)
        }
    }
    open(){
        console.log("Hello from socket.js -> open() start")
        console.log(this.ws.OPEN)
        console.log(this.ws.CONNECTING)
        console.log(this.ws.CLOSING)
        console.log(this.ws.CLOSED)
        console.log("Hello from socket.js -> open() end")
        this.ee.emit('connect');
    }
    close(){
        console.log("Hello from socket.js -> close() start")
        console.log(this.ws.OPEN)
        console.log(this.ws.CONNECTING)
        console.log(this.ws.CLOSING)
        console.log(this.ws.CLOSED)
        console.log("Hello from socket.js -> close() end")
        this.ee.emit('disconnect');
    }
}
export default Socket;