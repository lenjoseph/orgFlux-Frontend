<template>
  <div id="dark-mode">
    <button v-show="darkMode" id="dm-toggle-light" @click="toggleDarkMode();">Light Mode</button>
    <button v-show="!darkMode" id="dm-toggle" @click="toggleDarkMode();">Dark Mode</button>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["darkMode"])
  },
  methods: {
    toggleDarkMode() {
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
  #dm-toggle-light {
    display: flex;
    justify-content: center;
    height: 35px;
    width: 90px;
    border-radius: 6px;
    border: none;
    background: #f2f2fe;
    color: $Dark;
    margin-right: 8px;
    box-shadow: 0px 2px 2px lightgrey;
    font-family: "Ubuntu", sans-serif;
    font-size: 0.9em;
    cursor: pointer;
  }
  #dm-toggle-light:active {
    box-shadow: none;
    outline: none;
  }
  #dm-toggle-light:focus {
    outline: none;
  }
}
</style>
