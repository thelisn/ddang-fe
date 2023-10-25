<template>
  <div>
    <button @click="connect()">Connect</button>
    <button @click="disconnect()">Disconnect</button>
    <form @submit.prevent="login">
      <input v-model="id" name="id" placeholder="원하는 아이디 입력" />
      <button v-if="connected" tpye="submit">로그아웃</button>
      <button v-else tpye="submit">로그인</button>
    </form>
    <p v-if="loginError">이미 존재하는 아이디입니다.</p>
    {{ loginError }}
  </div>
</template>

<script>
import { state, socket } from "@/socket";


export default {
  name: "MainPage",
  data() {
    return {
      id: null
    }
  },
  computed: {
    connected() {
      return state.connected;
    },
    loginError() {
      return state.loginError;
    }
  },
  methods: {
    connect() {
      socket.connect();
    },
    disconnect() {
      console.log(socket.disconnect)
      console.log(socket.sendMessage)
      socket.disconnect();
    },
    sendMessage() {
      console.log('s')
    },
    login(event) {
      socket.emit('login', event.target.elements.id.value);
    },
  }
}
</script>