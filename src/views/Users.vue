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
    >
    <template v-slot:item.createdAt="{ item }">
          <span>{{ item.createdAt | moment("DD/MM/YYYY") }}</span>
      </template>
<template v-slot:item.updatedAt="{ item }">
          <span>{{ item.updatedAt | moment("DD/MM/YYYY") }}</span>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small @click="askToDelete(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
    <Modal
      :message="modalMessage"
      :isOpen="showModal"
      @handleNo="closeModal"
      @handleYes="deleteUser"
    ></Modal>
  </v-card>
</template>

<script>
import { usersData } from "@/shared";
import Modal from "@/components/Modal.vue";

export default {
  name: "Users",
  data() {
    return {
      dialog: false,

      totalUsers: 0,
      users: [],
      loading: false,
      options: {},
      search: "",
      loadingText: "",
      headers: [
        { text: "Email", value: "email" },

        { text: "Created at", value: "createdAt" },
        { text: "Updated at", value: "updatedAt" },
        { text: "Actions", value: "action", sortable: false }
      ],
      message: "",
      showModal: false,
      userToDelete: null
    };
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
      const { users, totalItems } = await usersData.getUsers();
      this.users = users;
      console.log('users', this.users);
      
      this.totalUsers = totalItems;
      this.loadingText = "";
      this.loading = false;
    },
    askToDelete(user) {
      this.userToDelete = user;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async deleteUser() {
      this.closeModal();
      if (this.userToDelete) {
        await usersData.deleteUser(this.userToDelete._id);
      }
      await this.getDataFromApi();
    }
  },
  computed: {
    modalMessage() {
      const name =
        this.userToDelete && this.userToDelete.email
          ? this.userToDelete.email
          : "";
      return `Would you like to delete ${name} ?`;
    }
  },
  components: {
    Modal
  }
};
</script>
<style lang="scss" scoped></style>
