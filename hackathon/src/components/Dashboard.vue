<template>
<div class="dashboard" ref="dashboardContainer">
  <Tile v-for="tile of dashboardConfig.tiles" :key="tile.id" :config="tile"></Tile>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Tile, { TileConfig } from "./Tile.vue";
import { Axis } from "@/enums/Axis";

export interface DashboardConfig {
  gridWidth: number; // Amount of squares
  gridHeight: number;
  gapSize: number;
  tiles: TileConfig[];
}

@Component({
  components: {
    Tile,
  },
})
export default class Dashboard extends Vue {
  @Prop() dashboardConfig!: DashboardConfig;

  private squareHeight = 0;
  private squareWidth = 0;

  private calculateGridSize() {
    const container = (this.$refs.dashboardContainer as HTMLElement);

    const totalWidth = container.clientWidth;
    const totalHeight = container.clientHeight;

    this.squareHeight = Math.floor(totalHeight / this.dashboardConfig.gridHeight);
    this.squareWidth = Math.floor(totalWidth / this.dashboardConfig.gridWidth);
  }

  private mounted() {
    this.calculateGridSize();
  }

  private calculateTilePosition() {
    //TODO
  }

  private calculateTileSize() {
    //TODO
  }

  private gridToPx(gridValue: number, axis: Axis) {
    switch(axis) {
      case Axis.X:
        return gridValue * this.squareWidth;
      case Axis.Y:
        return gridValue * this.squareHeight;
     }
  }
}
</script>

<style lang="scss" scoped>
  .dashboard {
    height: 100%;
    width: 100%;
    position: relative;
  }
</style>