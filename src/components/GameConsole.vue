<template>
  <div>
    <div id="console">
      <div>
        房间列表
        <select id="roomList">
          <option disabled="true" selected="true">请选择</option>
          <option v-for="roomId in roomCount" v-bind:key="roomId">房间{{roomId}}</option>
        </select>
      </div>
      <input type="button" id="add" v-on:click="addUser" value="增加用户" />
      <input type="button" id="clean" v-on:click="clean" value="清空" />
      <input type="text" id="message" value="这是一条消息" />
      <input type="button" id="board" onclick="board()" value="广播" />
    </div>
    <table border="1" id="userTable">
      <tr>
          <th>用户id</th>
          <th>房间号</th>
          <th>消息</th>
          <th>操作</th>
      </tr>
      <tr id="userList" v-for="userId in userCount" v-bind:key="userId">
        <th>{{userId}}</th>
        <th>
          <input type="text" width="50" :value="getuserroom(userId)" placeholder="请输入房间号"/>
        </th>
        <th>
          <input type="text"  value="消息" v-model="messages" placeholder="请输入消息">
        </th>
        <th>
          <input type="button" value="创建房间" v-on:click="createRoom(userId)" />
          <input type="button" value="加入房间" v-on:click="joinRoom(userId)" />
          <input type="button" value="离开房间" v-on:click="leaveRoom(userId)" />
          <input type="button" value="发送" v-on:click="sendMessage(userId)"/>
        </th>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "GameConsole",
  data() {
    return {
      socket: [null],//用户id从1开始，所以0位放一个空对象
      userCount: 0,
      roomCount: 0,
      userRoom: [-1],
      messages: new Object()
    };
  },
  watch: {
    userCount: {
      handler: function(val, oldVal) {
        this.userRoom.splice(this.userCount, 1, -1);
      }
    },
    socket: {
      handler: function(val, oldVal) {
        console.log(`socket is update ${val}`);
      }
    }
  },
  computed: {},
  methods: {
    addUser() {
      this.userCount++;
      //this.userRoom[this.userCount] = -1;
    },
    getuserroom(userId) {
      var roomId = this.userRoom[userId];
      if (roomId == -1) {
        return "请输入房间号";
      } else {
        return roomId;
      }
    },
    initWebSocket(userId, roomId) {
      //初始化weosocket
      const wsuri = `ws://localhost:6060/webSocketServer/${roomId}-${userId}`; //ws地址
      var websocket = new WebSocket(wsuri);
      this.socket.splice(userId, 1, websocket); //在下标为userId的地方删除1个对象，并添加websocket到对应位置
      websocket.onopen = this.onopen(userId, roomId);
      websocket.onerror = this.onerror;
      websocket.onmessage = this.onmessage;
      websocket.onclose = this.onclose; //此处不能传参，不然js上的socket自动关闭，原因未知
    },
    clean() {
      this.userCount = 0;
      this.roomCount = 0;
      this.socket = new Array();
      this.userRoom = [-1];
      this.socket = [null];
      axios
        .post(`http://localhost:6060/room/cleanAllRooms`)
        .then(response => {
          console.log(`已清理所有房间`);
          // this.joinRoom(userId);
        })
        .catch(error => {
          console.log(error);
          alert("网络错误，不能访问");
        });
    },
    onopen(userId, roomId) {
      // console.log(`玩家${userId}已经进入房间${roomId}`);
    },
    onmessage(msg) {
      console.log(msg.data);
    },
    onclose() {

    },
    onerror() {
      console.log("发生了错误");
    },
    sendMessage(userId){
      var wenSocket = this.socket[userId];

      var json = {};
      json.channel="system";
      json.stage="dice";
      var params = {};
      params.diceNum = "3";
      params.diceType = ["normal","minusOne","plusOne"];
      json.params = JSON.stringify(params);
      // wenSocket.send("test");
      console.log(JSON.stringify(json))
      wenSocket.send(JSON.stringify(json));
    },

    createRoom(userId) {
      // 请求参数
      var _self = this;
      axios
        .post(`http://localhost:6060/room/createRoom?userId=${userId}`)
        .then(response => {
          var roomId = response.data.roomId;
          _self.userRoom.splice(userId, 1, roomId);
          this.joinRoom(userId);
          this.roomCount++;
        })
        .catch(error => {
          console.log(error);
          alert("网络错误，不能访问");
        });
    },
    joinRoom(userId) {
      var roomId = this.userRoom[userId];
      this.initWebSocket(userId, roomId);
    },
    leaveRoom(userId) {
      this.socket[userId].close();
    }
  },
  mounted: function() {
    this.addUser();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
