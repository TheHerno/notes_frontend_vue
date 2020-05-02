<template>
  <div>
    <v-app-bar flat dark color="accent">
      <v-toolbar-title>Notitas</v-toolbar-title>
      <v-tabs right>
        <v-tab link to="/">Home</v-tab>
        <v-tab link v-if="logged" to="#" @click.native.prevent="logout()">Cerrar Sesión</v-tab>
      </v-tabs>
    </v-app-bar>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import UserModule from "@/UserModule";
@Component({
  components: {}
})
export default class Navbar extends Vue {
  get logged(): boolean {
    return UserModule.logged;
  }

  mounted() {
    if (!this.logged) {
      this.$router.push("/");
    }
  }

  logout(): void {
    UserModule.logout();
    this.$router.push("/");
  }
}
</script>
