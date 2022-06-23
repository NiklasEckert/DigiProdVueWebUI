<template>
  <table>
    <thead>
    <tr>
      <th scope="col" class="text-left px-1 py-4">Name</th>
      <th scope="col" class="text-left px-1 py-4">Start</th>
      <th scope="col" class="text-left px-1 py-4">End</th>
      <th scope="col" class="text-left px-1 py-4">Employee</th>
      <th scope="col" class="text-left px-1 py-4">Workstation</th>
      <th scope="col" class="text-left px-1 py-4">Result</th>
      <th scope="col" class="text-left px-1 py-4">Unit</th>
    </tr>
    </thead>
    <tbody>
    <router-link v-for="event in events" :key="event.id"
                 :to="{ name: 'component', query: { id: event.id , viewMode: 'change' } }" custom
                 v-slot="{ href, navigate }">
      <tr :href="href" @click="navigate"
          class="hover:bg-gray-100 border-b transition duration-300 hover:cursor-pointer">
        <td class="py-2 px 4 px-1" style="font-weight: bold">
            {{ event.name }}
        <br>

      </tr>
    </router-link>
    </tbody>
  </table>
</template>

<script>

export default {
  name: "ComponentEventTable",
  props: ['events']
}
</script>

<style scoped>

</style>