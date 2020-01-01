<template>
  <v-card>
    <v-card-title>
      Users
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-filter"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      class="elevation-1"
      :loading="loading"
      :loading-text="loadingText"
      :headers="headers"
      :items="users"
      :search="search"
      :options.sync="options"
      :server-items-length="totalUsers"
    >
      <template v-slot:item.action="{ item }">
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { usersData } from "@/shared";
export default {
  name: "Users",
  data() {
    return {
      totalUsers: 0,
      users: [],
      loading: false,
      options: {},
      search: "",
      loadingText: "",
      headers: [
        { text: "Email", value: "email" },

        { text: "Created at", value: "createdAt" },
        { text: "UpdatedAt", value: "updatedAt" },
        { text: "Actions", value: "action", sortable: false }
      ]
    };
  },
  watch: {
    options: {
      async handler() {
        await this.getDataFromApi();
      },
      deep: true
    }
  },
  async mounted() {
    await this.getDataFromApi();
  },
  methods: {
    async getDataFromApi() {
      // console.log("options : ", this.options);

      this.loading = true;
      this.items = [];
      this.loadingText = "Getting the users, please be patient";
      const { content, totalElements } = await usersData.getUsers();
      this.users = content;
      this.totalUsers = totalElements;
      this.loadingText = "";
      this.loading = false;
    }
  }
};
</script>
<style lang="scss" scoped></style>
