<template>
  <SelectionSidebar
      headline="Components"
      search-bar-placeholder="Name, article or order number"
      @searchKeyEntered="(key) => fetchSearch(key)"
      @addButtonPressed="() => $router.push({ name: 'component', query: { viewMode: 'creation' }})"
  >
    <div v-if="loading" class="text-center">LOADING</div>
    <ComponentTable :componentList="componentList" v-if="!loading"/>
  </SelectionSidebar>
  <router-view @saved="fetchData"></router-view>
</template>

<script>
import {ComponentFetcher} from "@/utils/ComponentFetcher";
import ComponentTable from "@/components/imacs_component/ComponentTable";
import SelectionSidebar from "@/components/util/selection_sidebar/SelectionSidebar";

export default {
  name: "ComponentsView",
  components: {SelectionSidebar, ComponentTable},
  data() {
    return {
      loading: false,
      componentList: null,
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
      this.error = this.post = null
      this.loading = true

      ComponentFetcher.searchForKey(key)
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
    }
  }
}
</script>

<style scoped>

</style>