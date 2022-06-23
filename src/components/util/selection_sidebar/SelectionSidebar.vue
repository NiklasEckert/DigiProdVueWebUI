<template>
  <div class="flex flex-col flex-shrink-0 h-screen box-border w-96 bg-amber-50">
    <div class="p-6">
      <SelectionSidebarHeadline :headline="this.headline" />
      <div class="flex flex-row box-border mt-7">
        <SearchBar :placeholder="this.searchBarPlaceholder" @searchKeyEntered="(key) => this.$emit('searchKeyEntered', key)" />

        <StandardButton enabled="true" @click="() => this.$emit('addButtonPressed')">
          <font-awesome-icon :icon="['fas', 'plus']" />
          Add
        </StandardButton>
      </div>
    </div>

    <div class="overflow-scroll p-6 pt-0 h-full">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import SelectionSidebarHeadline from "@/components/util/selection_sidebar/SelectionSidebarHeadline";
import SearchBar from "@/components/util/SearchBar";
import StandardButton from "@/components/util/StandardButton";

export default {
  name: "SelectionSidebar",
  props: ['headline', 'searchBarPlaceholder'],
  components: {
    StandardButton,
    SearchBar,
    SelectionSidebarHeadline
  }

}
</script>

<style scoped>

</style>