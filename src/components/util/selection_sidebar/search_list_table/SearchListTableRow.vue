<template>
  <tr
      :href="href"
      @click="navigate"
      class="transition duration-100 hover:cursor-pointer"
      :class="{ 'bg-amber-200 hover:bg-amber-200/50': isActive , 'hover:bg-gray-100': !isActive }"
  >
    <slot></slot>
  </tr>
</template>

<script>
export default {
  name: "SearchListTableRow",
  props: ['href', 'navigate', 'isActive']
}
</script>

<style scoped>

</style>