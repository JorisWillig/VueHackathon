<template>
<div class="dashboard" ref="dashboardContainer">
  <Tile v-for="tile of dashboardConfig.tiles" :key="tile.id" :config="tile" :gridToPx="gridToPx" :resizeFunction="calculateTileSize"></Tile>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Tile, { TileConfig } from "./Tile.vue";
import { Axis } from "@/enums/Axis";
import { ResizeDirection } from "@/enums/ResizeDirection";

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

  private snapToGrid(pxValue: number, gridSize: number) {
    return Math.round(pxValue/gridSize);
  }

  private calculateTileSize(tileX: number, tileY: number, width: number, height: number, mousePosition: number, direction: ResizeDirection) {
    const container = (this.$refs.dashboardContainer as HTMLElement);

    let outOfBounds;
    switch(direction) {
      case ResizeDirection.Top:
        outOfBounds = mousePosition < container.offsetTop;
        break;
      case ResizeDirection.Bottom:
        outOfBounds = mousePosition > container.offsetTop + container.clientHeight;
        break;
      case ResizeDirection.Left:
        outOfBounds = mousePosition < container.offsetLeft;
        break;
      case ResizeDirection.Right:
        outOfBounds = mousePosition > container.offsetLeft + container.clientWidth;
        break;
    }

    let newTileX = this.snapToGrid(tileX, this.squareWidth);
    let newTileY = this.snapToGrid(tileY, this.squareHeight);
    let newWidth = this.snapToGrid(width, this.squareWidth);
    let newHeight = this.snapToGrid(height, this.squareHeight);

    switch(direction) {
      case ResizeDirection.Top:
        newTileY = outOfBounds ? 0 : this.snapToGrid(mousePosition - container.offsetTop, this.squareHeight);
        newHeight = this.snapToGrid(height + (tileY - this.gridToPx(newTileY, Axis.Y)), this.squareHeight);
        break;
      case ResizeDirection.Bottom:
        newHeight = outOfBounds ? this.snapToGrid(container.clientHeight - tileY, this.squareHeight) : this.snapToGrid(mousePosition - container.offsetTop - tileY, this.squareHeight);
        break;
      case ResizeDirection.Left:
        newTileX = outOfBounds ? 0 : this.snapToGrid(mousePosition - container.offsetLeft, this.squareWidth);
        newWidth = this.snapToGrid(width + (tileX - this.gridToPx(newTileX, Axis.X)), this.squareWidth);
        break;
      case ResizeDirection.Right:
        newWidth = outOfBounds ? this.snapToGrid(container.clientWidth - tileX, this.squareWidth) : this.snapToGrid(mousePosition - container.offsetLeft - tileX, this.squareWidth);
        break;
    }

    return {x: newTileX, y: newTileY, height: newHeight, width: newWidth}
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