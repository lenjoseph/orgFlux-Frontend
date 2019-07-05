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
$white: #fff;
$black: #424242;
$lightBlack: #232d3d;
$primaryColor: #3dafab;
$darkColor: #1e737c;
$lightColor: #75e1dd;
$secondaryColor: #f7e291;

.home {
  height: calc(100% - 116px);
  border-top: 1px solid rgba(grey, 0.2);
}
</style>
