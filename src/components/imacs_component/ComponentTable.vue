<template>
  <SearchListTable :headlines='["Type / QR", "Art. / Order"]'>
    <router-link
        v-for="comp in componentList"
        :key="comp.id"
        :to="{ name: 'component', query: { id: comp.id , viewMode: 'change' } }"
        custom
        v-slot="{ href, navigate }"
    >
      <SearchListTableRow
          :href="href"
          :navigate="navigate"
          :is-active="this.$route.query.id === comp.id + ''"
      >
        <SearchListTableItem>{{ comp.componentType.name }}<br>{{ comp.qrCode }}</SearchListTableItem>
        <SearchListTableItem>{{ comp.componentType.articleNumber }}<br>{{ comp.orderNumber }}</SearchListTableItem>
      </SearchListTableRow>
    </router-link>
  </SearchListTable>
</template>

<script>

import SearchListTableRow from "@/components/util/selection_sidebar/search_list_table/SearchListTableRow";
import SearchListTableItem from "@/components/util/selection_sidebar/search_list_table/SearchListTableItem";
import SearchListTable from "@/components/util/selection_sidebar/search_list_table/SearchListTable";

export default {
  name: "ComponentsTable",
  components: {SearchListTableRow, SearchListTableItem, SearchListTable},
  props: ['componentList']
}
</script>

<style scoped>

</style>