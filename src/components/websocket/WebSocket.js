import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

let base = 'ws://localhost:6060/webSocketServer/'
function apiAxios(userId,roomId) {
    const wsuri = `${base}${roomId}-${userId}` // ws地址
    var websocket = new WebSocket(wsuri)
    this.socket.splice(userId, 1, websocket) // 在下标为userId的地方删除1个对象，并添加websocket到对应位置
    websocket.onopen = this.onopen(userId, roomId)
    websocket.onerror = this.onerror
    websocket.onmessage = this.onmessage
    websocket.onclose = this.onclose // 此处不能传参，不然js上的socket自动关闭，原因未知
    return websocket;
}
function onopen(userId, roomId) {
}
function onmessage(msg) {
    console.log(msg.data);
}
function onclose() {
    console.log(`离开房间`);
}
function onerror() {
    console.log("发生了错误");
}

