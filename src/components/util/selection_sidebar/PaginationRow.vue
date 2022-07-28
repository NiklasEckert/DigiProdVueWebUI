<template>
  <div class="flex flex-row justify-end ">
    <button class="ml-1" @click="this.$emit('firstPage')" :disabled="isFirst" :class="{ 'text-gray-400':isFirst, 'hover:cursor-pointer':!isFirst }">
      <font-awesome-icon icon="fa-solid fa-angles-left" />
    </button>

    <button class="ml-1" @click="this.$emit('previousPage')" :disabled="isFirst" :class="{ 'text-gray-400':isFirst, 'hover:cursor-pointer':!isFirst }">
      <font-awesome-icon icon="fa-solid fa-angle-left" />
    </button>

    <div class="ml-1">
      {{this.currentPage+1}} of {{this.countPages}}
    </div>

    <button class="ml-1" @click="this.$emit('nextPage')" :disabled="isLast" :class="{ 'text-gray-400':isLast, 'hover:cursor-pointer':!isLast }">
      <font-awesome-icon icon="fa-solid fa-angle-right" />
    </button>

    <button class="ml-1" @click="this.$emit('lastPage')" :disabled="isLast" :class="{ 'text-gray-400':isLast, 'hover:cursor-pointer':!isLast }">
      <font-awesome-icon icon="fa-solid fa-angles-right" />
    </button>
  </div>
</template>

<script>
export default {
  name: "PaginationRow",
  props: [
      'currentPage',
      'countPages',
      'isFirst',
      'isLast'
  ]
}
</script>

<style scoped>

</style>