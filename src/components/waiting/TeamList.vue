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
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-block: 90px 120px;
  min-height: 100dvh;

  .team-wrap {
    background-color: transparent;

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
      margin-bottom: 11px;
    }

    .user-wrap {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      gap: 20px 12px;
      padding: 11px 0 13px 32px;
      background-color: transparent;

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 10px;
        height: 100%;
        min-height: 16px;
        border-radius: 20px;
      }

      .user-data {
        display: flex;
        align-items: center;

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
