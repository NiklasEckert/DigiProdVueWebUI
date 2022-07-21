<template>
  <div class="bg-amber-200 flex flex-row p-3 rounded mb-1 whitespace-nowrap select-none border-amber-400 border-2 relative">
    <div class="w-1/2">{{ this.name }}</div>
    <div class="w-1/2">{{ this.articleNumber }}</div>
    <div
        class="absolute w-5 h-5 -top-2.5 -right-2.5 rounded-full z-10 bg-amber-400 flex justify-center hover:cursor-pointer text-xs hover:bg-amber-500 hover:text-white"
        @click="this.$emit('deselect')"
    >
      <div class="center">
        <font-awesome-icon icon="fa-solid fa-xmark" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectedComponentTypeSearchItem",
  props: ['name', 'articleNumber']
}
</script>

<style scoped>
.center {
  margin: 0;
  position: absolute;
  top: 54%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>