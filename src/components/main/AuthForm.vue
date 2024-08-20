<template>
  <div class="input-wrap">
    <input
      id="lisn-input"
      type="text"
      v-model="input"
      name="id"
      :disabled="isLoggedIn"
    />
    <label for="lisn-input" class="input-label">사번 or 이름</label>
    <button v-if="!isLoggedIn" class="login-btn" @click="login">로그인</button>
    <button v-else class="login-btn" @click="rejoin">재입장하기</button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { socket } from '@/socket';

const router = useRouter();
const store = useStore();
const input = ref('');
const isLoggedIn = ref(false);

const login = () => {
  socket.emit('login', input.value.toUpperCase());
};

const setLocalStorage = (data) => {
  let localData = localStorage.getItem('userInfo');

  if (!localData) {
    localStorage.setItem(
      'userInfo',
      JSON.stringify({
        id: data.id,
        name: data.name,
        einumber: data.einumber,
        teamName: data.team,
        isAdmin: data.isAdmin,
      })
    );
  }
  router.push('/waiting');
};

const rejoin = () => {
  let userInfo = JSON.parse(localStorage.getItem('userInfo'));

  socket.emit('rejoin', userInfo);
  router.push('/waiting');
};

onMounted(() => {
  let localData = localStorage.getItem('userInfo');

  if (localData) {
    isLoggedIn.value = true;
  } else {
    isLoggedIn.value = false;
  }

  socket.on('login', (data) => {
    if (data.error === true) {
      alert(data.msg);
    } else {
      setLocalStorage(data.userData);
      store.commit('setUserInfo', data.userData);
    }
  });
});

onBeforeUnmount(() => {
  socket.off('login');
});
</script>

<style scoped lang="scss">
.input-wrap {
  position: relative;
  height: 70vh;
  padding: 20px;
  padding-top: 200px;

  #lisn-input {
    width: 100%;
    height: 56px;
    border-bottom: 4px solid #999;
    background-color: transparent;
    transition: 0.3s all;
    color: #fff;
    font-size: 22px;
    font-weight: 500;

    &:focus {
      border-bottom: 4px solid #fff;
    }
  }

  .input-label {
    position: absolute;
    height: 26px;
    top: 174px;
    left: 20px;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
  }
}

.login-btn {
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: calc(100% - 40px);
  height: 60px;
  border-radius: 20px;
  font-size: 22px;
  background-color: #fff;
  color: #111;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
  cursor: pointer;
}
</style>
