<template>
<div class="dashboard" ref="dashboardContainer">
  <Tile v-for="tile of dashboardConfig.tiles" :key="tile.id" :config="tile" :moveFunction="calculateTilePosition" :gridToPx="gridToPx"></Tile>
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

  private calculateTilePosition(startGridX: number, startGridY: number, tileWidth: number, tileHeight: number, xOffset: number, yOffset: number): {x: number, y: number} {
    const startX = this.gridToPx(startGridX, Axis.X);
    const startY = this.gridToPx(startGridY, Axis.Y);

    let gridX = this.pxToGrid(startX + xOffset, Axis.X);
    let gridY = this.pxToGrid(startY + yOffset, Axis.Y);

    gridX = gridX + tileWidth <= this.dashboardConfig.gridWidth ? gridX : this.dashboardConfig.gridWidth - tileWidth;
    gridX = gridX >= 0 ? gridX : 0;
    gridY = gridY + tileHeight <= this.dashboardConfig.gridHeight ? gridY : this.dashboardConfig.gridHeight - tileHeight;
    gridY = gridY >= 0 ? gridY : 0;

    return { x: gridX, y: gridY };
  }

  private calculateTileSize() {
    //TODO
  }

  private gridToPx(gridValue: number, axis: Axis): number {
    switch(axis) {
      case Axis.X:
        return gridValue * this.squareWidth;
      case Axis.Y:
        return gridValue * this.squareHeight;
     }
  }

  private pxToGrid(px: number, axis: Axis): number {
    switch(axis) {
      case Axis.X:
        return Math.floor(px / this.squareWidth);
      case Axis.Y:
        return Math.floor(px / this.squareHeight);
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