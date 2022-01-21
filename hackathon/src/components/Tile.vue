<template>
<div class="tile" :style="style">
  <div class="tile-inner">
    <div class="top-handle handle" @mousedown="handleResize($event, ResizeDirection.Top)"></div>
    <div class="left-handle handle" @mousedown="handleResize($event, ResizeDirection.Left)"></div>
    <div class="right-handle handle" @mousedown="handleResize($event, ResizeDirection.Right)"></div>
    <div class="bottom-handle handle" @mousedown="handleResize($event, ResizeDirection.Bottom)"></div>
    <div class="tile-content">
      <slot />
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { Axis } from "@/enums/Axis";
import { ResizeDirection } from "@/enums/ResizeDirection";
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
  ResizeDirection = ResizeDirection;

  @Prop() config!: TileConfig;
  @Prop() resizeFunction!: (tileX: number, tileY: number, width: number, height: number, mousePosition: number, direction: ResizeDirection) => {x: number, y: number, width: number, height: number}; // gets grid values back
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

  handleResize(mouseEvent: MouseEvent, direction: ResizeDirection) {
    const dragHandler = (event: Event) => { 
      mouseEvent = (event as MouseEvent);
      const mousePos = direction === ResizeDirection.Top || direction === ResizeDirection.Bottom ? mouseEvent.y : mouseEvent.x;
      const newPos = this.resizeFunction(this.xPos, this.yPos, this.width, this.height, mousePos, direction);
      this.x = newPos.x;
      this.y = newPos.y;
      this.w = newPos.width;
      this.h = newPos.height;
    }

    window.addEventListener("mousemove", dragHandler);
    
    const endHandler = () => {
      window.removeEventListener("mousemove", dragHandler);
      window.removeEventListener("mouseup", endHandler);
    }

    window.addEventListener("mouseup", endHandler);
  }
}
</script>

<style lang="scss" scoped>
.tile {
  position: absolute;
  border: 1px solid black;

  .tile-inner {
    position: relative;
    height: 100%;
    width: 100%;

    .handle {
      position: absolute;
      background-color: green;
    }
    .top-handle, .bottom-handle {
        width: calc(100% - 16px);
        height: 8px;
        cursor: row-resize;
        left: 8px;
      }
      .top-handle {
        top: 0px;
      }
      .bottom-handle {
        bottom: 0px;
      }
      .left-handle, .right-handle {
        width: 8px;
        height: calc(100% - 16px);
        top: 8px;
        cursor: col-resize;
      }
      .left-handle {
        left: 0px;
      }
      .right-handle {
        right: 0px;
      }
    
  }
}
</style>