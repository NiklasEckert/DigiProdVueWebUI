<template>
  <SelectionSidebar
      headline="Component Types"
      search-bar-placeholder="Name or Article Number"
      @searchKeyEntered="(key) => fetchSearch(key)"
      @addButtonPressed="() => $router.push({ name: 'compType', query: { viewMode: 'creation' }})"
  >
    <div v-if="loading" class="text-center">LOADING</div>
    <ComponentTypesTable :types="compTypeList" v-if="!loading"/>
  </SelectionSidebar>
  <router-view @saved="fetchData"></router-view>
</template>

<script>
import {ComponentTypeFetcher} from "@/utils/ComponentTypeFetcher";
import ComponentTypesTable from "@/components/component_type/ComponentTypesTable";
import SelectionSidebar from "@/components/util/selection_sidebar/SelectionSidebar";

export default {
  name: "ComponentTypesView",
  components: {SelectionSidebar, ComponentTypesTable},
  data() {
    return {
      loading: false,
      compTypeList: null,
      error: null
    }
  },
  created() {
    this.$watch(
        () => this.$route.params,
        () => {
          this.fetchData()
        },
        {
          immediate: true
        }
    )
  },
  methods: {
    fetchData() {
      this.error = this.post = null
      this.loading = true

      ComponentTypeFetcher.getAllComponentTypes()
          .then(response => {
            response.json().then(data => {
              this.compTypeList = data
              this.loading = false
            })
          })
          .catch(error => {
            this.error = error
            this.loading = false
          })
    },
    fetchSearch(key) {
      this.error = this.post = null
      this.loading = true

      ComponentTypeFetcher.searchForKey(key)
          .then(response => {
            response.json().then(data => {
              this.compTypeList = data
              this.loading = false
            })
          })
          .catch(error => {
            this.error = error
            this.loading = false
          })
    }
  }
}
</script>

<style scoped>

</style>