<template>
<div class="tile" :style="style">
  <div class="tile-inner">
    <div class="top-handle handle" @mousedown="handleResize($event, ResizeDirection.Top)"></div>
    <div class="left-handle handle" @mousedown="handleResize($event, ResizeDirection.Left)"></div>
    <div class="right-handle handle" @mousedown="handleResize($event, ResizeDirection.Right)"></div>
    <div class="bottom-handle handle" @mousedown="handleResize($event, ResizeDirection.Bottom)"></div>
    <div class="tile-content">
      <div class="header"
        @mousedown="startReposition($event)"
      ></div>
      <div class="body"></div>
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