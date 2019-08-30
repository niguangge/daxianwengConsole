<template>
  <tr>
    <th>{{userId}}</th>
    <th>
      <input type="text" width="50" :value="getuserroom(userId)" placeholder="请输入房间号" />
    </th>
    <th>
      <input type="text" value="消息" v-model="messages" placeholder="请输入消息" />
    </th>
    <th>
      <input type="button" value="创建房间" v-on:click="createRoom(userId)" />
      <input type="button" value="加入房间" v-on:click="joinRoom(userId)" />
      <input type="button" value="离开房间" v-on:click="leaveRoom(userId)" />
      <input type="button" value="发送" v-on:click="sendMessage(userId)" />
    </th>
  </tr>
</template>
<script>
import axios from "axios";
export default {
  name: "GameConsole",
  data() {
    return {
      userId : ''
    };
  }
};
</script>