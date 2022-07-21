<template>
  <div class="bg-amber-100 flex flex-row p-3 rounded mb-1 whitespace-nowrap hover:bg-amber-200 select-none hover:cursor-pointer">
    <div class="w-1/2">{{ this.name }}</div>
    <div class="w-1/2">{{ this.articleNumber }}</div>
  </div>
</template>

<script>
export default {
  name: "ComponentTypeSearchItem",
  props: ['name', 'articleNumber']
}
</script>

<style scoped>

</style>