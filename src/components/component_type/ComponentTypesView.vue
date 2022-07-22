<template>
  <SelectionSidebar
      headline="Component Types"
      search-bar-placeholder="Name or Article Number"
      :search-text="this.componentTypesSearchState.key"
      @searchKeyEntered="(key) => fetchSearch(key)"
      @addButtonPressed="() => $router.push({ name: 'compType', query: { viewMode: 'creation' }})"
  >
    <template v-slot:pagination>
      <pageination-row
          :current-page="this.componentTypesSearchState.page.number"
          :count-pages="this.componentTypesSearchState.page.totalPages"
          :is-first="this.componentTypesSearchState.page.first"
          :is-last="this.componentTypesSearchState.page.last"
          @firstPage="fetchSearch(this.componentTypesSearchState.key, 0)"
          @previousPage="fetchSearch(this.componentTypesSearchState.key, this.componentTypesSearchState.page.number - 1)"
          @nextPage="fetchSearch(this.componentTypesSearchState.key, this.componentTypesSearchState.page.number + 1)"
          @lastPage="fetchSearch(this.componentTypesSearchState.key, this.componentTypesSearchState.page.totalPages - 1)"
      />
    </template>

    <div v-if="loading" class="text-center">LOADING</div>
    <ComponentTypesTable :types="this.componentTypesSearchState.page.content" v-if="!loading"/>
  </SelectionSidebar>
  <router-view @saved="fetchSearch(this.componentTypesSearchState.key)" @deleted="onItemDeleted"></router-view>
</template>

<script>
import {ComponentTypeFetcher} from "@/utils/ComponentTypeFetcher";
import ComponentTypesTable from "@/components/component_type/ComponentTypesTable";
import SelectionSidebar from "@/components/util/selection_sidebar/SelectionSidebar";
import {componentTypesSearchState} from "@/components/component_type/componentTypes";
import PageinationRow from "@/components/util/selection_sidebar/PageinationRow";

export default {
  name: "ComponentTypesView",
  components: {PageinationRow, SelectionSidebar, ComponentTypesTable},
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
    fetchSearch(key, page=0) {
      this.componentTypesSearchState.key = key

      this.error = this.post = null
      this.loading = true

      ComponentTypeFetcher.searchForKey(key, page, 20)
          .then(response => {
            response.json().then(data => {
              this.componentTypesSearchState.page = data
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