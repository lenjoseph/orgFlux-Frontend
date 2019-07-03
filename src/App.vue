<template>
  <div id="app" v-bind:style="[darkMode == true ? {background: 'rgba(34, 38, 41, 1)'}: {}]">
    <div id="nav">
      <span id="company">
        <span id="logo">
          <span class="bar" id="bar1"></span>
          <span class="bar" id="bar2"></span>
          <span class="bar" id="bar3"></span>
        </span>
        <span id="brand">
          <p id="brand-text">orgFlux</p>
          <p id="attribution">A GraphQL API by Len Joseph</p>
        </span>
      </span>
      <dark-button />
    </div>
    <router-view />
  </div>
</template>
<script>
import DarkButton from "./components/Darkmode";
import { mapGetters } from "vuex";
export default {
  components: {
    darkButton: DarkButton
  },
  computed: {
    ...mapGetters(["darkMode"])
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Muli");
@import url("https://fonts.googleapis.com/css?family=Ubuntu");

$Light: #f6f6f8;
$Icon: #cbd3e3;
$Dark: #222629;
$Blue1: #4ecdc4;
$Blue2: #457b9d;
$Blue3: #1d3557;
$Red: #e63946;
$Offwhite: #f1faee;

* {
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  transition: ease-in-out all 0.2s;
  user-select: none;
}
#nav {
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(grey, 0.2);
  background: #f2f2fa;
  #company {
    display: flex;
    flex-direction: row;
    align-items: center;
    #logo {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: flex-end;
      height: 55px;
      width: 55px;
      border-radius: 50%;
      margin-right: 8px;
      margin-left: 8px;
      margin-bottom: 10px;
      // background: linear-gradient(rgba($Icon, 0.3), rgba($Icon, 1));
      .bar {
        display: flex;
        width: 8px;
        margin-left: 2px;
        margin-right: 2px;
        margin-bottom: 12px;
        background: linear-gradient($Blue1 10%, $Blue2);
        border-radius: 2px;
      }
      #bar1 {
        height: 30px;
      }
      #bar2 {
        height: 21px;
      }
      #bar3 {
        height: 26px;
      }
    }
    #brand {
      display: flex;
      flex-direction: row;
      align-items: center;
      #brand-text {
        display: flex;
        font-family: "Ubuntu", sans-serif;
        color: rgba($Blue2, 0.8);
        font-size: 1.7em;
      }
      #attribution {
        display: flex;
        font-family: "Ubuntu", sans-serif;
        color: rgba($Blue2, 0.8);
        font-size: 1em;
        margin-left: 15px;
        margin-top: 24px;
      }
    }
  }
}
</style>