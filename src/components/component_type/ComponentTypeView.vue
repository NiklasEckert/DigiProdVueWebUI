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
            class="text-black block py-2 px-3 rounded-md whitespace-nowrap"
            :class="{ 'bg-amber-200 hover:bg-amber-400 hover:text-white hover:cursor-pointer': this.storable, 'text-gray-400 bg-amber-200/25': !this.storable}"
            :disabled="!this.storable"
            @click="saveComponentType"
        >
          <font-awesome-icon icon="fa-solid fa-floppy-disk" class="mr-1" />
          Save
        </button>

        <button
            class="text-black block py-2 px-3 rounded-md ml-3 text-black whitespace-nowrap"
            :class="{ 'bg-amber-200 hover:bg-amber-400 hover:text-red-600 hover:cursor-pointer': this.$route.query.id, 'text-gray-400 bg-amber-200/25': !this.$route.query.id}"
            @click="deleteComponentType"
            :disabled="!this.$route.query.id"
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
      storable: false,
      changeWatcher: null
    }
  },
  created() {
    this.$watch(
        () => this.$route.query,
        () => {
          if (this.$route.query.id && this.$route.query.viewMode !== 'creation') {
            this.fetchData()
          } else {
            if (this.changeWatcher !== null) {
              this.storable = false
              this.changeWatcher()
            }

            this.compType = { id: "", name: "", articleNumber: "" }
            this.loading = false

            this.changeWatcher = this.$watch(
                () => this.compType,
                () => {
                  this.storable = true
                },
                {
                  deep: true
                }
            )
          }
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
              this.storable = false
              this.$emit('saved')
              router.push({ name: 'compType', query: { id: data.id , viewMode: 'change' } })
            })
          })
          .catch(error => {
            this.error = error
          })
    },
    fetchData() {
      this.error = null
      this.loading = true

      ComponentTypeFetcher.getComponentType(this.$route.query.id)
          .then(response => {
            response.json().then(data => {

              if (this.changeWatcher !== null) {
                this.storable = false
                this.changeWatcher()
              }

              this.compType = data
              this.loading = false

              this.changeWatcher = this.$watch(
                  () => this.compType,
                  () => {
                    this.storable = true
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
      this.error = null
      this.loading = true

      ComponentTypeFetcher.deleteComponentType(this.compType.id)
          .then(response => {
            if (response.status === 200) {
              alert("Successfully deleted")
              router.push({ name: 'noCompTypeSelected'})
            } else {
              this.error = response.status
            }
            this.loading = false
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