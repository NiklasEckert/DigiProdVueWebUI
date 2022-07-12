<template>
  <div
      class="flex-shrink-0 box-border bg-amber-50 custom-transition relative"
      :class="{ 'w-96': !isCollapsed, 'w-0': isCollapsed }"
  >
    <div class="flex flex-col h-screen whitespace-nowrap">
      <div class="p-6">
        <SelectionSidebarHeadline :headline="this.headline" />
        <div class="flex flex-row box-border mt-7">
          <SearchBar :placeholder="this.searchBarPlaceholder" @searchKeyEntered="(key) => this.$emit('searchKeyEntered', key)" :initial-text="this.searchText" />

          <StandardButton enabled="true" @click="() => this.$emit('addButtonPressed')">
            <font-awesome-icon :icon="['fas', 'plus']" />
            Add
          </StandardButton>
        </div>
      </div>

      <div class="overflow-scroll p-6 pt-0">
        <slot></slot>
      </div>
    </div>

    <div
        class="absolute w-7 h-7 top-5 -right-3 rounded-full z-50 bg-amber-400 flex justify-center hover:cursor-pointer"
        @click="isCollapsed = !isCollapsed"
    >
      <div class="center">
        <font-awesome-icon v-show="isCollapsed" icon="fa-solid fa-angle-right" />
        <font-awesome-icon v-show="!isCollapsed" icon="fa-solid fa-angle-left" />
      </div>
    </div>
  </div>
</template>

<script>
import SelectionSidebarHeadline from "@/components/util/selection_sidebar/SelectionSidebarHeadline";
import SearchBar from "@/components/util/SearchBar";
import StandardButton from "@/components/util/StandardButton";

export default {
  name: "SelectionSidebar",
  props: ['headline', 'searchBarPlaceholder', 'searchText'],
  components: {
    StandardButton,
    SearchBar,
    SelectionSidebarHeadline
  },
  data() {
    return {
      isCollapsed: false
    }
  }

}
</script>

<style scoped>
  .custom-transition {
    transition: 0.5s;
  }
  .center {
    margin: 0;
    position: absolute;
    top: 54%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
</style>