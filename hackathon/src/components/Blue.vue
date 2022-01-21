<template>
<div class="blue-container">
  {{data}}
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Blue extends Vue {
@Prop() data!: string;
}
</script>

<style lang="scss" scoped>
.blue-container {
  background-color: blue;
}
</style>