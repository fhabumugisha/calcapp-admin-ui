<template>
  <v-card>
    <v-card-title>
      Notifications
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
      :items="notifications"
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
      @handleYes="deleteNotification"
    ></Modal>
    <v-btn bottom color="pink" dark fab fixed right @click="dialog = !dialog">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class=" headline grey lighten-2" primary-title>
          Send notification
        </v-card-title>
        <v-container>
          <v-row class="mx-2">
            <v-col class="align-center justify-space-between" cols="12">
              <v-text-field
                v-model="editNotification.title"
                placeholder="Title"
                required
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                class="mx-2"
                v-model="editNotification.message"
                required
                placeholder="Message"
              >
              </v-textarea>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editNotification.imageUrl"
                placeholder="Image url"
              />
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn text @click="sendNotification">Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { NotificationsService } from "@/services";
import Modal from "@/components/Modal.vue";

export default {
  name: "Notifications",
  data() {
    return {
      dialog: false,

      editNotification: { title: "", message: "", imageUrl: "" },

      totalNotifications: 0,
      notifications: [],
      loading: false,
      options: {},
      search: "",
      loadingText: "",
      headers: [
        { text: "Title", value: "title" },
        { text: "Message", value: "message" },
        { text: "Image Url", value: "imageUrl" },
        { text: "Created at", value: "createdAt" },
        { text: "Updated at", value: "updatedAt" },
        { text: "Actions", value: "action", sortable: false }
      ],
      message: "",
      showModal: false,
      notificationToDelete: null
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
      this.loadingText = "Getting the notifications, please be patient";
      const {
        notifications,
        totalItems
      } = await NotificationsService.getNotifications();
      this.notifications = notifications;

      this.totalNotifications = totalItems;
      this.loadingText = "";
      this.loading = false;
    },

    askToDelete(notification) {
      this.notificationToDelete = notification;
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
    },

    async deleteNotification() {
      this.closeModal();
      if (this.notificationToDelete) {
        await NotificationsService.deleteNotification(
          this.notificationToDelete._id
        );
      }
      await this.getDataFromApi();
    },

    async sendNotification() {
      this.dialog = false;
      //console.log(this.editNotification);
      await NotificationsService.sendNotification(this.editNotification);
      await this.getDataFromApi();
    }
  },
  computed: {
    modalMessage() {
      const name =
        this.notificationToDelete && this.notificationToDelete.title
          ? this.notificationToDelete.id
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
