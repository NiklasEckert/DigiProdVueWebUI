<template>
  <table class="table-fixed w-full">
    <tbody>
    <router-link v-for="comp in componentList" :key="comp.id"
                 :to="{ name: 'component', query: { id: comp.id , viewMode: 'change' } }" custom
                 v-slot="{ href, navigate }">
      <tr :href="href" @click="navigate"
          class="hover:bg-gray-100 border-b transition duration-300 hover:cursor-pointer">
        <td class="py-2">
          <div class="px 4 px-1" style="font-weight: bold">
            {{ comp.name }}
          </div>
          <br>

        </td>
        <td class="py-2 px-5">
          <div>
            {{ comp.articleNumber }}<br>
            {{ comp.orderNumber }}
          </div>
        </td>
      </tr>
    </router-link>
    </tbody>
  </table>
</template>

<script>

export default {
  name: "ComponentsTable",
  props: ['componentList']
}
</script>

<style scoped>

</style>