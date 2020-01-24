<template>
  <v-dialog v-model="isOpen" max-width="290">
    <v-card>
      <v-card-title class="headline">Confirm?</v-card-title>

      <v-card-text>{{ message }} </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="green darken-1" text @click="onNo">
          No
        </v-btn>

        <v-btn color="green darken-1" text @click="onYes">
          Yes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Modal",
  props: {
    message: {
      type: String,
      default: () => ""
    },
    isOpen: {
      type: Boolean,
      default: () => false
    }
  },
  created() {
    //console.log("Modal created");
  },
  methods: {
    onNo() {
      this.$emit("handleNo");
    },
    onYes() {
      this.$emit("handleYes");
    }
  }
};
</script>

<style lang="scss"></style>
