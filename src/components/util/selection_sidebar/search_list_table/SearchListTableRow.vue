<template>
  <tr
      :href="href"
      @click="navigate"
      class="hover:bg-gray-100 transition duration-100 hover:cursor-pointer"
      :class="{ 'bg-amber-200': isActive }"
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