<template>
  <div>
    <button @click="fetchEvents();">Get Events</button>
    <div v-for="(event, index) in events"></div>
  </div>
</template>

<script>
import eventService from "../services/eventService";
export default {
  data() {
    return {
      events: []
    };
  },
  methods: {
    async fetchEvents() {
      const response = await eventService.fetchEvents().then(response => {
        console.log(response.data);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>