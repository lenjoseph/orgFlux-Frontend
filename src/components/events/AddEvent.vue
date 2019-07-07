<template>
  <transition name="addLoc">
    <div id="container" @click="cancelAdd();" v-show="show">
      <div id="sub-container" @click.stop>
        <div id="header-wrap">
          <p id="header">Add New Event</p>
        </div>
        <div id="org-select">
          <p id="org-prompt">Please select an organization for this event:</p>
          <select v-model="organization" class="select" id="org-picker">
            <option disabled selected value>Select Organization</option>
            <option v-for="org in organizations" :value="org">{{org.name}}</option>
          </select>
        </div>
        <div id="location-info">
          <div id="info-1">
            <div class="info-wrapper">
              <label for="name" class="label">Name</label>
              <input class="field" id="name" v-model="name" type="text" placeholder="Team Offsite" />
            </div>
            <div class="info-wrapper">
              <label class="label" for="address">Description</label>
              <input
                class="field"
                id="address"
                v-model="description"
                type="text"
                placeholder="Celebrating our latest innovations."
              />
            </div>
          </div>
          <div id="info-2">
            <div class="info-wrapper" id="dates">
              <div id="date-header">
                <p class="label">Event Date</p>
              </div>
              <div class="select-wrapper" id="date-selector">
                <select v-model="month" class="select" id="month">
                  <option selected value>{{this.months[0]}}</option>
                  <option v-for="selection in months" :value="selection">{{selection}}</option>
                </select>
                <select v-model="day" class="select" id="day">
                  <option selected value>{{this.days[0]}}</option>
                  <option v-for="selection in days" :value="selection">{{selection}}</option>
                </select>
                <select v-model="year" class="select" id="year">
                  <option selected value>{{this.years[0]}}</option>
                  <option v-for="selection in years" :value="selection">{{selection}}</option>
                </select>
              </div>
            </div>
            <div class="info-wrapper" id="times">
              <div id="time-header">
                <p class="label">Event Time</p>
              </div>
              <div class="select-wrapper" id="time-selector">
                <select v-model="hour" class="select" id="hour">
                  <option selected value>{{this.hours[11]}}</option>
                  <option v-for="selection in hours" :value="selection">{{selection}}</option>
                </select>

                <select v-model="minute" class="select" id="minute">
                  <option selected value>{{this.minutes[0]}}</option>
                  <option v-for="selection in minutes" :value="selection">{{selection}}</option>
                </select>
                <select v-model="meridiem" class="select" id="meridiem">
                  <option selected value>AM</option>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div id="controls">
          <button class="button" id="cancel" @click="cancelAdd();">Cancel</button>
          <button
            class="button"
            id="submit"
            :disabled="!organization || !name || !description"
            @click="createEvent();"
          >Submit</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { CREATE_EVENT } from "../../graphql/mutations/eventMutations";
import { GET_ORGANIZATIONS } from "../../graphql/queries/organizationQueries";
export default {
  props: ["show"],
  data() {
    return {
      organizations: [],
      years: [],
      months: [],
      days: [],
      hours: [],
      minutes: [],
      organization: "",
      year: "",
      month: "",
      day: "",
      hour: "",
      minute: "",
      meridiem: "",
      name: "",
      description: "",
      eventDate: "",
      eventTime: ""
    };
  },
  methods: {
    // generates dropdown options for date selection
    genDates() {
      this.months.push(
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      );

      for (let i = 1; i <= 31; i++) {
        if (i < 10) {
          this.days.push("0" + i);
        } else {
          this.days.push(i);
        }
      }

      for (let i = 2019; i <= 2100; i++) {
        this.years.push(i);
      }
    },
    // generates dropdown options for time selection
    genTime() {
      for (let i = 1; i <= 12; i++) {
        this.hours.push(i);
      }

      for (let i = 0; i <= 60; i++) {
        if (i < 10) {
          this.minutes.push("0" + i);
        } else {
          this.minutes.push(i);
        }
      }
    },
    // clears data
    clear() {
      this.organization = "";
      this.name = "";
      this.description = "";
      this.eventDate = "";
      this.eventTime = "";
    },
    // cancels add location
    cancelAdd() {
      this.clear();
      this.$emit("close");
    },
    // fetches list of organizations (passing)
    async getOrganizations() {
      const response = await this.$apollo
        .query({ query: GET_ORGANIZATIONS })
        .then(response => {
          this.organizations = response.data.organizations.organizations;
        });
    },

    // passing
    async createEvent() {
      const month = this.month ? this.month : this.months[0];
      const day = this.day ? this.day : this.days[0];
      const year = this.year ? this.year : this.years[0];
      const hour = this.hour ? this.hour : this.hours[11];
      const minute = this.minute ? this.minute : this.minutes[0];
      const meridiem = this.meridiem ? this.meridiem : " AM";

      console.log(hour + ":" + minute + " " + meridiem);
      await this.$apollo
        .mutate({
          mutation: CREATE_EVENT,
          variables: {
            organization: this.organization._id,
            name: this.name,
            description: this.description,
            eventDate: month + " " + day + ", " + year,
            eventTime: hour + ":" + minute + " " + meridiem
          }
        })
        .then(response => {
          console.log(response);
        });
      this.clear();
      this.$parent.getEvents();
      this.$emit("close");
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
    this.genTime();
    this.genDates();
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
    .select {
      display: flex;
      font-size: 1em;
      font-family: "Muli", sans-serif;
      border-radius: 10px;
    }
    .select:focus {
      outline: none;
    }
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
      .info-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        .select-wrapper {
          display: flex;
          flex-direction: row;
        }
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

