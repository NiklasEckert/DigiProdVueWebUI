<template>
  <div class="flex flex-row">
    <sidebar-nav />
    <div class="flex flex-row box-border w-full">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import SidebarNav from "@/components/navigation/SidebarNav";
export default {
  name: 'App',
  components: {
    SidebarNav
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
