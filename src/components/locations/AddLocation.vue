<template>
  <transition name="addLoc">
    <div id="container" @click="cancelAdd();" v-show="show">
      <div
        id="sub-container"
        @click.stop
        v-bind:style="[darkMode == true ? {background: 'rgba(34, 38, 41, 1)', color: '#75e1dd', border: '2px solid #4dafab'}: {}]"
      >
        <div id="header-wrap">
          <p id="header" v-bind:style="[darkMode == true ? {color: '#75e1dd'}: {}]">Add New Location</p>
        </div>
        <div id="org-select">
          <p
            id="org-prompt"
            v-bind:style="[darkMode == true ? {color: '#75e1dd'}: {}]"
          >Please select an organization for this location:</p>
          <select
            v-model="organization"
            id="org-picker"
            v-bind:style="[darkMode == true ? {background: 'rgba(34, 38, 41, 1)', color: '#75e1dd', border:'1px solid #75e1dd'}: {}]"
          >
            <option disabled selected value>Select Organization</option>
            <option v-for="org in organizations" :value="org">{{org.name}}</option>
          </select>
        </div>
        <div id="location-info">
          <div id="info-1">
            <div class="info-wrapper">
              <label
                for="name"
                class="label"
                v-bind:style="[darkMode == true ? {color: '#75e1dd'}: {}]"
              >Name</label>
              <input
                class="field"
                id="name"
                v-model="name"
                type="text"
                autocomplete="off"
                placeholder="e.g. Northeast Office"
                v-bind:style="[darkMode == true ? {background: 'rgba(34, 38, 41, 1)', color: '#75e1dd', border:'1px solid #75e1dd'}: {}]"
              />
            </div>
            <div class="info-wrapper">
              <label
                class="label"
                for="address"
                v-bind:style="[darkMode == true ? {color: '#75e1dd'}: {}]"
              >Address</label>
              <input
                class="field"
                id="address"
                v-model="address"
                type="text"
                autocomplete="off"
                placeholder="e.g. 123 Cowabunga Dr."
                v-bind:style="[darkMode == true ? {background: 'rgba(34, 38, 41, 1)', color: '#75e1dd', border:'1px solid #75e1dd'}: {}]"
              />
            </div>
          </div>
          <div id="info-2">
            <div class="info-wrapper">
              <label
                class="label"
                for="city"
                v-bind:style="[darkMode == true ? {color: '#75e1dd'}: {}]"
              >City</label>
              <input
                class="field"
                id="city"
                v-model="city"
                v-bind:style="[darkMode == true ? {background: 'rgba(34, 38, 41, 1)', color: '#75e1dd', border:'1px solid #75e1dd'}: {}]"
                type="text"
                autocomplete="off"
                placeholder="e.g. New York"
              />
            </div>
            <div class="info-wrapper">
              <label
                class="label"
                for="state"
                v-bind:style="[darkMode == true ? {color: '#75e1dd'}: {}]"
              >State</label>
              <input
                class="field"
                id="state"
                v-model="state"
                type="text"
                autocomplete="off"
                placeholder="e.g. New York"
                v-bind:style="[darkMode == true ? {background: 'rgba(34, 38, 41, 1)', color: '#75e1dd', border:'1px solid #75e1dd'}: {}]"
              />
            </div>
          </div>
          <div id="info-3">
            <div class="info-wrapper">
              <label
                class="label"
                for="country"
                v-bind:style="[darkMode == true ? {color: '#75e1dd'}: {}]"
              >Country</label>
              <input
                class="field"
                id="country"
                v-model="country"
                type="text"
                autocomplete="off"
                placeholder="e.g. United States"
                v-bind:style="[darkMode == true ? {background: 'rgba(34, 38, 41, 1)', color: '#75e1dd', border:'1px solid #75e1dd'}: {}]"
              />
            </div>
            <div class="info-wrapper">
              <label
                class="label"
                for="zip"
                v-bind:style="[darkMode == true ? {color: '#75e1dd'}: {}]"
              >Zip Code</label>
              <input
                class="field"
                id="zip"
                v-model="zip"
                type="number"
                autocomplete="off"
                placeholder="12345"
                maxlength="5"
                v-bind:style="[darkMode == true ? {background: 'rgba(34, 38, 41, 1)', color: '#75e1dd', border:'1px solid #75e1dd'}: {}]"
                @keydown.enter="createLocation();"
              />
            </div>
          </div>
        </div>
        <div id="controls">
          <button
            class="button"
            id="cancel"
            @click="cancelAdd();"
            v-bind:style="[darkMode == true ? {background: 'rgba(34, 38, 41, 1)', color: '#ff7f7e', border:'1px solid #ff7f7e'}: {}]"
          >Cancel</button>
          <button
            class="button"
            id="submit"
            v-bind:style="[darkMode == true ? {background: 'rgba(34, 38, 41, 1)', color: '#75e1dd', border:'1px solid #75e1dd'}: {}]"
            :disabled="formDisabled"
            @click="createLocation();"
          >Submit</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import { CREATE_LOCATION } from "../../graphql/mutations/locationMutations";
import { GET_ORGANIZATIONS } from "../../graphql/queries/organizationQueries";
export default {
  props: ["show"],
  data() {
    return {
      organizations: [],
      organization: "",
      name: "",
      address: "",
      city: "",
      state: "",
      country: "",
      zip: null
    };
  },
  computed: {
    ...mapGetters(["darkMode"]),
    formDisabled(){
      if (!this.organization || !this.name || !this.address || !this.city || !this.state || !this.country || this.zip.length != 5) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    clear() {
      this.organization = "";
      this.address = "";
      this.name = "";
      this.city = "";
      this.state = "";
      this.country = "";
      this.zip = null;
    },
    // cancels add location
    cancelAdd() {
      this.clear();
      this.$emit("close");
    },
    // fetches list of organizations
    async getOrganizations() {
      const response = await this.$apollo
        .query({ query: GET_ORGANIZATIONS })
        .then(response => {
          this.organizations = response.data.organizations.organizations;
        });
    },
    // creates new location
    async createLocation() {
      await this.$apollo
        .mutate({
          mutation: CREATE_LOCATION,
          variables: {
            organization: this.organization._id,
            name: this.name,
            address: this.address,
            city: this.city,
            state: this.state,
            country: this.country,
            zip: parseInt(this.zip, 10)
          }
        })
        .then(this.clear())
        .then(this.$emit("close"));
      this.$parent.getLocations();
    }
  },
  mounted: function() {
    document.addEventListener("keydown", e => {
      if (this.show && e.keyCode == 27) {
        this.cancelAdd();
      }
    });
  },

  created() {
    this.getOrganizations();
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

.addLoc-enter,
.addLoc-leave-active {
  opacity: 0;
}

.addLoc-enter-active {
  transition: all 0.3s ease-in;
  animation: zooom-in 0.3s;
}
.addLoc-leave-active {
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
    justify-content: space-between;
    width: 660px;
    height: 380px;
    margin: auto;
    margin-top: 25vh;
    padding: 15px 15px;
    background-color: #fafafa;
    border-radius: 6px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.33);
    z-index: 9999;
    #header-wrap {
      display: flex;
      #header {
        display: flex;
        font-family: "Muli", sans-serif;
        font-size: 1.3em;
        color: $darkColor;
      }
    }
    #org-select {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      height: 30%;
      width: 100%;
      #org-prompt {
        display: flex;
        font-family: "Muli", sans-serif;
        font-size: 1.2em;
        color: $darkColor;
      }
      #org-picker {
        display: flex;
        font-size: 1em;
        font-family: "Muli", sans-serif;
        border-radius: 10px;
      }
      #org-picker:focus {
        outline: none;
      }
    }
    #location-info {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      height: 60%;
      width: 100%;
      .label {
        font-family: "Muli", sans-serif;
        font-size: 1.1em;
        color: $darkColor;
        margin-bottom: 4px;
        margin-top: 4px;
      }
      .field {
        display: flex;
        height: 30px;
        width: 80%;
        border-radius: 10px;
        border: 2px solid rgba($primaryColor, 0.8);
        padding-left: 8px;
        font-family: "Ubuntu", sans-serif;
        color: $darkColor;
        font-size: 1em;
      }
      .field:focus {
        outline: none;
      }
      .field::placeholder {
        color: $primaryColor;
      }
      .info-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
      }
      #info-1 {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
      }
      #info-2 {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
      }
      #info-3 {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
      }
    }
    #controls {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: flex-end;
      height: 60px;
      width: 100%;
      .button {
        display: flex;
        flex-direction: row;
        justify-content: center;
        height: 35px;
        width: 100px;
        border-radius: 10px;
        border: none;
        font-family: "Ubuntu", sans-serif;
        font-size: 1em;
      }
      .button:hover {
        box-shadow: 0px 2px 2px lightgrey;
      }
      .button:active {
        box-shadow: none;
        outline: none;
      }
      .button:focus {
        outline: none;
      }
      #cancel {
        margin-right: 30px;
        background: rgba(red, 0.5);
      }
      #submit {
        margin-left: 30px;
        background: rgba($primaryColor, 0.7);
      }
    }
  }
}
</style>

