<template>
  <div id="container">
    <div id="org-select">
      <p id="org-prompt">Please select an organization for this location.</p>
      <select v-model="organization" id="org-picker">
        <option v-for="org in organizations" :value="org">{{org.name}}</option>
      </select>
    </div>
  </div>
</template>

<script>
import { CREATE_LOCATION } from "../graphql/mutations/locationMutations";
import { GET_ORGANIZATIONS } from "../graphql/queries/organizationQueries";
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
      zip: 0
    };
  },
  methods: {
    clear() {
      this.organization = "";
      this.address = "";
      this.name = "";
      this.city = "";
      this.state = "";
      this.country = "";
      this.zip = 0;
    },
    // fetches list of organizations
    async getOrganizations() {
      const response = await this.$apollo
        .query({ query: GET_ORGANIZATIONS })
        .then(response => {
          this.organizations = response.data.organizations.organizations;
        });
    },
    async createLocation() {
      await this.$apollo.mutate({
        mutation: CREATE_LOCATION,
        variables: {
          locationInput: {
            organization: this.organization,
            name: this.name,
            address: this.address,
            city: this.city,
            state: this.state,
            country: this.country,
            zip: this.zip
          }
        }
      });
      this.clear();
      this.$parent.getLocation();
      this.$emit("close");
    }
  },
  created() {
    this.getOrganizations();
  }
};
</script>

<style lang="scss" scoped>
</style>

