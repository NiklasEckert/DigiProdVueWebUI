<template>
  <table class="table-fixed w-full">
    <thead>
    <tr>
      <th
          scope="col"
          class="text-left p-3"
          v-for="headline in headlines"
          :key="headline"
      >
        {{ headline }}
      </th>
    </tr>
    </thead>
    <tbody>
      <slot></slot>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "SearchListTable",
  props: ['headlines']
}
</script>

<style scoped>

</style>