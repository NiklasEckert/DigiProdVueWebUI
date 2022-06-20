<template>
  <input
      v-model="searchKey"
      placeholder="Suche nach Artikel Nr. oder Namen"
      class="min-w-full px-4 py-3 border-2 rounded bg-slate-50 outline-0 focus-visible:border-amber-500"
  >
</template>

<script>
export default {
  name: "ComponentTypeSearchBar",
  data() {
    return {
      searchKey: "",
      timeout: null
    }
  },
  watch: {
    searchKey(newKey) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.$emit('compTypeSearch', newKey)
      }, 500)
    }
  }
}
</script>

<style scoped>

</style>