<template>
  <div>
    <button @click="getEvents();">Get Events</button>
    <div v-for="(event, index) in events"></div>
  </div>
</template>

<script>
import eventService from "../services/eventService";
import { GET_EVENTS } from "../graphql/query";
import axios from "axios";
export default {
  data() {
    return {
      events: []
    };
  },
  methods: {
    async getEvents() {
      const response = await this.$apollo
        .query({ query: GET_EVENTS })
        .then(response => console.log(response.data));
    }
  }
};
</script>

<style lang="scss" scoped>
</style>