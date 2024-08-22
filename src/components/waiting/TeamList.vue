<template>
  <ul class="team-container">
    <li class="team-wrap" v-for="team in teamData" :class="getClass(team[0].team)" :key="team">
      <p class="team-title">{{ team[0].team }}</p>
      <ul class="user-wrap">
        <li class="user-data" v-for="member in team" :key="member">
          <div class="user-status" :class="getClass(member.team)"></div>
          <p class="user-name">{{ member.name }}</p>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script setup>
import { defineProps } from "vue";
import { getClass } from "@/utils";

const props = defineProps(["teamData", "currentQuestion", "isAdmin"]);
</script>

<style lang="scss" scoped>
.team-container {
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
      }
    }

    &.spoke {
      .user-wrap {
        &::before {
          background-color: #639656;
        }
      }
    }

    &.dichae {
      .user-wrap {
        &::before {
          background-color: #1c77ff;
        }
      }
    }

    &.monimo {
      .user-wrap {
        &::before {
          background-color: #ff9142;
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
        content: "";
        position: absolute;
        top: 12px;
        left: 0;
        height: 100%;
        width: 10px;
        border-radius: 20px;
      }

      .user-data {
        display: flex;
        margin-top: 22px;
        align-items: center;
        margin-right: 12px;

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
