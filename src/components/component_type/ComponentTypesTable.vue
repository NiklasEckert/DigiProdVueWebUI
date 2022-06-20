<template>
  <table class="min-w-full">
    <thead>
      <tr class="border-b bg-slate-200 rounded-t">
        <th scope="col" class="text-left px-6 py-4">ArtikelNr.</th>
        <th scope="col" class="text-left px-6 py-4">Name</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="type in types" :key="type.articleNumber" class="bg-white hover:bg-gray-100 border-b transition duration-300">
        <td class="px-6 py-4">{{ type.articleNumber }}</td>
        <td class="px-6 py-4">{{ type.name }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "ComponentTypesTable",
  props: ['types']
}
</script>

<style scoped>

</style>