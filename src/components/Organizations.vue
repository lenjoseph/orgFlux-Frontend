<template>
  <div id="container">
    <div id="controls"></div>
    <div id="organizations">
      <div
        class="organization-data"
        id="card"
        v-for="(organization, index) in organizations"
        :key="organization._id"
        :organization="organization"
      >
        <div class="buttons">
          <span class="btn" id="locations">Locations</span>
          <span class="btn" id="events">Events</span>
          <span class="btn" id="delete">X</span>
        </div>
        <div class="data">
          <p>{{organization.name}}</p>
          <p>{{organization.CreatedAt}}</p>
          <p>{{organization.UpdatedAt}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import moment from "moment";
import { GET_ORGANIZATIONS } from "../graphql/queries/organizationQueries";
export default {
  data() {
    return {
      organizations: []
    };
  },
  methods: {
    async getOrganizations() {
      const response = await this.$apollo
        .query({ query: GET_ORGANIZATIONS })
        .then(response => {
          response.data.organizations.organizations.forEach(
            org =>
              (org.CreatedAt = moment(new Date(org.CreatedAt))
                .utc()
                .format("HH:mm:ss MMMM DD, YYYY"))
          );
          // response.data.organizations.organizations.forEach(
          //   org =>
          //     (org.UpdatedAt = moment(new Date(org.UpdatedAt))
          //       .utc()
          //       .format("HH:mm:ss MMMM DD, YYYY"))
          // );
          this.organizations = response.data.organizations.organizations;
        });
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

#container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: flex-start;
  height: 100%;
  width: 100%;
  // box-shadow: inset 2px 0px 5px darkgrey;
  user-select: none;
  #controls {
    display: flex;
    align-self: center;
    flex-direction: row;
    margin-top: 30px;
    height: 60px;
    width: 90%;
    border-radius: 30px;
  }
  #organizations {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    height: calc(100% - 110px);
    width: 100%;

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
      transition: all 0.6s ease;
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

        .btn {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 25px;
          padding: 7px;
          border-radius: 6px;
          background: #fafafa;
          margin: 5px;
          font-size: 1.1em;
          font-weight: bold;
          font-family: "Muli", sans-serif;
          color: $primaryColor;
          cursor: pointer;
        }
        .btn:hover {
          box-shadow: 0px 2px 2px $black;
        }
        .btn:active {
          box-shadow: none;
        }
        #delete {
          padding-left: 10px;
          padding-right: 10px;
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

