<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex sm8 xs12 md4>
        <v-form>
          <v-card elevation-12>
            <v-card-title>Iniciar Sesión</v-card-title>
            <v-card-text>
              <v-text-field @keypress.enter="send" v-model="email" label="Email" />
              <v-text-field
                v-model="password"
                @keypress.enter="send"
                label="Contraseña"
                type="password"
              />
              <div v-if="error != ''" class="error">{{ error }}</div>
              <v-btn color="primary" @click="send()">Ingresar</v-btn>
            </v-card-text>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Vue, Watch, Component } from "vue-property-decorator";
import User from "./../../entities/User";
import axios from "axios";
import UserModule from "@/UserModule";

@Component({
  components: {}
})
export default class LoginForm extends Vue {
  public email = "";
  public error = "";
  public password = "";

  @Watch("email") watchEmail() {
    this.error = "";
  }

  @Watch("password") watchPassword() {
    this.error = "";
  }

  get logged(): boolean {
    return UserModule.logged;
  }

  mounted() {
    if (this.logged) {
      this.$router.push("notes");
    }
  }

  public async send(): Promise<void> {
    if (!this.email || !this.password) {
      this.error = "Complete todos los campos";
    } else {
      try {
        const user = new User(this.email, this.password);
        const { data, error } = await axios.post("/signin", user);

        if (data) {
          UserModule.token = data.token;
          this.$router.push("/notes");
        } else {
          this.error = error;
        }
      } catch (e) {
        this.error = "Ocurrió un Error";
      }
    }
  }
}
</script>
