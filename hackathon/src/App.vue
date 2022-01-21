<template>
  <Dashboard :dashboardConfig="dashboardConfig"></Dashboard>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Dashboard, { DashboardConfig } from '@/components/Dashboard.vue';

@Component({
  components: {
    Dashboard,
  },
})
export default class App extends Vue {

  dashboardConfig: DashboardConfig = {
    gridWidth: 15,
    gridHeight: 15,
    gapSize: 8,
    tiles: [
      {
        id: "tile1",
        width: 10,
        height: 15,
        xPos: 0,
        yPos: 0,
      },
      {
        id: "tile2",
        width: 5,
        height: 15,
        xPos: 10,
        yPos: 0,
      }
    ],
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

html, body {
  height: 100%;
  margin: 0;
}
</style>
