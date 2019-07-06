<template>
  <div id="container">
    <!-- <button @click="getEvents();">Get Events</button> -->
    <div v-for="(event, index) in events"></div>
  </div>
</template>

<script>
import { GET_EVENTS } from "../../graphql/queries/eventQueries";
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
// dark mode
$dText: #f6f6f8;
$dIcon: #cbd3e3;
$dBackground: #222629;
$dBlue1: #0074e1;
$dBlue2: #10e7dc;

// light mode
$lBackground: #f6f6f8;
$lIcon: #cbd3e3;
$lText: #222629;
$lBlue1: #0074e1;
$lBlue2: #10e7dc;
#container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: green;
  user-select: none;
}
</style>