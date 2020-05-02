<template>
  <Login />
</template>

<script lang="ts">
// @ is an alias to /src
import Login from "@/components/Auth/Login.vue";

import { Component, Vue } from "vue-property-decorator";

@Component({
  components: { Login }
})
export default class Home extends Vue {}
</script>
