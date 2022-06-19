<template>
  <div class="h-screen w-64 bg-indigo-900 text-white py-12 px-6">
    <h1 class="text-2xl font-bold mb-7">IMACS DigiProd</h1>
    <ul>
      <li v-for="item in navItems" :key="item.name">
        <router-link :to="item.path" active-class="bg-indigo-600 hover:bg-indigo-600 font-bold drop-shadow-lg" class="block py-2 px-3 mb-1 hover:bg-indigo-600/50 hover:cursor-pointer rounded-md">{{ item.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SidebarNav",
  created() {
    this.$router.options.routes.filter(route => route.position === "sidebar").forEach(route => {
      console.log(route)
      this.navItems.push({
        name: route.name,
        path: route.path
      })
    })
  },
  data() {
    return {
      navItems: []
    }
  }
}
</script>

<style scoped>

</style>