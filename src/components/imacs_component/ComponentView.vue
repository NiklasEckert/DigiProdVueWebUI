<template>
  <DetailScreenContainer>
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

      <div class="mt-4 pr-4">
        <label for="if2" class="block text-xs text-black/50">QR-Code</label>
        <input
            id="if2"
            v-model="this.component.qrCode"
            placeholder="QR-Code"
            class="text-xl outline-0 border-b w-full"
        >
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
          Save (WIP)
        </button>

        <button
            class="text-black block py-2 px-3 rounded-md ml-3 text-black whitespace-nowrap drop-shadow-lg"
            :class="{ 'bg-amber-200 hover:bg-amber-400 hover:text-red-600 hover:cursor-pointer': this.$route.query.id, 'text-gray-400 bg-amber-200/25': !this.$route.query.id}"
            v-show="this.$route.query.id"
            @click="isDeleteDialogVisible = true"
        >
          <font-awesome-icon icon="fa-solid fa-trash" class="mr-1"/>
          Delete from database
        </button>

      </div>

      <div class="mt-4 flex flex-row">
        <button
            class="text-black block py-2 px-3 rounded-md whitespace-nowrap drop-shadow-lg "
            :class="{ 'text-gray-400 bg-amber-200/25': true}"
            :disabled="true"
            v-show="this.$route.query.id"
        >
          <font-awesome-icon icon="fa-solid fa-puzzle-piece" class="mr-1"/>
          Add subcomponent (WIP)
        </button>

        <button
            class="text-black block py-2 px-3 rounded-md ml-3 text-black whitespace-nowrap drop-shadow-lg"
            :class="{ 'bg-amber-200 hover:bg-amber-400 hover:text-white hover:cursor-pointer': (this.$route.query.id && this.component.parentId), 'text-gray-400 bg-amber-200/25': this.$route.query.id, 'text-gray-400 bg-amber-200/25': !this.component.parentId }"
            @click="disconnectFromParent"
            :disabled="!this.component.parentId"
            v-show="this.$route.query.id"
        >
          <font-awesome-icon icon="fa-solid fa-scissors" class="mr-1"/>
          Disconnect from parent
        </button>

        <button
            class="text-black block py-2 px-3 rounded-md ml-3 text-black whitespace-nowrap drop-shadow-lg"
            :class="{ 'bg-amber-200 hover:bg-amber-400 hover:text-red-600 hover:cursor-pointer': this.$route.query.id && this.component.status.statusName !== 'Killed',
             'text-gray-400 bg-amber-200/25': !this.$route.query.id,
              'text-gray-400 bg-amber-200/25': this.component.status.statusName === 'Killed'}"
            :disabled="this.component.status.statusName === 'Killed'"
            @click="isKillDialogVisible=true"
            v-show="this.$route.query.id"
        >
          <font-awesome-icon icon="fa-solid fa-skull" class="mr-1"/>
          Mark component as killed
        </button>
      </div>
      <ComponentEventTable :component-id="component.id"/>
    </div>
  </DetailScreenContainer>

  <ModalDialog
      v-show="isDeleteDialogVisible"
      title="Delete Component?"
      hint="Do you want to delete this component from the database?!"
      @cancel="isDeleteDialogVisible = false"
  >
    <template v-slot:buttonRow>
      <button @click="deleteComponent"
              class="bg-red-600 hover:bg-red-700 text-white hover:shadow-md font-bold py-2 px-3 rounded-md ml-2">
        <font-awesome-icon icon="fa-solid fa-trash" class="mr-1"/>
        Delete
      </button>
    </template>
  </ModalDialog>

  <ModalDialog
      v-show="isKillDialogVisible"
      title="Mark component as killed"
      hint="Do you want to mark this component as killed?"
      @cancel="isKillDialogVisible = false"
  >
    <template v-slot:buttonRow>
      <button @click="markAsKilled"
              class="bg-red-600 hover:bg-red-700 text-white hover:shadow-md font-bold py-2 px-3 rounded-md ml-2">
        <font-awesome-icon icon="fa-solid fa-trash" class="mr-1"/>
        Kill
      </button>
    </template>
  </ModalDialog>

  <ErrorDialog v-show="isErrorDialogVisible" :error_code="this.error" @cancel="this.isErrorDialogVisible = false"/>
</template>

<script>
import {ComponentFetcher} from "@/utils/ComponentFetcher";
import moment from "moment";
import ComponentEventTable from "@/components/imacs_component/ComponentEventTable";
import {ComponentTypeFetcher} from "@/utils/ComponentTypeFetcher";
import {componentSearchState} from "@/components/imacs_component/Component";
import DetailScreenContainer from "@/components/util/detail_screen_container/DetailScreenContainer";
import ModalDialog from "@/components/util/dialogs/ModalDialog";
import router from "@/router";

export default {
  name: "ComponentView",
  components: {DetailScreenContainer, ComponentEventTable, ModalDialog},
  data() {
    return {
      compTypeList: [],
      loading: false,
      formattedDate: moment().format("YYYY MMM DD HH:mm"),
      component: {
        id: "",
        name: "",
        qrCode:"",
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
      isDeleteDialogVisible: false,
      isErrorDialogVisible: false,
      isKillDialogVisible: false,
      changeWatcher: null
    }
  },
  created() {
    this.fetchComponentTypes()
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
              qrCode: "",
              articleNumber: "",
              orderNumber: "",
              birthDate: Date.now(),
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
    deleteComponent() {
      this.isDeleteDialogVisible = false
      ComponentFetcher.deleteComponent(this.component.id)
          .then(() => {
            this.storable = false
            componentSearchState.lastVisitedId = null
            router.push({name: 'noComponentSelected'})
            this.$emit('deleted')
          })
          .catch(error => {
            this.error = error
            this.loading = false
            this.isErrorDialogVisible = true
          })
    },
    disconnectFromParent() {
      ComponentFetcher.disconnectFromParent(this.component.id)
          .then(response => {
            response.json().then(data => {
              this.component = data
              this.storable = false
              componentSearchState.lastVisitedId = data.id
            })
          })
          .catch(error => {
            this.error = error
            this.loading = false
            this.isErrorDialogVisible = true
          })
    },
    changeComponentType(event) {
      let componentType = this.compTypeList.find(comp => {
        return comp.name === event.target.value
      })
      this.component.componentType = componentType
      this.component.articleNumber = componentType.articleNumber
    },
    saveComponent() {
      ComponentFetcher.saveComponent(this.component)
          .then(response => {
            response.json().then(data => {
              this.component = data
              this.storable = false
              this.$emit('saved')
              componentSearchState.lastVisitedId = data.id
              console.log(data);
              console.log(data.id);
              router.push({name: 'component', query: {id: data.id, viewMode: 'change'}})
            })
          })
          .catch(error => {
            this.error = error
            this.loading = false
            this.isErrorDialogVisible = true
          })
    },
    markAsKilled() {
      this.isKillDialogVisible = false
      ComponentFetcher.markAsKilled(this.component.id)
          .then(response => {
            response.json().then(data => {
              this.component.status = data
              this.storable = false
              this.$emit('saved')
              this.component.status = data.status
            })
          })
          .catch(error => {
            this.error = error
            this.loading = false
            this.isErrorDialogVisible = true
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
          .finally(() => {
            this.fetchComponentTypes()
          })
          .catch(error => {
            this.error = error
            this.loading = false
            this.isErrorDialogVisible = true
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
            this.isErrorDialogVisible = true
          })
    }
  }
}
</script>

<style scoped>

</style>