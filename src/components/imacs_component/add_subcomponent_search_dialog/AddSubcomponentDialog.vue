<template>
  <ModalDialog
    title="Add a Sub-Component"
    hint=""
  >
    <template v-slot:additionalFunction>
      <div class="bg-amber-50 p-6">
        <SearchBar
          class="w-full"
          placeholder="Order Number or QR Code"
          @searchKeyEntered="(key) => findComponents(key)"
        />

        <hr class="my-3">

        <div v-if="loadingComponents" class="text-center">
          Loading Components
        </div>

        <div v-if="components.length <= 0" class="text-center text-gray-500">
          No Items to display
        </div>

        <div v-if="components.length > 0">
          <AddSubcomponentItem
            v-for="component in components"
            :key="component.id"
            :type-name="component.componentType.name"
            :article-number="component.componentType.articleNumber"
            :qr-code="component.qrCode"
            :order-number="component.orderNumber"
            :has-parent="component.hasParent"
            :selected="selectedComponent !== null && component.id === selectedComponent.id"
            @click="() => {
              if (!component.hasParent) {
                selectedComponent = component
              }
            }"
          />
        </div>
      </div>
    </template>

    <template v-slot:buttonRow>
      <button
          @click="this.$emit('added', selectedComponent.id)"
          class="text-white font-bold py-2 px-3 rounded-md ml-2"
          :class="{ 'bg-green-600 hover:bg-green-700 hover:shadow-md': this.selectedComponent !== null, 'bg-green-600/50': this.selectedComponent === null  }"
          :disabled="this.selectedComponent === null"
      >
        <font-awesome-icon icon="fa-solid fa-check" class="mr-1"/>
        Add
      </button>
    </template>
  </ModalDialog>
</template>

<script>
import ModalDialog from "@/components/util/dialogs/ModalDialog";
import {ComponentFetcher} from "@/utils/ComponentFetcher";
import SearchBar from "@/components/util/SearchBar";
import AddSubcomponentItem from "@/components/imacs_component/add_subcomponent_search_dialog/AddSubcomponentItem";

export default {
  name: "AddSubcomponentDialog",
  components: {AddSubcomponentItem, SearchBar, ModalDialog},
  data() {
    return {
      loadingComponents: false,
      components: [],
      selectedComponent: null
    }
  },
  beforeMount() {
    this.components =[]
    this.selectedComponent = null
  },
  methods: {
    findComponents(key) {
      this.selectedComponent = null
      if (key === "" || key === undefined) {
        this.components = []
      } else {
        this.loadingComponents = true
        ComponentFetcher.searchForKey(key, 0, 5)
            .then(response => {
              response.json().then(data => {
                this.components = data.content
                this.loadingComponents = false
              })
            })
            .catch(error => {
              console.log(error)
              this.loadingComponents = false
            })
      }
    }
  }
}
</script>

<style scoped>

</style>