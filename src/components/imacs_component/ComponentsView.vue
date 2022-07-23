<template>
  <SelectionSidebar
      headline="Components"
      search-bar-placeholder="Name, article or order number"
      :search-text="this.componentSearchState.key"
      @searchKeyEntered="(key) => fetchSearch(key)"
      @addButtonPressed="() => $router.push({ name: 'component', query: { viewMode: 'creation' }})"
  >
    <template v-slot:pagination>
      <pageination-row
          :current-page="this.componentSearchState.page.number"
          :count-pages="this.componentSearchState.page.totalPages"
          :is-first="this.componentSearchState.page.first"
          :is-last="this.componentSearchState.page.last"
          @firstPage="fetchSearch(this.componentSearchState.key, 0)"
          @previousPage="fetchSearch(this.componentSearchState.key, this.componentSearchState.page.number - 1)"
          @nextPage="fetchSearch(this.componentSearchState.key, this.componentSearchState.page.number + 1)"
          @lastPage="fetchSearch(this.componentSearchState.key, this.componentSearchState.page.totalPages - 1)"
      />
    </template>

    <div v-if="loading" class="text-center">LOADING</div>
    <ComponentTable :componentList="this.componentSearchState.page.content" v-if="!loading"/>
  </SelectionSidebar>
  <router-view @saved="fetchSearch(this.componentSearchState.key)" @deleted="onItemDeleted"></router-view>
</template>

<script>
import {ComponentFetcher} from "@/utils/ComponentFetcher";
import ComponentTable from "@/components/imacs_component/ComponentTable";
import SelectionSidebar from "@/components/util/selection_sidebar/SelectionSidebar";
import {componentSearchState} from "@/components/imacs_component/Component";
import PageinationRow from "@/components/util/selection_sidebar/PageinationRow";

export default {
  name: "ComponentsView",
  components: {PageinationRow, SelectionSidebar, ComponentTable},
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
      this.$router.push({ name: 'component', query: { id: componentSearchState.lastVisitedId, viewMode: 'change' }})
    }
  },
  methods: {
    fetchSearch(key, page=0) {
      this.componentSearchState.key = key

      this.error = this.post = null
      this.loading = true

      ComponentFetcher.searchForKey(key, page, 20)
          .then(response => {
            response.json().then(data => {
              this.componentSearchState.page = data
              this.loading = false
            })
          })
          .catch(error => {
            this.error = error
            this.loading = false
          })
    },
    onItemDeleted() {
      this.fetchSearch(this.componentSearchState.key)
    }
  }
}
</script>

<style scoped>

</style>