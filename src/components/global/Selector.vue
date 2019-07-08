<template>
  <div id="container">
    <button
      v-show="darkMode"
      class="selector-dark"
      id="org-select-dark"
      @click="organizationView();"
      v-bind:style="[currentComponent == 'organization-view' ? {background: 'linear-gradient(230deg, #0ad8a7, #3dafab)', color: 'rgba(34, 38, 41, 1)', fontSize: '1.3em'}: {}]"
    >Organizations</button>
    <button
      v-show="!darkMode"
      class="selector"
      id="org-select"
      @click="organizationView();"
      v-bind:style="[currentComponent == 'organization-view' ? {background: '#f2f2fa', color: '#457b9d', fontSize: '1.3em', border: '#3dafab'}: {}]"
    >Organizations</button>
    <button
      v-show="darkMode"
      class="selector-dark"
      id="loc-select-dark"
      @click="locationView();"
      v-bind:style="[currentComponent == 'location-view' ? {background: 'linear-gradient(230deg, #0ad8a7, #3dafab)', color: 'rgba(34, 38, 41, 1)', fontSize: '1.3em'}: {}]"
    >Locations</button>
    <button
      v-show="!darkMode"
      class="selector"
      id="loc-select"
      @click="locationView();"
      v-bind:style="[currentComponent == 'location-view' ? {background: '#f2f2fa', color: '#457b9d', fontSize: '1.3em', border: '#3dafab'}: {}]"
    >Locations</button>
    <button
      v-show="darkMode"
      class="selector-dark"
      id="event-select-dark"
      @click="eventView();"
      v-bind:style="[currentComponent == 'event-view' ? {background: 'linear-gradient(230deg, #0ad8a7, #3dafab)', color: 'rgba(34, 38, 41, 1)', fontSize: '1.3em'}: {}]"
    >Events</button>
    <button
      v-show="!darkMode"
      class="selector"
      id="event-select"
      @click="eventView();"
      v-bind:style="[currentComponent == 'event-view' ? {background: '#f2f2fa', color: '#457b9d', fontSize: '1.3em', border: '#3dafab'}: {}]"
    >Events</button>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      activeDark: "dark-mode-active",
      inactiveDark: "dark-mode-inactive"
    };
  },
  computed: {
    ...mapGetters(["currentComponent", "darkMode"])
  },
  methods: {
    ...mapMutations(["EVENT_VIEW"]),
    eventView: function() {
      this.EVENT_VIEW();
    },
    ...mapMutations(["ORGANIZATION_VIEW"]),
    organizationView: function() {
      this.ORGANIZATION_VIEW();
    },
    ...mapMutations(["LOCATION_VIEW"]),
    locationView: function() {
      this.LOCATION_VIEW();
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

#container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 45px;
  user-select: none;
  .selector {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32%;
    height: 100%;
    background-image: linear-gradient(230deg, #0ad8a7, $primaryColor);
    margin-left: 10px;
    margin-right: 10px;
    border: none;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 6px;
    font-family: "Muli", sans-serif;
    font-size: 1.2em;
    color: $white;
    cursor: pointer;
    box-shadow: 0px 3px 3px lightgrey;
    transition: ease-in-out all 0.1s;
  }
  .selector:active {
    outline: none;
    // transform: scale(0.98);
    box-shadow: none;
  }
  .selector:focus {
    outline: none;
  }
  .selector-dark {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32%;
    height: 100%;
    color: #75e1dd;
    background: rgba(34, 38, 41, 1);
    margin-left: 10px;
    margin-right: 10px;
    border: none;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 6px;
    font-family: "Muli", sans-serif;
    font-size: 1.2em;
    cursor: pointer;
    box-shadow: 0px 3px 3px #75e1dd;
    transition: ease-in-out all 0.1s;
  }
  .selector-dark:active {
    outline: none;
    // transform: scale(0.98);
    box-shadow: none;
  }
  .selector-dark:focus {
    outline: none;
  }
}
</style>

