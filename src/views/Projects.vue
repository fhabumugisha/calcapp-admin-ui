<template>
  <v-card>
    <v-card-title>
      Projects
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
      :items="projects"
      :search="search"
      
    >
      <template v-slot:item.totalAmount="{ item }">
      {{ item.totalAmount | currency}}
    </template>
   

      <template v-slot:item.action="{ item }">
        <v-btn text icon color="indigo" :to="{ name: 'project-detail', params: { id: item.id } }">
              <v-icon>mdi-eye</v-icon>
            </v-btn>
      
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { projectsData } from "@/shared";
export default {
  name: "Projects",
  data() {
    return {
      totalProjects: 0,
      projects: [],
      loading: false,
      options: {},
      search: "",
      loadingText: "",
      error: null,
      headers: [
        { text: "Title", value: "title" },
        { text: "Type", value: "type" },
        { text: "Description", sortable: false, value: "description" },
        { text: "Items", sortable: false, value: "items.length", filterable: false },
        {
          text: "Categories",
          sortable: false,
          value: "categories.length",
          filterable: false
        },
        { text: "Total amount", value: "totalAmount" },
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
      this.loadingText = "Getting the projects, please be patient";
      try {
        const { content, totalElements } = await projectsData.getProjects();
        this.projects = content;
        this.totalProjects = totalElements;
      } catch (error) {
        this.error = error;
      } finally {
        this.loadingText = "";
        this.loading = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>
