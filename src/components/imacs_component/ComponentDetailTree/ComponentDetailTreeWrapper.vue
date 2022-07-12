<template>
  <ComponentDetailTreeItem :component="component"></ComponentDetailTreeItem>
  <div v-if="component.children.length>0" class="flex flex-row">
    <div class="border-l-2 border-gray-400 w-9 flex-shrink-0 ml-3"></div>
    <div>
      <div v-for="child in component.children" :key="child.id">
        <ComponentDetailTreeWrapper :component="child"></ComponentDetailTreeWrapper>
      </div>
    </div>
  </div>
</template>

<script>
import ComponentDetailTreeItem from "@/components/imacs_component/ComponentDetailTree/ComponentDetailTreeItem";

export default {
  name: "ComponentDetailTreeWrapper",
  components: {ComponentDetailTreeItem},
  props: ['component']
}
</script>

<style scoped>

</style>