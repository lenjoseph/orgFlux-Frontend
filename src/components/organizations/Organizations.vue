<template>
  <div id="container" v-bind:style="[darkMode == true ? {background: 'rgba(34, 38, 41, 1)'}: {}]">
    <div id="controls" v-show="!editing">
      <input
        id="org-field"
        v-model="name"
        name="org-field"
        type="text"
        autocomplete="off"
        placeholder="Enter Organization Name..."
        v-bind:style="[darkMode == true ? {background: 'rgba(34, 38, 41, 1)', color: '#75e1dd'}: {}]"
        @keydown.enter="createOrganization();"
      />

      <button
        id="add-btn"
        @click="createOrganization();"
        :disabled="!name.length"
        v-bind:style="[darkMode == true ? {background: 'rgba(34, 38, 41, 1)'}: {}]"
      >
        <p id="add-text" v-bind:style="[darkMode == true ? {color: '#75e1dd'}: {}]">Add</p>
      </button>
    </div>
    <div id="edit" v-show="editing">
      <input
        id="edit-field"
        name="edit-field"
        type="text"
        autocomplete="off"
        v-model="newName"
        :placeholder="editOrg"
        v-bind:style="[darkMode == true ? {background: 'rgba(34, 38, 41, 1)', color: '#75e1dd'}: {}]"
        @keydown.enter="updateOrganization();"
      />
      <button
        v-bind:style="[darkMode == true ? {background: 'rgba(34, 38, 41, 1)', color: '#75e1dd'}: {}]"
        id="save-btn"
        @click="updateOrganization()"
        :disabled="!newName.length"
      >Save</button>
      <button
        id="cancel-btn"
        @click="editOff();"
        v-bind:style="[darkMode == true ? {background: 'rgba(34, 38, 41, 1)', color: '#75e1dd'}: {}]"
      >Cancel</button>
    </div>
    <div
      id="organizations"
      v-bind:style="[darkMode == true ? {background: 'rgba(34, 38, 41, 1)'}: {}]"
    >
      <div
        class="organization-data animation"
        id="card"
        v-for="(organization, index) in organizations"
        :key="organization._id"
        :organization="organization"
        v-bind:style="[darkMode == true ? {boxShadow: 'none'}: {}]"
      >
        <div class="buttons">
          <span class="btn-holder">
            <span
              v-bind:style="[darkMode == true ? {background: 'rgba(34, 38, 41, 1)', color: '#75e1dd'}: {}]"
              class="btn"
              id="locations"
              @click="orgLocations(organization._id, organization.name);"
            >Locations</span>
            <span
              v-bind:style="[darkMode == true ? {background: 'rgba(34, 38, 41, 1)', color: '#75e1dd'}: {}]"
              class="btn"
              id="events"
              @click="orgEvents(organization._id, organization.name)"
            >Events</span>
          </span>
          <span class="btn-holder">
            <span
              v-bind:style="[darkMode == true ? {background: 'rgba(34, 38, 41, 1)', color: '#75e1dd'}: {}]"
              class="btn"
              id="edit-btn"
              @click="editOn(organization);"
            >&#9998;</span>
          </span>
        </div>
        <div
          v-bind:style="[darkMode == true ? {borderLeft: '2px solid #75e1dd', borderBottom: '2px solid #75e1dd', borderRight: '2px solid #75e1dd', background: 'rgba(34, 38, 41, 1)'}: {}]"
          class="data"
        >
          <div class="org">
            <p
              v-bind:style="[darkMode == true ? {color: '#75e1dd'}: {}]"
              id="org-name"
            >{{organization.name}}</p>
          </div>
          <div class="time">
            <div v-bind:style="[darkMode == true ? {color: '#75e1dd'}: {}]" class="created">
              <p id="c-label">Created At</p>
              <p id="c-day">{{organization.cDay}}</p>
              <p id="c-time">{{organization.cTime}}</p>
            </div>
            <div v-bind:style="[darkMode == true ? {color: '#75e1dd'}: {}]" class="updated">
              <p id="u-label">Last Updated</p>
              <p id="u-day">{{organization.uDay}}</p>
              <p id="u-time">{{organization.uTime}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <show-locations
      :showLocs="showLocs"
      :orgLocs="orgLocs"
      :currentOrg="currentOrg"
      @close="showLocs=false"
    ></show-locations>
    <show-events
      :showEvs="showEvs"
      :orgEvs="orgEvs"
      :currentOrg="currentOrg"
      @close="showEvs=false"
    ></show-events>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { GET_ORGANIZATIONS } from "../../graphql/queries/organizationQueries";
import {
  CREATE_ORGANIZATION,
  UPDATE_ORGANIZATION
} from "../../graphql/mutations/organizationMutations";
import { format } from "path";
import { ORG_LOCATIONS } from "../../graphql/queries/locationQueries";
import { ORG_EVENTS } from "../../graphql/queries/eventQueries";
import ShowLocations from "./ShowLocations";
import ShowEvents from "./ShowEvents";
import { localTime } from "../../services/localTime";

export default {
  components: {
    showLocations: ShowLocations,
    showEvents: ShowEvents
  },
  data() {
    return {
      organizations: [],
      editing: false,
      name: "",
      editOrg: "",
      editID: "",
      newName: "",
      orgLocs: [],
      orgEvs: [],
      currentOrg: "",
      showLocs: false,
      showEvs: false
    };
  },
  computed: {
    ...mapGetters(["darkMode"])
  },
  methods: {
    editOn(organization) {
      this.editing = true;
      this.name = "";
      this.editOrg = "Editing " + organization.name + "...";
      this.editID = organization._id;
    },
    editOff() {
      this.editing = false;
      this.editOrg = "";
      this.newName = "";
      this.editID = "";
    },
    // fetches list of organizations
    async getOrganizations() {
      const response = await this.$apollo
        .query({ query: GET_ORGANIZATIONS })
        .then(async response => {
          const organizations = response.data.organizations.organizations;
          for (const org of organizations) {
            const timeCache = await localTime(org);
            org.cDay = timeCache.cDay;
            org.cTime = timeCache.cTime;
            org.uDay = timeCache.uDay;
            org.uTime = timeCache.uTime;
          }
          this.organizations = organizations;
        });
    },
    // gets Locations for specific organization (passing)
    async orgLocations(id, name) {
      const response = await this.$apollo
        .query({
          query: ORG_LOCATIONS,
          variables: {
            id: id
          }
        })
        .then(async response => {
          const orgLocs = response.data.orgLocations.locations;
          for (const location of orgLocs) {
            const timeCache = await localTime(location);
            location.cDay = timeCache.cDay;
            location.cTime = timeCache.cTime;
            location.uDay = timeCache.uDay;
            location.uTime = timeCache.uTime;
          }
          this.orgLocs = orgLocs;
        });
      this.currentOrg = name;
      this.showLocs = true;
    },
    // gets events for specific organization (passing)
    async orgEvents(id, name) {
      const response = await this.$apollo
        .query({
          query: ORG_EVENTS,
          variables: {
            id: id
          }
        })
        .then(async response => {
          const orgEvents = response.data.orgEvents.events;
          for (const event of orgEvents) {
            const timeCache = await localTime(event);
            event.cDay = timeCache.cDay;
            event.cTime = timeCache.cTime;
            event.uDay = timeCache.uDay;
            event.uTime = timeCache.uTime;
          }
          this.orgEvs = orgEvents;
        });
      this.currentOrg = name;
      this.showEvs = true;
    },
    // creates new organization
    async createOrganization() {
      await this.$apollo.mutate({
        mutation: CREATE_ORGANIZATION,
        variables: {
          name: this.name
        }
      });
      this.name = "";
      this.getOrganizations();
    },
    // updates existing organization
    async updateOrganization() {
      await this.$apollo.mutate({
        mutation: UPDATE_ORGANIZATION,
        variables: {
          id: this.editID,
          name: this.newName
        }
      });
      this.editOff();
      this.getOrganizations();
    }
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

.animation {
  animation: 0.3s ease-in-out both fade-in;
}
/* reduce 200 to 20 once pagination limited to 20 items */
@for $i from 1 through 200 {
  .animation {
    &:nth-child(#{$i}) {
      // Delay the animation. Delay increases as items loop.
      animation-delay: $i * (0.03s);
    }
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  60% {
    opacity: 0.6;
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

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
    padding: 8px;
    border-radius: 50px;
    background-image: linear-gradient(230deg, #0ad8a7, $primaryColor);
    #org-field {
      display: flex;
      width: 265px;
      height: 36px;
      border-radius: 30px;
      border: none;
      padding-left: 10px;
      margin-right: 14px;
      font-size: 1.2em;
      color: $darkColor;
      font-family: "Muli", sans-serif;
    }
    #org-field:focus {
      outline: none;
    }
    #org-field::placeholder {
      color: $primaryColor;
      font-family: "Muli", sans-serif;
    }
    #add-btn {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: 36px;
      width: 44px;
      border-radius: 16px;
      border: none;
      background: #fff;
      cursor: pointer;
      #add-text {
        display: flex;
        margin: auto;
        font-size: 1.2em;
        line-height: 1;
        font-family: "Muli", sans-serif;
        color: $darkColor;
      }
    }
    #add-btn:hover {
      box-shadow: 0px 2px 2px $black;
    }
    #add-btn:active {
      outline: none;
    }
    #add-btn {
      outline: none;
    }
  }
  #edit {
    display: flex;
    align-self: flex-end;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 30px;
    margin-right: 30px;
    padding: 8px;
    border-radius: 50px;
    background-image: linear-gradient(230deg, #0ad8a7, $primaryColor);
    #edit-field {
      display: flex;
      width: 300px;
      height: 36px;
      border-radius: 30px;
      border: none;
      padding-left: 10px;
      font-size: 1.2em;
      color: $darkColor;
      font-family: "Muli", sans-serif;
      margin-right: 14px;
    }
    #edit-field::placeholder {
      color: $primaryColor;
      font-family: "Muli", sans-serif;
    }
    #edit-field:focus {
      outline: none;
    }
    #save-btn {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: 36px;
      width: 54px;
      margin-right: 6px;
      border-radius: 30px;
      border: none;
      background: #fff;
      cursor: pointer;
      display: flex;
      font-size: 1em;
      line-height: 1;
      font-family: "Muli", sans-serif;
      color: $darkColor;
    }
    #save-btn:hover {
      box-shadow: 0px 2px 2px $black;
    }
    #save-btn:active {
      box-shadow: none;
    }
    #save-btn:focus {
      outline: none;
    }
    #cancel-btn {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: 36px;
      width: 64px;
      border-radius: 30px;
      border: none;
      background: #fff;
      cursor: pointer;
      display: flex;
      font-size: 1em;
      line-height: 1;
      font-family: "Muli", sans-serif;
      color: $darkColor;
    }
    #cancel-btn:hover {
      box-shadow: 0px 2px 2px $black;
    }
    #cancel-btn:active {
      box-shadow: none;
    }
    #cancel-btn:focus {
      outline: none;
    }
  }
  #organizations {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
    flex-wrap: wrap;
    overflow: auto;
    width: 100%;
    padding-top: 20px;
    min-height: calc(100% - 95px);
    max-height: 6000px;
    .organization-data {
      display: flex;
      flex-direction: column;
      height: 220px;
      min-height: 220px;
      width: 350px;
      max-width: 350px;
      flex-grow: 1;
      margin: 15px;
      border-radius: 8px;
      box-shadow: 0px 4px 4px grey;
      // transition: all 0.1s ease;
      background: #fff;

      .buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 50px;
        background-image: linear-gradient(230deg, #0ad8a7, $primaryColor);
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        padding-right: 5px;
        padding-left: 5px;
        .btn-holder {
          display: flex;
          flex-direction: row;
          align-items: center;
          height: 100%;
          .btn {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 22px;
            padding: 6px;
            border-radius: 6px;
            background: #fafafa;
            margin: 5px;
            font-size: 1.1em;
            font-family: "Muli", sans-serif;
            color: rgba($darkColor, 0.8);
            cursor: pointer;
          }
          .btn:hover {
            box-shadow: 0px 2px 2px $black;
          }
          .btn:active {
            box-shadow: none;
          }
          #edit-btn {
            font-size: 1.3em;
          }
        }
        #delete {
          padding-left: 10px;
          padding-right: 10px;
          font-weight: bold;
        }
      }
      .data {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: calc(100% - 50px);
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        .org {
          display: flex;
          flex-direction: row;
          align-items: center;
          height: 45%;
          #org-name {
            font-size: 1.6em;
            font-family: "Muli", sans-serif;
            color: $darkColor;
          }
        }
        .time {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;
          height: 55%;
          width: 100%;
          .created {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            width: 40%;
            height: 100%;
            font-size: 1.1em;
            color: $darkColor;
            font-family: "Muli", sans-serif;
            #c-label {
              font-size: 1.1em;
              margin-bottom: 6px;
              text-decoration: underline;
            }
          }
          .updated {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-end;
            width: 40%;
            height: 100%;
            font-size: 1.1em;
            color: $darkColor;
            font-family: "Muli", sans-serif;
            #u-label {
              font-size: 1.1em;
              margin-bottom: 6px;
              text-decoration: underline;
            }
          }
        }
      }
    }
    .organization-data:hover {
      transform: scale(1.01);
      transition: all 0.2s ease-in-out;
      box-shadow: 0px 7px 15px darkgray;
    }
  }
}
</style>

