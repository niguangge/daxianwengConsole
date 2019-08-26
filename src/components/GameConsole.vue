<template>
  <div>
    <div id="console">
      <div>
        房间列表
        <select id="rooms"></select>
      </div>
      <input type="button" id="add" onclick="addUser();" value="增加用户" />
      <input type="button" id="clean" onclick="clean();" value="清空" />
      <input type="text" id="message" value="这是一条消息" />
      <input type="button" id="board" onclick="board()" value="广播" />
    </div>
    <table border="1" id="users">
      <tr>
        <thead>
          <th>用户id</th>
          <th>房间号</th>
          <th>消息</th>
          <th width="200">操作</th>
        </thead>
      </tr>
    </table>
    <input type="hidden" value="0" id="userNum" />
  </div>
</template>

<script>
import func from "../../vue-temp/vue-editor-bridge";
import { METHODS } from "http";
export default {
  name: "GameConsole",
  data() {
    return {
      socket : new Array(),
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
 addUser:function() {
  var userNum = document.getElementById("userNum").value;
  var users = document.getElementById("users");
  var user = document.createElement("tr");
  user.id = userNum;
  users.appendChild(user);
  var thUser = "<th>" + userNum + "</th>";
  var thRoom =
    '<th><input type="text" width=50 id="roomId@" value="房间号" disabled="true"></th>';
  var thMsg = '<th><input type="text" id="message@" value="消息"></th>';
  var btnConnect =
    '<input type="button" class="btnConnection" value="加入房间">';
  var btnClose = '<input type="button" id="btnClose@" value="退出房间">';
  var btnMsg = '<input type="button" id="btnSend@" value="发送">';
  var btnCreate = '<input type="button" class="createRoom" value="创建房间">';
  var thOpr = "<th>" + btnConnect + btnClose + btnMsg + btnCreate + "</th>";
  var trNew = thUser + thRoom + thMsg + thOpr;
  trNew = trNew.replace(/@/g, userNum);
  $("#" + userNum).append(trNew);
  document.getElementById("userNum").value = userNum - 1 + 2;
},
    addRoom:function(roomId) {
    var rooms = document.getElementById("rooms");
    var room = "<option value=" + roomId + ">房间" + roomId + "</option>";
    $("#rooms").append(room);
    },

//  roomClick:function(){
//    $(".createRoom").click(function() {
//      // 请求参数
//      var userId = this.parentNode.parentNode.id;
//      var roomId;
//      $.ajax({
//        // 请求方式
//        type: "POST",
//        // 请求的媒体类型
//        contentType: "application/json;charset=UTF-8",
//        // 请求地址
//        url: "room/createRoom?userId=" + userId,
//        // 数据，json字符串
//        data: {},
//        // 请求成功
//        success: function(result) {
//          roomId = result.roomId;
//          document.getElementById("roomId" + userId).value = roomId;
//          addRoom(roomId);
//        },
//        // 请求失败，包含具体的错误信息
//        error: function(e) {
//          console.log(e.status);
//          console.log(e.responseText);
//        }
//      })
//    },
//     }
  },
  mounted: function() {
    addUser();
  }
}

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
