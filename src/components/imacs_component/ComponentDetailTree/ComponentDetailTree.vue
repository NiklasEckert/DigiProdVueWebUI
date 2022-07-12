<template>
  <div class="w-96 h-screen flex-shrink-0 border-box flex flex-col p-6">
    <h3 class="text-3xl font-bold mt-5 mb-5">ComponentTree</h3>
    <div class="overflow-scroll w-96">
      <ComponentDetailTreeWrapper :component="parentComponent"></ComponentDetailTreeWrapper>
    </div>
  </div>
</template>

<script>
import ComponentDetailTreeWrapper from "@/components/imacs_component/ComponentDetailTree/ComponentDetailTreeWrapper";

export default {
  name: "ComponentDetailTree",
  components: {ComponentDetailTreeWrapper},
  props: ['parentComponent']
}
</script>

<style scoped>

</style>