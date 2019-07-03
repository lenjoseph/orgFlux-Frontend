<template>
  <div id="container">
    <button
      class="selector"
      id="org-select"
      @click="organizationView();"
      v-bind:style="[currentComponent == 'organization-view' ? {background: '#f2f2fa', color: '#457b9d', fontSize: '1.3em'}: {}]"
    >Organizations</button>
    <button
      class="selector"
      id="loc-select"
      @click="locationView();"
      v-bind:style="[currentComponent == 'location-view' ? {background: '#f2f2fa', color: '#457b9d', fontSize: '1.3em'}: {}]"
    >Locations</button>
    <button
      class="selector"
      id="event-select"
      @click="eventView();"
      v-bind:style="[currentComponent == 'event-view' ? {background: '#f2f2fa', color: '#457b9d', fontSize: '1.3em'}: {}]"
    >Events</button>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["currentComponent"])
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

$Light: #f6f6f8;
$Icon: #cbd3e3;
$Dark: #222629;
$Blue1: #4ecdc4;
$Blue2: #457b9d;
$Blue3: #1d3557;
$Red: #e63946;
$Offwhite: #f1faee;
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
    background: $Blue2;
    margin-left: 10px;
    margin-right: 10px;
    border: none;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    font-family: "Muli", sans-serif;
    font-size: 1.1em;
    color: $Light;
    cursor: pointer;
    box-shadow: 0px 3px 3px $Icon;
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
}
</style>

