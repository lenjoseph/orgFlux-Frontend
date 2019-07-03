<template>
  <div id="dark-mode">
    <button id="dm-toggle" @click="darkMode();">Dark Mode</button>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  methods: {
    darkMode() {
      this.$store.commit("DARK_MODE");
    }
  }
};
</script>

<style lang="scss" scoped>
$Light: #f6f6f8;
$Icon: #cbd3e3;
$Dark: #222629;
$Blue1: #4ecdc4;
$Blue2: #457b9d;
$Blue3: #1d3557;
$Red: #e63946;
$Offwhite: #f1faee;
#dark-mode {
  display: flex;
  user-select: none;
  #dm-toggle {
    display: flex;
    justify-content: center;
    height: 35px;
    width: 90px;
    border-radius: 6px;
    border: none;
    background: rgba($Dark, 0.8);
    color: $Light;
    margin-right: 8px;
    box-shadow: 0px 3px 3px $Icon;
    font-family: "Ubuntu", sans-serif;
    font-size: 0.9em;
    cursor: pointer;
  }
  #dm-toggle:active {
    box-shadow: none;
    outline: none;
  }
  #dm-toggle:focus {
    outline: none;
  }
}
</style>
