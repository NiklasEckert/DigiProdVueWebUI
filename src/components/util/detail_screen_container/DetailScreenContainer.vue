<template>
  <div class="flex flex-col h-screen box-border w-full overflow-scroll p-6 ">
    <div class="w-fit">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailScreenContainer"
}
</script>

<style scoped>

</style>