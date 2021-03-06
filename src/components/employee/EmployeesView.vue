<template>
  <SelectionSidebar
      headline="Employees"
      search-bar-placeholder="First or Last Name"
      :search-text="this.employeeSearchState.key"
      @searchKeyEntered="(key) => fetchSearch(key)"
      @addButtonPressed="() => $router.push({ name: 'employee', query: { viewMode: 'creation' }})"
  >

    <template v-slot:pagination>
      <div class="flex flex-row justify-between">
        <div>
          <div class="border-b px-1.5">
            <select
                class="appearance-none bg-amber-50"
                name="active-choice"
                id="active-choice"
                @change="setActiveChoice($event)"
            >
              <option value="true" :selected="this.employeeSearchState.active === 'true'">Active</option>
              <option value="false" :selected="this.employeeSearchState.active === 'false'">Inactive</option>
              <option value="" :selected="this.employeeSearchState.active === ''">All</option>
            </select>
            <font-awesome-icon icon="fa-solid fa-caret-down" />
          </div>
        </div>

        <pageination-row
            :current-page="this.employeeSearchState.page.number"
            :count-pages="this.employeeSearchState.page.totalPages"
            :is-first="this.employeeSearchState.page.first"
            :is-last="this.employeeSearchState.page.last"
            @firstPage="fetchSearch(this.employeeSearchState.key, 0)"
            @previousPage="fetchSearch(this.employeeSearchState.key, this.employeeSearchState.page.number - 1)"
            @nextPage="fetchSearch(this.employeeSearchState.key, this.employeeSearchState.page.number + 1)"
            @lastPage="fetchSearch(this.employeeSearchState.key, this.employeeSearchState.page.totalPages - 1)"
        />
      </div>
    </template>


    <div v-if="loading" class="text-center">LOADING</div>
    <EmployeeTable :employees="this.employeeSearchState.page.content" v-if="!loading"/>
  </SelectionSidebar>
  <router-view
    @saved="fetchSearch(this.employeeSearchState.key)"
    @deleted="onItemDeleted()"
    />
</template>

<script>
import {EmployeeFetcher} from "@/utils/EmployeeFetcher";
import EmployeeTable from "@/components/employee/EmployeeTable";
import SelectionSidebar from "@/components/util/selection_sidebar/SelectionSidebar";
import {employeeSearchState} from "@/components/employee/employee";
import PageinationRow from "@/components/util/selection_sidebar/PageinationRow";

export default {
  name: "EmployeeView",
  components: {PageinationRow, SelectionSidebar, EmployeeTable},
  data() {
    return {
      loading: false,
      error: null,
      employeeSearchState,
      key: ""
    }
  },
  created() {
    if (employeeSearchState.fresh) {
      this.fetchSearch("")
      employeeSearchState.fresh = false
    }

    if (employeeSearchState.lastVisitedId != null) {
      this.$router.push({ name: 'employees', query: { id: employeeSearchState.lastVisitedId, viewMode: 'change' }})
    }
  },
  methods: {
    fetchSearch(key, page=0) {
      this.employeeSearchState.key = key

      this.error = null
      this.loading = true

      EmployeeFetcher.searchForKey(key, page, 20, employeeSearchState.active)
          .then(response => {
            response.json().then(data => {
              this.employeeSearchState.page = data
              this.loading = false
            })
          })
          .catch(error => {
            this.error = error
            this.loading = false
          })
    },
    onItemDeleted() {
      this.fetchSearch(this.employeeSearchState.key)
    },
    setActiveChoice(event) {
      this.employeeSearchState.active = event.target.value
      this.fetchSearch(this.employeeSearchState.key, this.employeeSearchState.page)
    }
  }
}
</script>

<style scoped>

</style>