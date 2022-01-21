<template>
<div class="tile" :style="style"></div>
</template>

<script lang="ts">
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
  @Prop() resizeFunction!: () => {x: number, y: number, width: number, height: number}; // px values
  @Prop() moveFunction!: () => {x: number, y: number}
  @Prop() gridToPx!: () => number;

  private get xPos() {
    return 0;
  }
  
  private get yPos() {
    return 0;
  }

  private get height() {
    return 0;
  }

  private get width() {
    return 0;
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