<template>
  <!-- build logged out user view and use user logged in as a conditional to render appropriate part -->
  <div class="home">
    <side-bar></side-bar>
    <transition name="component-fade" mode="out-in">
      <component v-bind:is="theComponent"></component>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
import OrganizationView from "../components/Organizations";
import LocationView from "../components/Locations";
import EventView from "../components/Events";

export default {
  name: "home",
  components: {
    organizationView: OrganizationView,
    locationView: LocationView,
    eventView: EventView
  },

  computed: {
    ...mapGetters(["currentComponent"])
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/gloabl.scss";

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.15s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}

.home {
  font-family: "Raleway", sans-serif;
  display: flex;
  flex-direction: row;
  width: calc(100% - 90px);
  margin-left: 90px;
  overflow: hidden;
}
</style>
