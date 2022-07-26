<template>
  <SelectionSidebar
      headline="Workstations"
      search-bar-placeholder="Name of workstation"
      :search-text="this.workstationsSearchState.key"
      @searchKeyEntered="(key) => fetchSearch(key)"
      @addButtonPressed="() => $router.push({ name: 'workstation', query: { viewMode: 'creation' }})"
  >
    <template v-slot:pagination>
      <pageination-row
          :current-page="this.workstationsSearchState.page.number"
          :count-pages="this.workstationsSearchState.page.totalPages"
          :is-first="this.workstationsSearchState.page.first"
          :is-last="this.workstationsSearchState.page.last"
          @firstPage="fetchSearch(this.workstationsSearchState.key, 0)"
          @previousPage="fetchSearch(this.workstationsSearchState.key, this.workstationsSearchState.page.number - 1)"
          @nextPage="fetchSearch(this.workstationsSearchState.key, this.workstationsSearchState.page.number + 1)"
          @lastPage="fetchSearch(this.workstationsSearchState.key, this.workstationsSearchState.page.totalPages - 1)"
      />
    </template>

    <div v-if="loading" class="text-center">LOADING</div>
    <WorkstationsTable :workstations="this.workstationsSearchState.page.content" v-if="!loading"/>
  </SelectionSidebar>
  <router-view @saved="fetchSearch(this.workstationsSearchState.key)" @deleted="onItemDeleted"></router-view>
</template>

<script>
import SelectionSidebar from "@/components/util/selection_sidebar/SelectionSidebar";
import PageinationRow from "@/components/util/selection_sidebar/PageinationRow";
import {workstationsSearchState} from "@/components/workstation/workstationTypes";
import WorkstationsTable from "@/components/workstation/WorkstationsTable";
import {WorkstationFetcher} from "@/utils/WorkstationFetcher";

export default {
  name: "WorkstationsView",
  components: {PageinationRow, SelectionSidebar, WorkstationsTable},
  data() {
    return {
      loading: false,
      error: null,
      workstationsSearchState
    }
  },
  created() {
    if (workstationsSearchState.fresh) {
      this.fetchSearch("")
      workstationsSearchState.fresh = false
    }

    if (workstationsSearchState.lastVisitedId != null) {
      this.$router.push({ name: 'workstations', query: { id: workstationsSearchState.lastVisitedId, viewMode: 'change' }})
    }
  },
  methods: {
    fetchSearch(key, page=0) {
      this.workstationsSearchState.key = key

      this.error = this.post = null
      this.loading = true

      WorkstationFetcher.searchForKey(key, page, 20)
          .then(response => {
            response.json().then(data => {
              this.workstationsSearchState.page = data
              this.loading = false
            })
          })
          .catch(error => {
            this.error = error
            this.loading = false
          })
    },
    onItemDeleted() {
      this.fetchSearch(this.workstationsSearchState.key)
    }
  }
}
</script>

<style scoped>

</style>