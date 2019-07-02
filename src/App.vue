<template>
  <div id="app">
    <div id="header-group">
      <app-header></app-header>
    </div>
    <transition name="fade" mode="out-in">
      <router-view id="router-view"></router-view>
    </transition>
    <div id="footer-group">
      <app-footer id="footer"></app-footer>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  components: {
    appHeader: Header,
    appFooter: Footer
  },

  computed: {}
};
</script>


<style lang="scss">
@import "./styles/global.scss";

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.01s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 700px;
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
  app-header {
    z-index: 99;
  }

  #router-view {
    overflow: hidden;
    height: 100vh;
  }
  #footer-group {
    position: fixed;
    bottom: 0;
    margin-right: 0px;
    height: 30px;
    width: calc(100%-260px);
  }
}
</style>
