<template>
  <div class="flex-none h-screen w-64 bg-amber-200 text-black py-12 px-6">
    <h1 class="text-2xl font-bold mb-7">IMACS DigiProd</h1>
    <ul>
      <li v-for="item in navItems" :key="item.name">
        <router-link
            :to="item.path"
            active-class="bg-amber-400 hover:bg-amber-400 font-bold drop-shadow-lg text-white"
            class="block py-2 px-3 mb-1 hover:bg-amber-400/50 hover:cursor-pointer rounded-md">
          <span class="inline-block w-7">
            <font-awesome-icon :icon="item.icon" />
          </span>
          {{ item.navCaption }}
        </router-link>
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
        navCaption: route.navCaption,
        name: route.name,
        path: route.path,
        icon: route.icon
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