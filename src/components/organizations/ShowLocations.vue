<template>
  <transition name="showLoc">
    <div id="container" @click="closeWindow();" v-show="showLocs">
      <div id="sub-container" @click.stop>
        <div class="wrapper" id="header-wrap">
          <p class="text" id="header">{{currentOrg}}'s Locations</p>
        </div>
        <div class="no-locs" v-show="!orgLocs.length">
          <p class="text" id="no-locs-text">No locations to show for this organization.</p>
        </div>
        <div id="loc-wrapper">
          <div
            class="wrapper"
            id="locations"
            v-for="(location, index) in orgLocs"
            v-show="orgLocs.length"
            :key="location._id"
            :location="location"
          >
            <div class="loc-info" id="info-1">
              <p class="loc-text" id="loc-name">{{location.name}}</p>
            </div>
            <div class="loc-info" id="info-2">
              <p class="loc-text">{{location.address}}</p>
              <p class="loc-text">{{location.city}}</p>
              <p class="loc-text">{{location.state}}</p>
            </div>
            <div class="loc-info" id="info-3">
              <p class="loc-text">{{location.country}}</p>
              <p class="loc-text">{{location.zip}}</p>
            </div>

            <div class="loc-info" id="info-4">
              <p class="loc-text">{{location.latitude}}</p>
              <p class="loc-text">{{location.longitude}}</p>
            </div>
            <div class="loc-info" id="info-5">
              <p class="loc-text">{{location.CreatedAt}}</p>
              <p class="loc-text">{{location.UpdatedAt}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["showLocs", "orgLocs", "currentOrg"],
  methods: {
    closeWindow() {
      this.$emit("close");
    },
    mounted: function() {
      document.addEventListener("keydown", e => {
        if (this.showLocs && e.keyCode == 27) {
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
      position: fixed;
      display: flex;
      height: 30px;
      #header {
        display: flex;
        font-family: "Muli", sans-serif;
        font-size: 1.5em;
        color: $darkColor;
      }
    }
    #loc-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      overflow: auto;
      overflow-x: hidden;
      margin-top: 30px;
      #locations {
        display: flex;
        margin-top: 40px;
        width: 90%;
        background: rgba($primaryColor, 0.2);
        border-radius: 20px;

        .loc-info {
          display: flex;
          flex-direction: row;
          justify-content: center;
          margin-bottom: 10px;
          .loc-text {
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
