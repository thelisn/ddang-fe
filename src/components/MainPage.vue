<template>
  <div id="main-page" class="main-container">
    <button @click="testFunc">Test Button</button>

    <div class="logo-wrap">
      <img class="lisn" src="@/assets/images/lisn.svg" alt="LISN logo" aria-hidden="true" />
    </div>

    <div class="input-wrap">
      <input id="lisn-input" type="text" v-model="input" name="id" :disabled="isLoggedIn" />
      <label for="lisn-input" class="input-label">사번 or 이름</label>
    </div>

    <button v-if="!isLoggedIn" class="login-btn" @click="login">로그인</button>
    <button v-else class="login-btn" @click="rejoin">재입장하기</button>
  </div>
</template>

<script>
import { state, socket } from "@/socket";
import { useRouter, useRoute } from 'vue-router';
import { onMounted, ref, onBeforeUnmount, computed } from "vue";
import { useStore } from "vuex";
import axios from 'axios';


export default {
  name: "MainPage",
  setup() {
    // 변수 정의
    const router = useRouter();
    const route = useRoute();
    const input = ref("");
    const store = useStore();
    const isLoggedIn = ref(false);
    // const test = computed(() => store.state.name);

    // 함수 정의
    const testFunc = () => {
      socket.emit('test', {
        number: 3,
        correctAnswer: 2
      });
    }
    const login = () => {
      socket.emit('login', input.value.toUpperCase());
    };

    const setLocalStorage = (data) => {
      let localData = localStorage.getItem('userInfo');

      if (!localData) { 
        localStorage.setItem('userInfo', JSON.stringify({
          id: data.id,
          name: data.name,
          einumber: data.einumber,
          teamName: data.team,
          isAdmin: data.isAdmin
        }));
      }
      router.push('/waiting');


    };

    const rejoin = () => {
      let userInfo = JSON.parse(localStorage.getItem('userInfo'));

      socket.emit('rejoin', userInfo);
      router.push('/waiting');
    };

    

    // Life Cycle
    onMounted(() => {
      let localData = localStorage.getItem('userInfo');

      if (localData) {
        isLoggedIn.value = true;
      } else {
        isLoggedIn.value = false;
      }
      

      socket.on('login', (data) => {
        if (data.error === true) {
          alert(data.msg)
        } else {
          setLocalStorage(data.userData);
          store.commit("setUserInfo", data.userData);
        }
      });
    });

    onBeforeUnmount(() => {
      socket.off('login');
    });


    return {
      login,
      input,
      isLoggedIn,
      rejoin,
      testFunc
    }
  },  
  data() {
    return {
      errMsg: null
    }
  },
  computed: {
    connected() {
      return state.connected;
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
  }
}
</script>

<style lang="scss" scoped src="@/assets/scss/component/pages/MainPage.scss">
</style>