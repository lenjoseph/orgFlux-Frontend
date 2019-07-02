<template>
  <div>
    <button @click="eventView();">Events</button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["EVENT_VIEW"]),
    eventView: function() {
      this.EVENT_VIEW();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

