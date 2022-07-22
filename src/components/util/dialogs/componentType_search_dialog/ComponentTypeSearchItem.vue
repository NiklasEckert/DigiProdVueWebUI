<template>
  <div
      class="flex flex-row p-3 rounded mb-1 whitespace-nowrap select-none border-2 relative"
      :class="{
        'bg-amber-100 hover:bg-amber-200 hover:cursor-pointer border-amber-100': !selected,
        'bg-amber-200 border-amber-400': selected
      }"
  >
    <div class="w-1/2">{{ this.name }}</div>
    <div class="w-1/2">{{ this.articleNumber }}</div>
  </div>
</template>

<script>
export default {
  name: "ComponentTypeSearchItem",
  props: ['name', 'articleNumber', 'selected']
}
</script>

<style scoped>

</style>