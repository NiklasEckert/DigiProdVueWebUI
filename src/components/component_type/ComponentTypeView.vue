<template>
  <div class="w-1/3 h-full p-6">
    <label class="block text-xs text-black/50 mt-5">Component Type Name</label>
    <input
        v-model="this.compType.name"
        placeholder="Type Name"
        class="text-3xl font-bold outline-0 w-full"
    >
    <div class="mt-12 pr-4">
      <label for="inputField" class="block text-xs text-black/50">Article Number</label>
      <input
          v-model="this.compType.articleNumber"
          placeholder="Article Number"
          class="text-xl outline-0 border-b w-full"
      >

      <div class="mt-12 flex flex-row">
        <button
            class="text-black block py-2 px-3 rounded-md"
            :class="{ 'bg-amber-200 hover:bg-amber-400 hover:text-white hover:cursor-pointer': this.edited, 'text-gray-400 bg-amber-200/25': !this.edited}"
            :disabled="!this.edited"
            @click="saveComponentType"
        >
          <font-awesome-icon icon="fa-solid fa-floppy-disk" class="mr-1" />
          Save
        </button>

        <button
            class="text-black block py-2 px-3 rounded-md ml-3 text-black bg-amber-200 hover:bg-amber-400 hover:text-red-600 hover:cursor-pointer"
            @click="deleteComponentType"
        >
          <font-awesome-icon icon="fa-solid fa-trash" class="mr-1" />
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {ComponentTypeFetcher} from "@/utils/ComponentTypeFetcher";
import router from "@/router";

export default {
  name: "ComponentTypeView",
  data() {
    return {
      loading: false,
      compType: { id: "", name: "", articleNumber: "" },
      error: null,
      edited: false,
      changeWatcher: null
    }
  },
  created() {
    this.$watch(
        () => this.$route.params,
        () => {
          this.fetchData()
        },
        {
          immediate: true
        }
    )
  },
  methods: {
    saveComponentType() {
      ComponentTypeFetcher.saveComponentType(this.compType)
          .then(response => {
            response.json().then(data => {
              this.compType = data
              this.edited = false
              this.$emit('saved')
            })
          })
          .catch(error => {
            this.error = error
          })
    },
    fetchData() {
      this.error = this.post = null
      this.loading = true

      ComponentTypeFetcher.getComponentType(this.$route.params.art)
          .then(response => {
            response.json().then(data => {

              if (this.changeWatcher !== null) {
                console.log("unwatch")
                this.edited = false
                this.changeWatcher()
              }

              this.compType = data
              this.loading = false

              console.log("watch")
              this.changeWatcher = this.$watch(
                  () => this.compType,
                  () => {
                    this.edited = true
                  },
                  {
                    deep: true
                  }
              )
            })
          })
          .catch(error => {
            this.error = error
            this.loading = false
          })
    },
    deleteComponentType() {
      this.error = this.post = null
      this.loading = true

      ComponentTypeFetcher.deleteComponentType(this.compType.id)
          .then(response => {
            console.log("OK")
            if (response.status === 200) {
              router.push('/component-types')
            }
          })
          .catch(error => {
            this.error = error
            this.loading = false
            alert(this.error)
          })
    }
  }
}
</script>

<style scoped>

</style>