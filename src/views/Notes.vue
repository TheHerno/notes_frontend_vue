<template>
  <div>
    <Navbar />
    <v-layout mt-10 justify-center align-center>
      <v-flex xs-12 sm12 lg12 xl12>
        <v-alert v-show="error" dense outlined type="error">
          {{ error }}
        </v-alert>
        <v-dialog v-model="editModal" width="400" persistent @keyup.esc="cancelar()">
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" large>
              <v-icon large>add_circle</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-form
              style="max-width: 400px; margin: auto;"
              @submit="submitEdit"
              :reset="reset"
            >
              <v-card-title>
                <span v-text="selectedNote.id ? 'Editar Nota' : 'Nueva Nota'" />
              </v-card-title>
              <v-card-text>
                <v-text-field label="Titulo" v-model.lazy="selectedNote.title" />
                <v-textarea label="Detalle" v-model.lazy="selectedNote.content" />
              </v-card-text>
              <v-card-actions>
                <v-btn text @click="cancel()">Cancelar</v-btn>
                <v-btn color="primary" class="white--text" type="submit">Guardar</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
        <v-layout my-1 mx-4>
          <Note
            v-for="note in notes"
            :key="note.id"
            :note="note"
            @deleteNote="deleteConfirm(note)"
            @editNote="editNoteModal(note)"
          />
        </v-layout>
      </v-flex>
      <v-dialog v-model="deleteModal" max-width="400">
        <v-card>
          <v-card-title class="headline mb-0">Eliminar Nota</v-card-title>
          <v-card-text class="pt-0">
            <p class="mt-0 mb-2">
              ¿Confirmar la eliminación de
              <strong v-text="selectedNote.title" />?
            </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn text @click="cancel()">Cancelar</v-btn>
            <v-btn class="white--text" color="red" @click="submitDelete">
              Eliminar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Vue, Watch, Component } from "vue-property-decorator";
import UserModule from "@/UserModule";
import INote from "@/entities/Note";
import Navbar from "@/components/Navbar.vue";
import Note from "@/components/Note.vue";
import axios from "axios";

@Component({
  components: { Navbar, Note }
})
export default class Notes extends Vue {
  public notes: INote[] = [];
  public error = "";
  public selectedNote: INote = { title: "", content: "" };
  public deleteModal = false;
  public reset = false;
  public editModal = false;

  get logged(): boolean {
    return UserModule.logged;
  }

  public async getNotes() {
    try {
      const { data, error } = await axios.get("/notes", {
        headers: { Authorization: `Bearer ${UserModule.token}` }
      });
      if (error) {
        this.error = "Error al llamar a la api";
      } else {
        this.error = "";
        this.notes = data;
      }
    } catch (e) {
      this.error = "Ocurrió un error " + e;
    }
  }

  editNoteModal(note: INote) {
    this.selectedNote = { ...note };
    this.editModal = true;
  }

  deleteConfirm(note: INote) {
    this.selectedNote = { ...note };
    this.deleteModal = true;
  }

  async submitDelete() {
    const { error } = await axios.delete("/notes/" + this.selectedNote.id, {
      headers: { Authorization: `Bearer ${UserModule.token}` }
    });
    if (error) {
      this.error = "Error al eliminar nota";
    } else {
      this.getNotes();
      this.cancel();
    }
  }

  async submitEdit() {
    const { error } = this.selectedNote.id
      ? await axios.put("/notes/" + this.selectedNote.id, this.selectedNote)
      : await axios.post("/notes", this.selectedNote);
    if (error) {
      this.error = "Error al guardar nota";
    } else {
      this.getNotes();
      this.cancel();
    }
  }

  cancel() {
    this.selectedNote = {
      id: undefined,
      _id: undefined,
      title: "",
      content: ""
    };
    this.deleteModal = false;
    this.editModal = false;
    this.reset = !this.reset;
  }

  @Watch("selectedNote") selectedNoteWatch() {
    if (this.selectedNote._id && !this.selectedNote.id) {
      //compatibilizando mongo con sql
      this.selectedNote.id = this.selectedNote._id;
    }
  }

  async mounted() {
    if (!this.logged) {
      this.$router.push("/");
    }
    this.getNotes();
  }
}
</script>
