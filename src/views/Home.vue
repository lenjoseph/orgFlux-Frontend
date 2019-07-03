<template>
  <div class="home">
    <view-selector />
    <transition name="component-fade" mode="out-in">
      <component v-bind:is="currentComponent"></component>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import OrganizationView from "../components/Organizations";
import LocationView from "../components/Locations";
import EventView from "../components/Events";
import ViewSelector from "../components/Selector";

export default {
  name: "home",
  components: {
    organizationView: OrganizationView,
    locationView: LocationView,
    eventView: EventView,
    viewSelector: ViewSelector
  },

  computed: {
    ...mapGetters(["currentComponent"])
  }
};
</script>

<style lang="scss" scoped>
$dText: #f6f6f8;
$dIcon: #cbd3e3;
$dBackground: #222629;
$dBlue1: #0074e1;
$dBlue2: #10e7dc;

// light mode
$lBackground: #f6f6f8;
$lIcon: #cbd3e3;
$lText: #222629;
$lBlue1: #0074e1;
$lBlue2: #10e7dc;
</style>
