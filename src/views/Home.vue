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
import OrganizationView from "../components/organizations/Organizations";
import LocationView from "../components/locations/Locations";
import EventView from "../components/events/Events";
import ViewSelector from "../components/global/Selector";

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

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.15s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}

.home {
  height: calc(100% - 116px);
  border-top: 1px solid rgba(grey, 0.2);
}
</style>
