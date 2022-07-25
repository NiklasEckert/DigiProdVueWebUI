<template>
  <SearchListTable :headlines='["Name", "Type"]'>
    <router-link
        v-for="workstation in workstations"
        :key="workstation.id"
        :to="{ name: 'workstation', query: { id: workstation.id , viewMode: 'change' } }"
        custom
        v-slot="{ href, navigate }"
    >
      <SearchListTableRow
          :href="href"
          :navigate="navigate"
          :is-active="this.$route.query.id === workstation.id + ''"
      >
        <SearchListTableItem>{{ workstation.name }}</SearchListTableItem>
        <SearchListTableItem>{{ workstation.type }}</SearchListTableItem>
      </SearchListTableRow>
    </router-link>
  </SearchListTable>
</template>

<script>

import SearchListTable from "@/components/util/selection_sidebar/search_list_table/SearchListTable";
import SearchListTableItem from "@/components/util/selection_sidebar/search_list_table/SearchListTableItem";
import SearchListTableRow from "@/components/util/selection_sidebar/search_list_table/SearchListTableRow";

export default {
  name: "WorkstationsTable",
  components: {SearchListTableRow, SearchListTableItem, SearchListTable},
  props: ['workstations']
}
</script>

<style scoped>

</style>