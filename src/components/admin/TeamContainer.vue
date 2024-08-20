<template>
  <div class="team-container">
    <div
      v-for="(team, index) in teams"
      :key="index"
      class="team-wrap"
      :class="team.class"
    >
      <p class="team-title">{{ team.title }}</p>
      <ul class="user-wrap">
        <li
          class="user-data"
          v-for="(user, idx) in teamData[team.title]"
          :key="idx"
          :class="!user.isAlive ? 'dead' : null"
          @click="emit('revive', user)"
        >
          <div :class="['user-status', team.class]"></div>
          <p class="user-name">{{ user.name }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  teamData: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['revive']);

const teams = [
  { title: '양재', class: 'yangjae' },
  { title: '스포크', class: 'spoke' },
  { title: '디채', class: 'dichae' },
  { title: '모니모', class: 'monimo' },
];
</script>

<style scoped lang="scss">
.team-container {
  margin-top: 62px;
  color: #fff;
  height: 100%;

  .team-wrap {
    margin-top: 50px;
    background-color: transparent;

    &:first-child {
      margin-top: 32px;
    }

    &.yangjae {
      .user-wrap {
        &::before {
          background-color: #e84ed9;
        }

        .user-data {
          &::before {
            background-color: #e84ed9;
          }
        }
      }
    }

    &.spoke {
      .user-wrap {
        &::before {
          background-color: #639656;
        }

        .user-data {
          &::before {
            background-color: #639656;
          }
        }
      }
    }

    &.dichae {
      .user-wrap {
        &::before {
          background-color: #1c77ff;
        }

        .user-data {
          &::before {
            background-color: #1c77ff;
          }
        }
      }
    }

    &.monimo {
      .user-wrap {
        &::before {
          background-color: #ff9142;
        }

        .user-data {
          &::before {
            background-color: #ff9142;
          }
        }
      }
    }

    &.admin {
      .user-wrap {
        &::before {
          background-color: #eb1c1c;
        }
      }
    }

    &.other {
      .user-wrap {
        &::before {
          background-color: #4655da;
        }
      }
    }

    .team-title {
      font-size: 22px;
      color: #fff;
      font-weight: bold;
    }

    .user-wrap {
      display: flex;
      flex-wrap: wrap;
      position: relative;
      padding-left: 26px;
      background-color: transparent;

      &::before {
        content: '';
        position: absolute;
        top: 12px;
        left: 0;
        height: 100%;
        width: 10px;
        border-radius: 20px;
      }

      .user-data {
        position: relative;
        display: flex;
        margin-top: 22px;
        align-items: center;
        margin-right: 12px;

        &.dead {
          .user-status {
            background-color: #555;
          }

          &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 110%;
            height: 4px;
            border-radius: 5px;
          }
        }

        .user-status {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          margin-right: 9px;
        }

        .user-name {
          height: max-content;
          color: #fff;
          font-size: 16px;
          font-weight: 500;
          padding-bottom: 3px;
        }
      }
    }
  }
}
</style>
