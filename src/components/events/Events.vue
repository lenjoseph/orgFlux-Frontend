<template>
  <div id="container">
    <div id="controls">
      <button
        id="add"
        @click="showAddFunc();"
        v-bind:style="[darkMode == true ? {background: 'rgba(34, 38, 41, 1)', color: '#75e1dd'}: {}]"
      >Add Event</button>
    </div>
    <div id="locations" v-bind:style="[darkMode == true ? {borderTop: '1px solid #3dafab'}: {}]">
      <div
        id="location"
        class="location"
        v-for="(event,index) in events"
        :key="event._id"
        :event="event"
        v-bind:style="[darkMode == true ? {background: 'rgba(34, 38, 41, 1)', color: '#75e1dd', borderBottom: '1px solid #4dafab'}: {}]"
      >
        <div
          id="buttons"
          v-bind:style="[darkMode == true ? {background: '  linear-gradient(-90deg, #0ad8a7, #3dafab)'}: {}]"
        >
          <button
            class="btn"
            id="delete"
            @click="deleteEvent(event._id)"
            v-bind:style="[darkMode == true ? {background: 'rgba(34, 38, 41, 1)', color: '#ff7f7e'}: {}]"
          >X</button>
          <button
            class="btn"
            id="edit"
            @click="showUpdateFunc(event._id);"
            v-bind:style="[darkMode == true ? {background: 'rgba(34, 38, 41, 1)', color: '#75e1dd'}: {}]"
          >&#9998;</button>
          <button
            class="btn"
            id="organization"
            @click="getOrganization(event.name, event.organization);"
            v-bind:style="[darkMode == true ? {background: 'rgba(34, 38, 41, 1)', color: '#75e1dd'}: {}]"
          >View Organization</button>
        </div>
        <div id="data">
          <div class="data-element" id="name">
            <p class="text">{{event.name}}</p>
          </div>
          <div class="data-element" id="address">
            <p class="text">{{event.description}}</p>
          </div>
          <div class="data-element" id="city">
            <p class="text">{{event.eventDate}}</p>
          </div>
        </div>
      </div>
    </div>
    <add-event :show="showAdd" @close="showAdd=false"></add-event>
    <update-event :show="showUpdate" :updateID="eventID" :source="source" @close="showUpdate=false"></update-event>
  </div>
</template>

<script>
import { GET_EVENTS, GET_EVENT } from "../../graphql/queries/eventQueries";
import AddEvent from "./AddEvent";
import UpdateEvent from "./UpdateEvent";
import { mapGetters } from "vuex";
import { DELETE_EVENT } from "../../graphql/mutations/eventMutations";
import { GET_ORGANIZATION } from "../../graphql/queries/organizationQueries";
export default {
  components: {
    addEvent: AddEvent,
    updateEvent: UpdateEvent
  },
  data() {
    return {
      events: [],
      showAdd: false,
      showUpdate: false,
      eventID: "",
      source: ""
    };
  },
  computed: {
    ...mapGetters(["darkMode"])
  },
  methods: {
    // fetches list of locations (passing)
    async getEvents() {
      const response = await this.$apollo
        .query({
          query: GET_EVENTS
        })
        .then(response => {
          if (response.data.events.events.length) {
            this.events = response.data.events.events;
          }
        });
    },
    // gets current data for selected event
    async getEvent(updateID) {
      await this.$apollo
        .query({
          query: GET_EVENT,
          variables: {
            id: updateID
          }
        })
        .then(response => {
          this.source = response.data.event;
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
    // deletes event
    async deleteEvent(id) {
      await this.$apollo.mutate({
        mutation: DELETE_EVENT,
        variables: {
          id: id
        }
      });
      this.getEvents();
    },
    showAddFunc() {
      this.showAdd = true;
    },
    setID(id) {
      this.eventID = id;
    },
    async showUpdateFunc(id) {
      await this.getEvent(id);
      console.log(this.source);
      this.showUpdate = true;
    }
  },
  created() {
    this.getEvents();
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
  align-content: center;
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
      width: 120px;
      border-radius: 40px;
      border: none;
      cursor: pointer;
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
    align-self: center;
    align-items: center;
    flex-wrap: nowrap;
    height: 100%;
    width: 95%;
    padding-bottom: 15px;
    margin-top: 20px;
    overflow-y: auto;
    border-top: 1px solid #dddddd;

    .location {
      display: flex;
      flex-direction: row;
      height: 60px;
      width: 100%;
      border-bottom: 1px solid #dddddd;
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
        .data-element {
          display: flex;
          height: 100%;
          align-items: flex-start;
          .text {
            display: flex;
            padding: 15px;
            font-family: "Muli", sans-serif;
            font-size: 0.8em;
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