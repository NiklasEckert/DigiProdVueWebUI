<template>
  <table class="min-w-full">
    <thead>
      <tr class="border-b rounded-t">
        <th scope="col" class="text-left px-6 py-4">ArtikelNr.</th>
        <th scope="col" class="text-left px-6 py-4">Name</th>
      </tr>
    </thead>
    <tbody>
    <router-link v-for="type in types" :key="type.id" :to="'/component-types/' + type.id" custom v-slot="{ href, navigate }">
      <tr :href="href" @click="navigate" class="hover:bg-gray-100 border-b transition duration-300 hover:cursor-pointer">
        <td class="px-6 py-4">{{ type.articleNumber }}</td>
        <td class="px-6 py-4">{{ type.name }}</td>
      </tr>
    </router-link>
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