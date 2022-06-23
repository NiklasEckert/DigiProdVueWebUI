<template>
  <div class="w-full h-full relative whitespace-nowrap overflow-hidden">
    <div class="center text-neutral-400 text-center">
      <font-awesome-icon :icon="this.icon" class="text-8xl"/>
      <div class="text-2xl mt-4">
        {{ this.text_primary}}
      </div>
      <div>
        {{ this.text_secondary }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoItemSelectedView",
  props: ['icon', 'text_primary', 'text_secondary']
}
</script>

<style scoped>
.center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>