<template>
  <div id="container">
    <div id="controls"></div>
    <div id="locations">
      <div
        id="location"
        class="location"
        v-for="(location,index) in locations"
        :key="location._id"
        :location="location"
      >
        <div id="buttons">
          <button id="delete">X</button>
          <button id="edit">&#9998;</button>
          <button id="organization">Organization</button>
        </div>
      </div>
    </div>
    <add-location :v-show="showAdd" @close="showAdd=false"></add-location>
  </div>
</template>

<script>
import { GET_LOCATIONS } from "../graphql/queries/locationQueries";
import AddLocation from "./AddLocation";
import { mapGetters } from "vuex";
export default {
  components: {
    addLocation: AddLocation
  },
  data() {
    return {
      locations: [],
      showAdd: true
    };
  },
  computed: {
    ...mapGetters(["darkMode"])
  },
  methods: {
    // fetches list of locations
    async getLocations() {
      const response = await this.$apollo
        .query({
          query: GET_LOCATIONS
        })
        .then(response => {
          if (response.data.locations.locations.length) {
            this.locations = response.data.locations.locations;
          }
        });
    }
  },
  created() {
    this.getLocations();
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
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
  height: 100%;
  width: 100%;
  user-select: none;
  #controls {
    display: flex;
    align-self: flex-end;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 30px;
    margin-right: 30px;
    padding: 6px;
    height: 60px;
    width: 350px;
    border-radius: 50px;
    background-image: linear-gradient(230deg, #0ad8a7, $primaryColor);
  }
  #locations {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
    height: 100%;
    width: 100%;
    padding-bottom: 15px;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 20px;
    overflow-y: auto;

    .location {
      display: flex;
      flex-direction: row;
      height: 60px;
      width: 95%;
      border-bottom: 1px solid #dddddd;
      transition: all 0.3s ease-in-out;
      background: #fff;
      font-family: "Ubuntu", sans-serif;
    }
  }
}
</style>