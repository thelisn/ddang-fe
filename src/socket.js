export const  SOCKET_EVENT = {
  LOGIN: 'login',
  START_QUIZ: 'start-quiz',
  JOIN_QUIZ: 'join-quiz',
  SHOW_ANSWER: 'show-answer'
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
