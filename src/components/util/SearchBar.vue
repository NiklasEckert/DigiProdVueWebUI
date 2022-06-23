<template>
  <input
      v-model="searchKey"
      :placeholder="this.placeholder"
      class="flex-auto px-3 py-2 border-2 rounded-md bg-slate-50 outline-0 focus-visible:border-amber-500"
  >
</template>

<script>
export default {
  name: "SearchBar",
  props: ['placeholder'],
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
        this.$emit('searchKeyEntered', newKey)
      }, 500)
    }
  }
}
</script>

<style scoped>

</style>