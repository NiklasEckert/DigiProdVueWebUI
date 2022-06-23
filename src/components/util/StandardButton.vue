<template>
  <button
      class="text-black hover:text-white block py-2 px-3 rounded-md ml-4 whitespace-nowrap"
      :class="{ 'bg-amber-200 hover:bg-amber-400 hover:cursor-pointer': this.enabled, 'text-gray-400 bg-amber-200/25': !this.enabled}"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "StandardButton",
  props: ['enabled']
}
</script>

<style scoped>

</style>