<template>
  <SearchListTable :headlines='["First Name", "Last Name"]'>
    <router-link
        v-for="employee in employees"
        :key="employee.id"
        :to="{ name: 'employee', query: { id: employee.id , viewMode: 'change' } }"
        custom
        v-slot="{ href, navigate }"
    >
      <SearchListTableRow
          :href="href"
          :navigate="navigate"
          :is-active="this.$route.query.id === employee.id + ''"
      >
        <SearchListTableItem>{{ employee.firstName }}</SearchListTableItem>
        <SearchListTableItem>{{ employee.lastName }}</SearchListTableItem>
      </SearchListTableRow>
    </router-link>
  </SearchListTable>
</template>

<script>

import SearchListTable from "@/components/util/selection_sidebar/search_list_table/SearchListTable";
import SearchListTableItem from "@/components/util/selection_sidebar/search_list_table/SearchListTableItem";
import SearchListTableRow from "@/components/util/selection_sidebar/search_list_table/SearchListTableRow";

export default {
  name: "EmployeeTable",
  components: {SearchListTableRow, SearchListTableItem, SearchListTable},
  props: ['employees']
}
</script>

<style scoped>

</style>