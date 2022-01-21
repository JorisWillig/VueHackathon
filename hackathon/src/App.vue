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
    gridWidth: 60,
    gridHeight: 40,
    gapSize: 8,
    tiles: [
      {
        tileConfig: {
          id: "tile1",
          width: 15,
          height: 10,
          xPos: 0,
          yPos: 0,
        },
        contentComponent: "Red",
        contentData: "Hallo, ik ben rood"
      },
      {
        tileConfig: {
          id: "tile2",
          width: 15,
          height: 10,
          xPos: 15,
          yPos: 0,
        },
        contentComponent: "Blue",
        contentData: "Maar ik ben blauw"
      },
      {
        tileConfig: {
          id: "tile1",
          width: 30,
          height: 25,
          xPos: 30,
          yPos: 0,
        },
        contentComponent: "Red",
        contentData: "Waaaaaat, ik ben ook rood!"
      },
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
