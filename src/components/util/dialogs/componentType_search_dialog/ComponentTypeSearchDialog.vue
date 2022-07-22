<template>
  <ModalDialog
    title="Choose a Component Type"
    hint=""
  >
    <template v-slot:additionalFunction>
      <div class="bg-amber-50 p-6">
        <SearchBar
            class="w-full"
            placeholder="Name or Article Number"
            @searchKeyEntered="(key) => findComponentTypes(key)"
        />

        <hr class="my-3">

        <div v-if="loadingComponentTypes" class="text-center">
          Loading Component Types
        </div>

        <div v-if="componentTypes.length <= 0" class="text-center text-gray-500">
          No Items to display
        </div>

        <div v-if="componentTypes.length > 0">
          <ComponentTypeSearchItem
              v-for="componentType in componentTypes"
              :key="componentType.id"
              :article-number="componentType.articleNumber"
              :name="componentType.name"
              :selected="selectedComponentType !== null && componentType.id === selectedComponentType.id"
              @click="selectedComponentType = componentType"
              @deselect="this.selectedComponentType = null"
          />
        </div>
      </div>
    </template>

    <template v-slot:buttonRow>
      <button
          @click="this.$emit('selected', selectedComponentType.id)"
          class="text-white font-bold py-2 px-3 rounded-md ml-2"
          :class="{ 'bg-green-600 hover:bg-green-700 hover:shadow-md': this.selectedComponentType !== null, 'bg-green-600/50': this.selectedComponentType === null  }"
          :disabled="this.selectedComponentType === null"
      >
        <font-awesome-icon icon="fa-solid fa-check" class="mr-1"/>
        Select
      </button>
    </template>
  </ModalDialog>
</template>

<script>
import ModalDialog from "@/components/util/dialogs/ModalDialog";
import SearchBar from "@/components/util/SearchBar";
import {ComponentTypeFetcher} from "@/utils/ComponentTypeFetcher";
import ComponentTypeSearchItem from "@/components/util/dialogs/componentType_search_dialog/ComponentTypeSearchItem";

export default {
  name: "ComponentTypeSearchDialog",
  components: {ComponentTypeSearchItem, SearchBar, ModalDialog},
  data() {
    return {
      loadingComponentTypes: false,
      componentTypes: [],
      selectedComponentType: null
    }
  },
  beforeUpdate() {
    this.componentTypes = []
    this.selectedComponentType = null
  },
  methods: {
    findComponentTypes(key) {
      this.selectedComponentType = null
      if (key === "" || key === undefined) {
        this.componentTypes = []
      } else {
        this.loadingComponentTypes = true
        ComponentTypeFetcher.searchForKey(key, 0, 5)
            .then(response => {
              response.json().then(data => {
                this.componentTypes = data
                this.loadingComponentTypes = false
              })
            })
            .catch(error => {
              console.log(error)
              this.loadingComponentTypes = false
            })
      }
    }
  }
}
</script>

<style scoped>

</style>