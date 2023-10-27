<template>
  <div class="container">

    <div v-if="!userName">

      <form class="form-container" @submit.prevent="login">
        <input v-model="id" name="id" placeholder="원하는 아이디 입력" />
        <button type="submit">로그인</button>
      </form>
      <p v-if="loginError">{{ errMsg }}</p>
    </div>
    <div v-else>
      {{ userName }}으로 현재 로그인중입니다.
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { state, socket } from "@/socket";
import { useRouter, useRoute } from 'vue-router'



export default {
  name: "MainPage",
  setup() {
    const router = useRouter();
    const route = useRoute();

    return {
      route,
      router
    }
  },  
  data() {
    return {
      id: null,
      errMsg: null
    }
  },
  mounted() {
    socket.on('login-success', (data) => {
      if (data.userType === 'user') {
        router.push("/user");
      } else {
        router.push("/admin");
      }
    });

    socket.on('login-error', (err) => {
      this.errMsg = err;
    });
  },
  computed: {
    connected() {
      return state.connected;
    },
    loginError() {
      return state.loginError;
    },
    isUser() {
      return state.isUser;
    },
    isAdmin() {
      return state.isAdmin;
    },
    allUsers() {
      return state.allUsers;
    },
    userName() {
      return state.userName;
    }
  },
  methods: {
    login(event) {
      socket.emit('login', event.target.elements.id.value);
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  background-color: lightblue;

  .form-container {
    display: flex;
    position: relative;
    top: 50%;
    width: max-content;
    margin: 0 auto;
  }
}
</style>