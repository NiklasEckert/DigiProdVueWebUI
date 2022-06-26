<template>
  <div class="h-full p-6">
    <input
        v-model="this.component.name"
        placeholder="Type Name"
        class="text-3xl font-bold outline-0 w-full mt-5"
    >
    <div>
      <select class="form-control" @change="changeComponentType($event)">
        <option selected disabled>{{ this.component.componentType.name ?? "Choose type of component" }}</option>
        <option v-for="componentType in compTypeList" :value="componentType.name" :key="componentType.id">
          {{ componentType.name }}
        </option>
      </select>
    </div>

    <div class="mt-6 pr-4">
      <label for="if1" class="block text-xs text-black/50">Article Number</label>
      <input id="if1"
             v-model="this.component.articleNumber"
             placeholder="Article Number"
             class="text-xl outline-0 border-b w-full"
      >
    </div>

    <div class="mt-4 pr-4">
      <label for="if2" class="block text-xs text-black/50">Order number</label>
      <input
          id="if2"
          v-model="this.component.orderNumber"
          placeholder="Order number"
          class="text-xl outline-0 border-b w-full"
      >
    </div>

    <div class="mt-4 pr-4">
      <label class="block text-xs text-black/50">Birthdate</label>
      <label class="text-xl ">{{ this.formattedDate }}</label>
    </div>

    <div class="mt-4 pr-4">
      <label for="if3" class="block text-xs text-black/50">Filepath</label>
      <input
          id="if3"
          v-model="this.component.filePath"
          placeholder="Filepath"
          class="text-xl outline-0 border-b w-full"
      >
    </div>
    <div class="mt-4 pr-4">
      <label for="if4" class="block text-xs text-black/50">Location</label>
      <input
          id="if4"
          v-model="this.component.location"
          placeholder="Location"
          class="text-xl outline-0 border-b w-full"
      >
    </div>

    <div class="mt-4 pr-4">
      <label class="block text-xs text-black/50">Status</label>
      <label class="text-xl ">{{ this.component.status.statusName }}</label>
    </div>


    <div class="mt-12 flex flex-row">
      <button
          class="text-black block py-2 px-3 rounded-md whitespace-nowrap drop-shadow-lg"
          :class="{ 'bg-amber-200 hover:bg-amber-400 hover:text-white hover:cursor-pointer': this.storable, 'text-gray-400 bg-amber-200/25': !this.storable}"
          :disabled="!this.storable"
          @click="saveComponent"
      >
        <font-awesome-icon icon="fa-solid fa-floppy-disk" class="mr-1"/>
        Save
      </button>

      <button
          class="text-black block py-2 px-3 rounded-md ml-3 text-black whitespace-nowrap drop-shadow-lg"
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
          class="text-black block py-2 px-3 rounded-md whitespace-nowrap drop-shadow-lg"
          :class="{ 'bg-amber-200 hover:bg-amber-400 hover:text-white hover:cursor-pointer': this.$route.query.id, 'text-gray-400 bg-amber-200/25': !this.$route.query.id}"
      >
        <font-awesome-icon icon="fa-solid fa-puzzle-piece" class="mr-1"/>
        Add subcomponent
      </button>

      <button
          class="text-black block py-2 px-3 rounded-md ml-3 text-black whitespace-nowrap drop-shadow-lg"
          :class="{ 'bg-amber-200 hover:bg-amber-400 hover:text-white hover:cursor-pointer': this.$route.query.id, 'text-gray-400 bg-amber-200/25': !this.$route.query.id}"
          v-show="this.$route.query.id"
      >
        <font-awesome-icon icon="fa-solid fa-scissors" class="mr-1"/>
        Disconnect component
      </button>

      <button
          class="text-black block py-2 px-3 rounded-md ml-3 text-black whitespace-nowrap drop-shadow-lg"
          :class="{ 'bg-amber-200 hover:bg-amber-400 hover:text-red-600 hover:cursor-pointer': this.$route.query.id, 'text-gray-400 bg-amber-200/25': !this.$route.query.id}"
          v-show="this.$route.query.id"
      >
        <font-awesome-icon icon="fa-solid fa-skull" class="mr-1"/>
        Mark component as killed
      </button>
    </div>
    <ComponentEventTable :component-id="component.id"/>
  </div>
</template>

<script>
import {ComponentFetcher} from "@/utils/ComponentFetcher";
import moment from "moment";
import router from "@/router";
import ComponentEventTable from "@/components/imacs_component/ComponentEventTable";
import {ComponentTypeFetcher} from "@/utils/ComponentTypeFetcher";
import {componentSearchState} from "@/components/imacs_component/Component";

export default {
  name: "ComponentView",
  components: {ComponentEventTable},
  data() {
    return {
      compTypeList: [],
      loading: false,
      formattedDate: moment().format("YYYY MMM DD HH:mm"),
      component: {
        id: "",
        name: "",
        articleNumber: "",
        orderNumber: "",
        birthDate: 0,
        location: "",
        filePath: "",
        status: {
          statusName: "Created"
        },
        componentType: {}
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
            this.fetchComponentTypes()
          } else {
            this.fetchComponentTypes()
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
              status: {
                statusName: "Created"
              },
              componentType: {},
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
    changeComponentType(event) {
      this.component.componentType = this.compTypeList.find(comp => {
        return comp.name === event.target.value
      })
    },
    saveComponent() {
      ComponentFetcher.saveComponent(this.component)
          .then(response => {
            response.json().then(data => {
              this.component = data
              this.storable = false
              this.$emit('saved')
              router.push({name: 'components', query: {id: data.id, viewMode: 'change'}})
              componentSearchState.lastVisitedId = data.id
            })
          })
          .catch(error => {
            this.error = error
          })
    },
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
              this.formattedDate = moment(data.birthdate).format("YYYY MMM DD HH:mm")
              this.loading = false
              componentSearchState.lastVisitedId = data.id

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
    },
    fetchComponentTypes() {
      this.error = this.post = null
      this.loading = true

      ComponentTypeFetcher.getAllComponentTypes()
          .then(response => {
            response.json().then(data => {
              this.compTypeList = data
              this.loading = false
            })
          })
          .catch(error => {
            this.error = error
            this.loading = false
          })
    }
  }
}
</script>

<style scoped>

</style>