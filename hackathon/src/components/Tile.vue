<template>
<div class="tile" :style="style"></div>
</template>

<script lang="ts">
import { Axis } from "@/enums/Axis";
import { Vue, Component, Prop } from "vue-property-decorator";

export interface TileConfig {
  id: string;
  width: number;
  height: number;
  xPos: number;
  yPos: number;
}

@Component({
  components: {},
})
export default class Tile extends Vue {
  @Prop() config!: TileConfig;
  @Prop() resizeFunction!: () => {x: number, y: number, width: number, height: number}; // px values
  @Prop() moveFunction!: () => {x: number, y: number}
  @Prop() gridToPx!: (gridValue: number, axis: Axis) => number;

  // Grid values
  private x = this.config.xPos;
  private y = this.config.yPos;
  private w = this.config.width;
  private h = this.config.height;

  // pxValues
  private get xPos() {
    return this.gridToPx(this.x, Axis.X);
  }
  
  private get yPos() {
    return this.gridToPx(this.y, Axis.Y);
  }

  private get height() {
    return this.gridToPx(this.h, Axis.Y);
  }

  private get width() {
    return this.gridToPx(this.w, Axis.X);
  }

  private get style() {
    return {
      height: `${this.height}px`,
      width: `${this.width}px`,
      top: `${this.yPos}px`,
      left: `${this.xPos}px`,
    }
  }
}
</script>

<style lang="scss" scoped>
.tile {
  position: absolute;
}
</style>