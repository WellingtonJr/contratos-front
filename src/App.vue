<script setup>
// import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>

        <!-- <v-img src="https://cdn-icons-png.flaticon.com/512/2666/2666501.png" width="30"></v-img> -->
        <v-btn variant="text" to="/">
          GEPEX - CONTRATOS
        </v-btn>
      </v-app-bar-title>
      <v-btn variant="plain" to="/cidades">
        Cidades
      </v-btn>

      <v-btn variant="plain" to="/prefeituras">
        Prefeituras
      </v-btn>

      <v-btn variant="plain" to="/pagamentos">
        Pagamentos
      </v-btn>
    </v-app-bar>
    <!-- <v-navigation-drawer></v-navigation-drawer> -->
    <router-view />

  </v-app>
</template>

<style scoped></style>

