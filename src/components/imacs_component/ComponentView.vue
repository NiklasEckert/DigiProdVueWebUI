<template>
  <div class="h-full p-6">
    <input
        v-model="this.component.name"
        placeholder="Type Name"
        class="text-3xl font-bold outline-0 w-full mt-5"
    >
    <div>
      {{ this.component.componentType.name }}
    </div>
    <div class="mt-6 pr-4">
      <label for="inputField" class="block text-xs text-black/50">Article Number</label>
      <input
          v-model="this.component.articleNumber"
          placeholder="Article Number"
          class="text-xl outline-0 border-b w-full"
      >
    </div>

    <div class="mt-4 pr-4">
      <label for="inputField" class="block text-xs text-black/50">Order number</label>
      <input
          v-model="this.component.orderNumber"
          placeholder="Order number"
          class="text-xl outline-0 border-b w-full"
      >
    </div>

    <div class="mt-4 pr-4">
      <label class="block text-xs text-black/50">Birthdate</label>
      <label class="text-xl outline-0 border-b w-full">{{ this.component.formattedDate }}</label>
    </div>

    <div class="mt-4 pr-4">
      <label for="inputField" class="block text-xs text-black/50">Filepath</label>
      <input
          v-model="this.component.filePath"
          placeholder="Filepath"
          class="text-xl outline-0 border-b w-full"
      >
    </div>
    <div class="mt-4 pr-4">
      <label for="inputField" class="block text-xs text-black/50">Location</label>
      <input
          v-model="this.component.location"
          placeholder="Location"
          class="text-xl outline-0 border-b w-full"
      >
    </div>


    <div class="mt-12 flex flex-row">
      <button
          class="text-black block py-2 px-3 rounded-md whitespace-nowrap"
          :class="{ 'bg-amber-200 hover:bg-amber-400 hover:text-white hover:cursor-pointer': this.storable, 'text-gray-400 bg-amber-200/25': !this.storable}"
          :disabled="!this.storable"
          @click="saveComponentType"
      >
        <font-awesome-icon icon="fa-solid fa-floppy-disk" class="mr-1"/>
        Save
      </button>

      <button
          class="text-black block py-2 px-3 rounded-md ml-3 text-black whitespace-nowrap"
          :class="{ 'bg-amber-200 hover:bg-amber-400 hover:text-red-600 hover:cursor-pointer': this.$route.query.id, 'text-gray-400 bg-amber-200/25': !this.$route.query.id}"
          @click="deleteComponentType"
          v-show="this.$route.query.id"
      >
        <font-awesome-icon icon="fa-solid fa-trash" class="mr-1"/>
        Delete from database
      </button>
    </div>

    <div class="mt-4 flex flex-row">
      <button
          class="text-black block py-2 px-3 rounded-md whitespace-nowrap"
          :class="{ 'bg-amber-200 hover:bg-amber-400 hover:text-white hover:cursor-pointer': this.$route.query.id, 'text-gray-400 bg-amber-200/25': !this.$route.query.id}"
      >
        <font-awesome-icon icon="fa-solid fa-puzzle-piece" class="mr-1"/>
        Add subcomponent
      </button>

      <button
          class="text-black block py-2 px-3 rounded-md ml-3 text-black whitespace-nowrap"
          :class="{ 'bg-amber-200 hover:bg-amber-400 hover:text-white hover:cursor-pointer': this.$route.query.id, 'text-gray-400 bg-amber-200/25': !this.$route.query.id}"
          v-show="this.$route.query.id"
      >
        <font-awesome-icon icon="fa-solid fa-scissors" class="mr-1"/>
        Disconnect component
      </button>

      <button
          class="text-black block py-2 px-3 rounded-md ml-3 text-black whitespace-nowrap"
          :class="{ 'bg-amber-200 hover:bg-amber-400 hover:text-red-600 hover:cursor-pointer': this.$route.query.id, 'text-gray-400 bg-amber-200/25': !this.$route.query.id}"
          v-show="this.$route.query.id"
      >
        <font-awesome-icon icon="fa-solid fa-skull" class="mr-1" />
        Mark component as killed
      </button>
    </div>
  </div>
</template>

<script>
import {ComponentFetcher} from "@/utils/ComponentFetcher";
import moment from "moment";

export default {
  name: "ComponentView",
  data() {
    return {
      loading: false,
      component: {
        id: "",
        name: "",
        articleNumber: "",
        orderNumber: "",
        birthDate: 0,
        location: "",
        filePath: "",
        status: {},
        componentType: {},
        formattedDate: "Unknown"
      },
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

            this.component = {
              id: "",
              name: "",
              articleNumber: "",
              orderNumber: "",
              birthDate: 0,
              location: "",
              filePath: "",
              status: {},
              componentType: {},
              formattedDate: "Unknown"
            }
            this.loading = false

            this.changeWatcher = this.$watch(
                () => this.component,
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
    // TODO: MAchen

    // saveComponentType() {
    //   ComponentFetcher.s(this.compType)
    //       .then(response => {
    //         response.json().then(data => {
    //           this.compType = data
    //           this.storable = false
    //           this.$emit('saved')
    //           router.push({ name: 'compType', query: { id: data.id , viewMode: 'change' } })
    //         })
    //       })
    //       .catch(error => {
    //         this.error = error
    //       })
    // },
    fetchData() {
      this.error = null
      this.loading = true

      ComponentFetcher.getComponent(this.$route.query.id)
          .then(response => {
            response.json().then(data => {

              if (this.changeWatcher !== null) {
                this.storable = false
                this.changeWatcher()
              }

              this.component = data
              this.component.formattedDate = moment(data.birthdate).format("YYYY MM DD")
              this.loading = false

              this.changeWatcher = this.$watch(
                  () => this.component,
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
    }
    // ,
    // deleteComponentType() {
    //   this.error = null
    //   this.loading = true
    //
    //   ComponentTypeFetcher.deleteComponentType(this.compType.id)
    //       .then(response => {
    //         if (response.status === 200) {
    //           alert("Successfully deleted")
    //           router.push({ name: 'noCompTypeSelected'})
    //         } else {
    //           this.error = response.status
    //         }
    //         this.loading = false
    //       })
    //       .catch(error => {
    //         this.error = error
    //         this.loading = false
    //         alert(this.error)
    //       })
    // }
  }
}
</script>

<style scoped>

</style>