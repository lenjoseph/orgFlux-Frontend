<template>
  <transition name="showOrg">
    <div id="container" @click="closeShow();" v-show="showOrg">
      <div
        id="sub-container"
        @click.stop
        v-bind:style="[darkMode == true ? {background: 'rgba(34, 38, 41, 1)', color: '#75e1dd', border: '2px solid #4dafab'}: {}]"
      >
        <div id="header-wrap">
          <p
            id="header"
            v-bind:style="[darkMode == true ? {color: '#75e1dd'}: {}]"
          >The {{theLocation}} location belongs to {{theOrg}}.</p>
        </div>

        <div id="controls">
          <button
            class="button"
            id="cancel"
            @click="closeShow();"
            v-bind:style="[darkMode == true ? {background: 'rgba(34, 38, 41, 1)', color: '#ff7f7e', border:'1px solid #ff7f7e'}: {}]"
          >Close</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["showOrg", "theOrg", "theLocation"],
  computed: {
    ...mapGetters(["darkMode"])
  },
  methods: {
    // closes Modal
    closeShow() {
      this.$emit("close");
    }
  },
  mounted: function() {
    document.addEventListener("keydown", e => {
      if (this.showOrg && e.keyCode == 27) {
        this.closeShow();
      }
    });
  }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Muli");
@import url("https://fonts.googleapis.com/css?family=Ubuntu");

$white: #fff;
$black: #424242;
$lightBlack: #232d3d;
$primaryColor: #3dafab;
$darkColor: #1e737c;
$lightColor: #75e1dd;
$secondaryColor: #f7e291;

.showOrg-enter,
.showOrg-leave-active {
  opacity: 0;
}

.showOrg-enter-active {
  transition: all 0.3s ease-in;
  animation: zooom-in 0.3s;
}
.showOrg-leave-active {
  animation: zooom-out 0.5s;
  transition: all 0.5s ease-out;
}

@keyframes zooom-in {
  0% {
    transform: scale(0.6);
  }

  100% {
    transform: scale(1);
  }
}
@keyframes zooom-out {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.1);
  }
}

#container {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    145deg,
    rgba(235, 216, 140, 0.71),
    rgba(61, 175, 171, 0.71)
  );
  #sub-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 360px;
    height: 220px;
    margin: auto;
    margin-top: 25vh;
    padding: 25px 25px;
    background-color: #fafafa;
    border-radius: 6px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.33);
    z-index: 9999;
    #header-wrap {
      display: flex;
      #header {
        display: flex;
        font-family: "Muli", sans-serif;
        font-size: 1.3em;
        color: $darkColor;
      }
    }
    #controls {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: flex-end;
      height: 60px;
      width: 100%;
      .button {
        display: flex;
        flex-direction: row;
        justify-content: center;
        height: 35px;
        width: 100px;
        border-radius: 10px;
        border: none;
        font-family: "Ubuntu", sans-serif;
        font-size: 1em;
      }
      .button:hover {
        box-shadow: 0px 2px 2px lightgrey;
      }
      .button:active {
        box-shadow: none;
        outline: none;
      }
      .button:focus {
        outline: none;
      }
      #cancel {
        background: rgba(red, 0.5);
      }
    }
  }
}
</style>

