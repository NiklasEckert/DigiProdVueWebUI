<template>
  <SelectionSidebar
      headline="Component Types"
      search-bar-placeholder="Name or Article Number"
      :search-text="this.componentTypesSearchState.key"
      @searchKeyEntered="(key) => fetchSearch(key)"
      @addButtonPressed="() => $router.push({ name: 'compType', query: { viewMode: 'creation' }})"
  >
    <div v-if="loading" class="text-center">LOADING</div>
    <ComponentTypesTable :types="this.componentTypesSearchState.searchResults" v-if="!loading"/>
  </SelectionSidebar>
  <router-view @saved="fetchSearch(this.componentTypesSearchState.key)" @deleted="onItemDeleted"></router-view>
</template>

<script>
import {ComponentTypeFetcher} from "@/utils/ComponentTypeFetcher";
import ComponentTypesTable from "@/components/component_type/ComponentTypesTable";
import SelectionSidebar from "@/components/util/selection_sidebar/SelectionSidebar";
import {componentTypesSearchState} from "@/components/component_type/componentTypes";

export default {
  name: "ComponentTypesView",
  components: {SelectionSidebar, ComponentTypesTable},
  data() {
    return {
      loading: false,
      error: null,
      componentTypesSearchState
    }
  },
  created() {
    if (componentTypesSearchState.fresh) {
      this.fetchSearch("")
      componentTypesSearchState.fresh = false
    }

    if (componentTypesSearchState.lastVisitedId != null) {
      this.$router.push({ name: 'compType', query: { id: componentTypesSearchState.lastVisitedId, viewMode: 'change' }})
    }
  },
  methods: {
    fetchSearch(key) {
      this.componentTypesSearchState.key = key

      this.error = this.post = null
      this.loading = true

      ComponentTypeFetcher.searchForKey(key)
          .then(response => {
            response.json().then(data => {
              this.componentTypesSearchState.searchResults = data
              this.loading = false
            })
          })
          .catch(error => {
            this.error = error
            this.loading = false
          })
    },
    onItemDeleted() {
      this.fetchSearch(this.componentTypesSearchState.key)
    }
  }
}
</script>

<style scoped>

</style>