<template>
  <form @submit.prevent="" class="form">
    <div class="input-wrap">
      <label for="lisn-input" class="input-label">이름</label>
      <input id="lisn-input" type="text" v-model="input" name="id" :disabled="isLoggedIn" />
    </div>

    <div class="button-wrap">
      <button v-if="!isLoggedIn" class="login-btn" @click="login">로그인</button>
      <button v-else class="login-btn" @click="rejoin">재입장하기</button>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { socket } from "@/socket";

const router = useRouter();
const store = useStore();

const input = ref("");
const isLoggedIn = ref(false);

const login = () => {
  socket.emit("login", input.value.toUpperCase());
};

const setLocalStorage = (userInfoData) => {
  const hasLocalData = localStorage.getItem("userInfo");

  if (!hasLocalData) localStorage.setItem("userInfo", JSON.stringify(userInfoData));

  router.push({ path: "/waiting", state: { isRouter: true } });
};

const rejoin = () => {
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));

  socket.emit("rejoin", userInfo);
  router.push({ path: "/waiting", state: { isRouter: true } });
};

onMounted(() => {
  isLoggedIn.value = !!localStorage.getItem("userInfo");

  //@NOTE 로그인 후 다시 메인으로 왔을 경우 waiting으로 보낼지 리조인 만들지 수정 필요.
  socket.on("login", (data) => {
    if (data.error === true) {
      alert(data.msg);
    } else {
      setLocalStorage(data.userData);
      store.commit("setUserInfo", data.userData);
    }
  });
});

onBeforeUnmount(() => {
  socket.off("login");
});
</script>

<style scoped lang="scss">
.form {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  padding: 0 20px 20px;

  .input-wrap {
    padding-top: 100px;

    #lisn-input {
      width: 100%;
      height: 56px;
      font-size: 22px;
      font-weight: 500;
      color: #fff;
      border-bottom: 4px solid #999;
      background-color: transparent;

      transition: 0.3s all;

      &:focus {
        border-color: #fff;
      }
    }

    .input-label {
      display: inline-block;
      font-size: 16px;
      font-weight: 500;
      color: #fff;
    }
  }

  .button-wrap {
    .login-btn {
      width: 100%;
      height: 60px;
      font-family: "Noto Sans KR", sans-serif;
      font-weight: 500;
      font-size: 22px;
      color: #111;
      border-radius: 20px;
      background-color: #fff;
      cursor: pointer;
    }
  }
}
</style>
