<template>
<div></div>
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
}
</script>

<style lang="scss" scoped>

</style>