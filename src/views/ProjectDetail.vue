<template>
  <transition name="slide">
    <div class="project">
      <div v-if="loading">Loading project...</div>

      <div v-if="error" class="errot">{{ error }}</div>
      <div v-if="project" class="content">
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="6">
            <v-card ref="form">
              <v-card-title>Project Details #{{ id }}</v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="project.title"
                  label="Title"
                  outlined
                  readonly
                ></v-text-field>
                <v-text-field
                  v-model="project.type"
                  label="Type"
                  outlined
                  readonly
                ></v-text-field>
                <v-text-field
                  v-model="project.createdAt"
                  label="Created at"
                  outlined
                  readonly
                ></v-text-field>
                <v-textarea
                  outlined
                  label="Description"
                  v-model="project.description"
                ></v-textarea>
                <v-divider></v-divider>
                <div v-if="project.type === 'Budget'">
                  <h2>Categories</h2>
                  <v-expansion-panels focusable>
                    <v-expansion-panel
                      v-for="(category, i) in project.categories"
                      :key="i"
                    >
                      <v-expansion-panel-header>
                        {{ category.title }}
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        Items : {{ category.items.length }}
                        <v-simple-table>
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th class="text-left">Title</th>
                                <th class="text-left">Description</th>
                                <th class="text-left">Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="item in category.items" :key="item.id">
                                <td>{{ item.title }}</td>
                                <td>{{ item.description }}</td>
                                <td>{{ item.amount }}</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </div>
                <div v-else>
                  <h2>Items</h2>
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Title</th>
                          <th class="text-left">Description</th>
                          <th class="text-left">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in project.items" :key="item.id">
                          <td>{{ item.title }}</td>
                          <td>{{ item.description }}</td>
                          <td>{{ item.amount }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" dark to="/projects"
                  >Return to projects</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
  </transition>
</template>

<script>
import { projectsData } from "@/shared";
export default {
  props: ["id"],

  beforeRouteUpdate(to, from, next) {
    this.id = to.params.id;
    next();
  },
  data() {
    return {
      project: null,
      loading: false,
      error: null
    };
  },
  async created() {
    //$route.params.id
    await this.getProject();
  },
  watch: {
    // call again the method if the route changes
    $route: "getProject"
  },
  methods: {
    async getProject() {
      this.loading = true;
      this.project = {};
      this.project = projectsData.getProject(this.id);
      this.loading = false;
      try {
        this.project = await projectsData.getProject(this.id);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
