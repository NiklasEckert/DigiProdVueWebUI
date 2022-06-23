<template>
  <div
      class="flex flex-col h-screen box-border w-96 bg-amber-50"
      :class="{
        'Dw-2/3': this.$route.matched.some(route => route.path.length > 'component-types/'.length),
        'Dflex-auto': this.$route.matched.some(route => !(route.path.length > 'component-types/'.length))
      }"
  >
    <div class="p-6">
      <h2 class="text-3xl font-bold mt-5">Komponenten Typen</h2>
      <ComponentTypeSearchBar
          class="mt-7"
          @compTypeSearch="(key) => this.fetchSearch(key)"
          @addNewComponentType="() => $router.push({ name: 'compType', query: { viewMode: 'creation' }})"
      />
    </div>

    <div class="overflow-scroll p-6 pt-0 h-full">
      <div v-if="loading" class="text-center">LOADING</div>
      <div v-if="!loading">
        <ComponentTypesTable :types="compTypeList"/>
      </div>
    </div>
  </div>
  <router-view @saved="fetchData"></router-view>
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