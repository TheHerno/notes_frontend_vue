<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import "vuetify/dist/vuetify.css";
@Component({
  components: {}
})
export default class App extends Vue {}
</script>
