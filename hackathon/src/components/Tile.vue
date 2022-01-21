<template>
<div class="tile" :style="style">
  <div class="header"
    @mousedown="startReposition($event)"
  ></div>
  <div class="body"></div>
</div>
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
  @Prop() moveFunction!: (startX: number, startY: number, tileWidth: number, tileHeight: number, xOffset: number, yOffset: number) => {x: number, y: number}
  @Prop() gridToPx!: (gridValue: number, axis: Axis) => number;

  // Grid values
  private x = this.config.xPos;
  private y = this.config.yPos;
  private w = this.config.width;
  private h = this.config.height;

  // Repositioning values
  private mouseClickX = 0;
  private mouseClickY = 0;
  private repositionStartX = 0;
  private repositionStartY = 0;

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

  private startReposition(event: MouseEvent) {
    this.mouseClickX = event.pageX;
    this.mouseClickY = event.pageY;

    this.repositionStartX = this.x;
    this.repositionStartY = this.y;

    document.addEventListener('mousemove', this.reposition);
    document.addEventListener('mouseup', this.stopReposition);
  }

  private reposition(event: MouseEvent) {
    const xOffset = event.pageX - this.mouseClickX;
    const yOffset = event.pageY - this.mouseClickY;
    const newPos = this.moveFunction(this.repositionStartX, this.repositionStartY, this.w, this.h, xOffset, yOffset);
    this.x = newPos.x;
    this.y = newPos.y;
  }

  private stopReposition() {
    document.removeEventListener('mousemove', this.reposition);
    document.removeEventListener('mouseup', this.stopReposition);
  }
}
</script>

<style lang="scss" scoped>
.tile {
  position: absolute;
}

.header {
  width: 100%;
  height: 20px;
  background-color: blue;

  cursor: move;
}

.body {
  width: 100%;
  height: calc(100% - 20px);
  background-color: red;
}
</style>