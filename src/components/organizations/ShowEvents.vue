<template>
  <transition name="showLoc">
    <div id="container" @click="closeWindow();" v-show="showEvs">
      <div
        id="sub-container"
        @click.stop
        v-bind:style="[darkMode == true ? {background: 'rgba(34, 38, 41, 1)', color: '#75e1dd'}: {}]"
      >
        <div class="wrapper" id="header-wrap">
          <p
            class="text"
            id="header"
            v-bind:style="[darkMode == true ? {color: '#75e1dd'}: {}]"
          >{{currentOrg}}'s Events</p>
          <button
            class="text"
            id="close"
            v-bind:style="[darkMode == true ? {background: 'rgba(34, 38, 41, 1)', color: '#75e1dd', border: '1px solid #75e1dd'}: {}]"
            @click="closeWindow();"
          >X</button>
        </div>
        <div class="no-locs" v-show="!orgEvs.length">
          <p
            class="text"
            id="no-locs-text"
            v-bind:style="[darkMode == true ? {color: '#75e1dd'}: {}]"
          >No events to show for this organization.</p>
        </div>
        <div id="loc-wrapper">
          <div
            class="wrapper"
            id="locations"
            v-for="(event, index) in orgEvs"
            v-show="orgEvs.length"
            :key="event._id"
            :event="event"
            v-bind:style="[darkMode == true ? {color: 'rgba(34, 38, 41, 1)', background: 'linear-gradient(90deg, #0ad8a7, #3dafab)'}: {}]"
          >
            <div class="loc-info" id="info-1">
              <p
                class="loc-text"
                id="loc-name"
                v-bind:style="[darkMode == true ? {color: 'rgba(34, 38, 41, 1)'}: {}]"
              >{{event.name}}</p>
            </div>
            <div class="loc-info" id="info-2">
              <p
                class="loc-text"
                v-bind:style="[darkMode == true ? {color: 'rgba(34, 38, 41, 1)'}: {}]"
              >{{event.description}}</p>
              <p
                class="loc-text"
                v-bind:style="[darkMode == true ? {color: 'rgba(34, 38, 41, 1)'}: {}]"
              >{{event.eventDate}}</p>
              <p
                class="loc-text"
                v-bind:style="[darkMode == true ? {color: 'rgba(34, 38, 41, 1)'}: {}]"
              >{{event.eventTime}}</p>
            </div>

            <div class="loc-info" id="info-5">
              <div
                class="time"
                v-bind:style="[darkMode == true ? {color: 'rgba(34, 38, 41, 1)'}: {}]"
              >
                <div v-bind:style="[darkMode == true ? {color: '#75e1dd'}: {}]" class="created">
                  <p
                    id="c-label"
                    v-bind:style="[darkMode == true ? {color: 'rgba(34, 38, 41, 1)'}: {}]"
                  >Created At</p>
                  <p
                    id="c-day"
                    v-bind:style="[darkMode == true ? {color: 'rgba(34, 38, 41, 1)'}: {}]"
                  >{{event.cDay}}</p>
                  <p
                    id="c-time"
                    v-bind:style="[darkMode == true ? {color: 'rgba(34, 38, 41, 1)'}: {}]"
                  >{{event.cTime}}</p>
                </div>
                <div v-bind:style="[darkMode == true ? {color: '#75e1dd'}: {}]" class="updated">
                  <p
                    id="u-label"
                    v-bind:style="[darkMode == true ? {color: 'rgba(34, 38, 41, 1)'}: {}]"
                  >Last Updated</p>
                  <p
                    id="u-day"
                    v-bind:style="[darkMode == true ? {color: 'rgba(34, 38, 41, 1)'}: {}]"
                  >{{event.uDay}}</p>
                  <p
                    id="u-time"
                    v-bind:style="[darkMode == true ? {color: 'rgba(34, 38, 41, 1)'}: {}]"
                  >{{event.uTime}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["showEvs", "orgEvs", "currentOrg"],
  computed: {
    ...mapGetters(["darkMode"])
  },
  methods: {
    closeWindow() {
      this.$emit("close");
    },
    mounted: function() {
      document.addEventListener("keydown", e => {
        if (this.showEvs && e.keyCode == 27) {
          this.closeWindow();
        }
      });
    }
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

.showLoc-enter,
.showLoc-leave-active {
  opacity: 0;
}

.showLoc-enter-active {
  transition: all 0.3s ease-in;
  animation: zooom-in 0.3s;
}
.showLoc-leave-active {
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
    justify-content: flex-start;
    width: 660px;
    height: 380px;
    margin: auto;
    margin-top: 25vh;
    padding: 15px 15px;
    background-color: #fafafa;
    border-radius: 6px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.33);
    z-index: 9999;
    .no-locs {
      margin-top: 40px;
    }
    .wrapper {
      display: flex;
      flex-direction: column;
    }
    .text {
      display: flex;
      font-family: "Muli", sans-serif;
      font-size: 1.5em;
      color: $darkColor;
    }
    #header-wrap {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      height: 30px;
      #header {
        display: flex;
        width: 100%;
        margin-right: -30px;
        flex-direction: row;
        justify-content: center;
        font-family: "Muli", sans-serif;
        font-size: 1.5em;
        color: $darkColor;
      }
      #close {
        display: flex;
        height: 30px;
        width: 30px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        border: 2px solid rgba(red, 0.6);
        color: rgba(red, 0.7);
        line-height: 1;
        background: #fff;
        cursor: pointer;
      }
      #close:hover {
        box-shadow: 0px 2px 2px lightgrey;
      }
      #close:active {
        box-shadow: none;
        outline: none;
      }
      #close:focus {
        outline: none;
      }
    }
    #loc-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      overflow: auto;
      overflow-x: hidden;
      margin-top: 20px;
      #locations {
        display: flex;
        margin-top: 40px;
        width: 90%;
        background: rgba($primaryColor, 0.2);
        border-radius: 20px;

        .loc-info {
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
          margin-bottom: 10px;
          .time {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: flex-start;
            width: 100%;
            .created {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
              height: 100%;
              font-family: "Muli", sans-serif;
              color: rgba($black, 0.9);
              padding: 5px;
              padding-right: 15px;
              #c-label {
                text-decoration: underline;
              }
            }
            .updated {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-end;
              height: 100%;
              padding: 5px;
              padding-left: 15px;
              font-family: "Muli", sans-serif;
              color: rgba($black, 0.9);
              #u-label {
                text-decoration: underline;
              }
            }
          }
          .loc-text {
            display: flex;
            font-family: "Muli", sans-serif;
            color: rgba($black, 0.9);
            margin-left: 10px;
            margin-right: 10px;
          }
          #loc-name {
            font-size: 1.4em;
            margin-bottom: 10px;
          }
        }
      }
    }
  }
}
</style>
