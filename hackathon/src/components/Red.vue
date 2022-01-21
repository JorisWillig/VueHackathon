<template>
<div class="red-container">
{{data}}
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Red extends Vue {
@Prop() data!: string;
}
</script>

<style lang="scss" scoped>
.red-container {
  background-color: red;
}
</style>