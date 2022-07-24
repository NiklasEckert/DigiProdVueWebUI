<template>
  <div
      class="flex flex-col p-3 rounded mb-1 whitespace-nowrap select-none border-2 relative"
      :class="{
        'bg-amber-100 hover:bg-amber-200 hover:cursor-pointer border-amber-100': !selected && !hasParent,
        'bg-amber-200 border-amber-400': selected && !hasParent,
        'bg-amber-100/25 border-amber-100/25 text-gray-400': hasParent
      }"
  >
    <div class="flex flex-row">
      <div class="w-1/2">{{ typeName }}</div>
      <div class="w-1/2">{{ articleNumber }}</div>
    </div>

    <div class="flex flex-row">
      <div class="w-1/2">{{ qrCode }}</div>
      <div class="w-1/2">{{ orderNumber }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ComponentItem",
  props: ['orderNumber', 'qrCode', 'typeName', 'articleNumber', 'selected', 'hasParent']
}
</script>

<style scoped>

</style>