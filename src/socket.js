export const  SOCKET_EVENT = {
  LOGIN: 'login',
  START_QUIZ: 'start_quiz',
  JOIN_QUIZ: 'join_quiz'
}

import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  loginError: false,
  isUser: false,
  userName: null,
  isAdmin: false,
  fooEvents: [],
  barEvents: []
});

const socketUrl = process.env.VUE_APP_SOCKET_URL || "http://localhost:3000"
export const socket = io(socketUrl);

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on("login-error", () => {
  state.loginError = true;
});

socket.on("login-success", (data) => {
  state.loginError = false;
  state.userName = data.id;

  if (data.userType === 'admin') {
    state.isAdmin = true;
  } else {
    state.isUser = true;
  }
});

