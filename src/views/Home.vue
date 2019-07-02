<template>
  <!-- build logged out user view and use user logged in as a conditional to render appropriate part -->
  <div class="home">
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
  width: 100%;
  overflow: hidden;
}
</style>
