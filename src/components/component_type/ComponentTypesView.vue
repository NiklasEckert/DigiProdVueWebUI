<template>
  <div class="flex flex-col h-screen box-border">
    <div class="p-6 bg-slate-200">
      <h2 class="text-3xl font-bold mt-5">Komponenten Typen</h2>
      <ComponentTypeSearchBar class="mt-7" @compTypeSearch="(key) => this.fetchSearch(key)"/>
    </div>

    <div class="overflow-scroll p-6 bg-slate-100 h-full">
      <div v-if="loading" class="text-center">LOADING</div>
      <div v-if="!loading">
        <ComponentTypesTable :types="compTypeList"/>
      </div>
    </div>
  </div>
</template>

<script>
import {ComponentTypeFetcher} from "@/utils/ComponentTypeFetcher";
import ComponentTypesTable from "@/components/component_type/ComponentTypesTable";
import ComponentTypeSearchBar from "@/components/component_type/ComponentTypeSearchBar";

export default {
  name: "ComponentTypesView",
  components: {ComponentTypeSearchBar, ComponentTypesTable},
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