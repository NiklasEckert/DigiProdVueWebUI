<template>
  <SearchListTable :headlines='["Article Number", "Order Number"]'>
    <router-link
        v-for="type in types"
        :key="type.id"
        :to="{ name: 'compType', query: { id: type.id , viewMode: 'change' } }"
        custom
        v-slot="{ href, navigate }"
    >
      <SearchListTableRow
          :href="href"
          :navigate="navigate"
          :is-active="this.$route.query.id === type.id + ''"
      >
        <SearchListTableItem>{{ type.articleNumber }}</SearchListTableItem>
        <SearchListTableItem>{{ type.name }}</SearchListTableItem>
      </SearchListTableRow>
    </router-link>
  </SearchListTable>
</template>

<script>

import SearchListTable from "@/components/util/selection_sidebar/search_list_table/SearchListTable";
import SearchListTableItem from "@/components/util/selection_sidebar/search_list_table/SearchListTableItem";
import SearchListTableRow from "@/components/util/selection_sidebar/search_list_table/SearchListTableRow";
export default {
  name: "ComponentTypesTable",
  components: {SearchListTableRow, SearchListTableItem, SearchListTable},
  props: ['types']
}
</script>

<style scoped>

</style>