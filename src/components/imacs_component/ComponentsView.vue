<template>
  <SelectionSidebar
      headline="Components"
      search-bar-placeholder="Name, article or order number"
      :search-text="this.componentSearchState.key"
      @searchKeyEntered="(key) => fetchSearch(key)"
      @addButtonPressed="() => $router.push({ name: 'component', query: { viewMode: 'creation' }})"
  >
    <div v-if="loading" class="text-center">LOADING</div>
    <ComponentTable :componentList="this.componentSearchState.searchResults" v-if="!loading"/>
  </SelectionSidebar>
  <router-view @saved="fetchSearch(this.componentSearchState.key)" @deleted="onItemDeleted"></router-view>
</template>

<script>
import {ComponentFetcher} from "@/utils/ComponentFetcher";
import ComponentTable from "@/components/imacs_component/ComponentTable";
import SelectionSidebar from "@/components/util/selection_sidebar/SelectionSidebar";
import {componentSearchState} from "@/components/imacs_component/Component";

export default {
  name: "ComponentsView",
  components: {SelectionSidebar, ComponentTable},
  data() {
    return {
      loading: false,
      componentList: null,
      error: null,
      componentSearchState
    }
  },
  created() {

    if (componentSearchState.fresh) {
      this.fetchSearch("")
      componentSearchState.fresh = false
    }

    if (componentSearchState.lastVisitedId != null) {
      this.$router.push({ name: 'compType', query: { id: componentSearchState.lastVisitedId, viewMode: 'change' }})
    }
  },
  methods: {
    fetchData() {
      this.error = this.post = null
      this.loading = true

      ComponentFetcher.getAllComponents()
          .then(response => {
            response.json().then(data => {
              this.componentList = data
              this.loading = false
            })
          })
          .catch(error => {
            this.error = error
            this.loading = false
          })
    },
    fetchSearch(key) {
      this.componentSearchState.key = key

      this.error = this.post = null
      this.loading = true

      ComponentFetcher.searchForKey(key)
          .then(response => {
            response.json().then(data => {
              this.componentSearchState.searchResults = data
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