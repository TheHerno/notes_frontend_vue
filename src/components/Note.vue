<template>
  <v-flex mx-2 xl2 lg2 sm4 xs4>
    <v-card elevation-5>
      <v-card-title v-text="note.title" />
      <v-card-text v-text="note.content" />
      <v-card-actions>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon small @click="editNote">
              <v-icon small>edit</v-icon>
            </v-btn>
          </template>
          <span>Editar</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon small @click="deleteNote">
              <v-icon small>delete</v-icon>
            </v-btn>
          </template>
          <span>Eliminar</span>
        </v-tooltip>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
  components: {},
  props: {
    note: { type: Object, default: { title: "", content: "" } }
  }
})
export default class Notes extends Vue {
  editNote() {
    this.$emit("editNote");
  }
  deleteNote() {
    this.$emit("deleteNote");
  }
}
</script>
