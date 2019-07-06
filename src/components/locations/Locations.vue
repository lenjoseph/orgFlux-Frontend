<template>
  <div id="container">
    <div id="controls">
      <button id="add" @click="showAddFunc();">Add Location</button>
    </div>
    <div id="locations">
      <div
        id="location"
        class="location"
        v-for="(location,index) in locations"
        :key="location._id"
        :location="location"
      >
        <div id="buttons">
          <button class="btn" id="delete" @click="deleteLocation(location._id)">X</button>
          <button class="btn" id="edit">&#9998;</button>
          <button
            class="btn"
            id="organization"
            @click="getOrganization(location.name, location.organization);"
          >View Organization</button>
        </div>
        <div id="data">
          <div class="data-element" id="name">
            <p class="text">{{location.name}}</p>
          </div>
          <div class="data-element" id="address">
            <p class="text">{{location.address}}</p>
          </div>
          <div class="data-element" id="city">
            <p class="text">{{location.city}}</p>
          </div>
          <div class="data-element" id="state">
            <p class="text">{{location.state}}</p>
          </div>
          <div class="data-element" id="country">
            <p class="text">{{location.country}}</p>
          </div>
          <div class="data-element" id="zip">
            <p class="text">{{location.zip}}</p>
          </div>
          <div class="data-element" id="latitude">
            <p class="text">{{location.latitude}}</p>
          </div>
          <div class="data-element" id="longitude">
            <p class="text">{{location.longitude}}</p>
          </div>
        </div>
      </div>
    </div>
    <add-location :show="showAdd" @close="showAdd=false"></add-location>
  </div>
</template>

<script>
import { GET_LOCATIONS } from "../../graphql/queries/locationQueries";
import AddLocation from "./AddLocation";
import { mapGetters } from "vuex";
import { DELETE_LOCATION } from "../../graphql/mutations/locationMutations";
import { GET_ORGANIZATION } from "../../graphql/queries/organizationQueries";
export default {
  components: {
    addLocation: AddLocation
  },
  data() {
    return {
      locations: [],
      showAdd: false
    };
  },
  computed: {
    ...mapGetters(["darkMode"])
  },
  methods: {
    // fetches list of locations (passing)
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
    },
    // gets organization for selected location (passing)
    async getOrganization(name, id) {
      await this.$apollo
        .query({
          query: GET_ORGANIZATION,
          variables: {
            id: id
          }
        })
        .then(response => {
          alert(name + " belongs to " + response.data.organization.name + ".");
        });
    },
    // deletes location (passing)
    async deleteLocation(id) {
      await this.$apollo.mutate({
        mutation: DELETE_LOCATION,
        variables: {
          id: id
        }
      });
      this.getLocations();
    },
    showAddFunc() {
      this.showAdd = true;
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
    border-radius: 50px;
    background-image: linear-gradient(230deg, #0ad8a7, $primaryColor);
    #add {
      display: flex;
      flex-direction: row;
      justify-content: center;
      background: #fff;
      font-family: "Muli", sans-serif;
      font-size: 1.1em;
      color: $darkColor;
      height: 40px;
      width: 150px;
      border-radius: 40px;
      border: none;
    }
    #add:active {
      box-shadow: inset 0px 0px 3px 1px grey;
      outline: none;
    }
    #add:focus {
      outline: none;
    }
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
      width: 98%;
      border-bottom: 1px solid #dddddd;
      transition: all 0.3s ease-in-out;
      background: #fff;
      font-family: "Ubuntu", sans-serif;
      #buttons {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 100%;
        .btn {
          display: flex;
          flex-direction: row;
          justify-content: center;
          height: 50%;
          width: 25px;
          margin: 5px;
          border-radius: 4px;
          border: none;
          background: rgba($primaryColor, 0.6);
          font-family: "Ubuntu", sans-serif;
          cursor: pointer;
        }
        .btn:hover {
          box-shadow: 0px 2px 2px lightgrey;
        }
        .btn:active {
          box-shadow: none;
          outline: none;
        }
        .btn:focus {
          outline: none;
        }
        #organization {
          width: 130px;
        }
        #edit {
          font-size: 1em;
        }
        #delete {
          background: rgba(red, 0.5);
          font-weight: bold;
        }
      }
      #data {
        display: flex;
        flex-direction: row;
        height: 100%;
        width: 100%;
        .data-element {
          display: flex;
          height: 100%;
          align-items: flex-start;
          .text {
            display: flex;
            padding: 15px;
            font-family: "Muli", sans-serif;
            font-size: 0.8em;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin: auto;
          }
        }
      }
    }
  }
}
</style>