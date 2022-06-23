<template>
  <div class="flex flex-row box-border">
    <input
        v-model="searchKey"
        placeholder="Suche nach Artikel Nr. oder Namen"
        class="flex-auto px-3 py-2 border-2 rounded-md bg-slate-50 outline-0 focus-visible:border-amber-500"
    >
    <button
        class="bg-amber-200 hover:bg-amber-400 text-black hover:text-white block py-2 px-3 hover:cursor-pointer rounded-md ml-4 whitespace-nowrap"
        @click="addClicked"
    >
      <font-awesome-icon :icon="['fas', 'plus']" />
      Add
    </button>
  </div>

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
  },
  methods: {
    addClicked() {
      this.$emit('addNewComponentType')
    }
  }
}
</script>

<style scoped>

</style>