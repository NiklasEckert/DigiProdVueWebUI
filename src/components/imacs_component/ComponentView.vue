<template>
  <DetailScreenContainer v-if="this.loadingDone" class="p-0">
    <div class="flex flex-row">
      <ComponentDetailTree v-if="viewMode==='change'" :parent-component="this.componentTreeItem">
      </ComponentDetailTree>

      <div>
        <div class="h-full p-6">
          <div>
            <select class="form-control text-3xl font-bold outline-0 mt-5" @change="changeComponentType($event)"
                    :disabled="viewMode === 'change'">
              <option selected disabled>{{ this.componentType.name ?? "Choose type of component" }}</option>
              <option v-for="componentTypeItem in compTypeList" :value="componentTypeItem.name"
                      :key="componentTypeItem.id">
                {{ componentTypeItem.name }}
              </option>
            </select>
          </div>

          <div class="mt-4 pr-4">
            <label for="if5" class="block text-xs text-black/50">QR-Code</label>
            <input
                id="if5"
                v-model="this.component.qrCode"
                placeholder="QR-Code"
                class="text-xl outline-0 border-b w-full"
            >
          </div>

          <div class="mt-6 pr-4">
            <label class="block text-xs text-black/50">Article Number</label>
            <div class="text-xl outline-0 w-full bg-white" :class="{'text-black/50':this.componentType.articleNumber === null}">
              {{this.componentType.articleNumber ?? "Article Number"}}
            </div>
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
                v-model="this.component.filepath"
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
            <label class="text-xl ">{{ this.component.statusName }}</label>
          </div>


          <div class="mt-12 flex flex-row">
            <button
                class="text-black block py-2 px-3 rounded-md whitespace-nowrap drop-shadow-lg"
                :class="{ 'bg-amber-200 hover:bg-amber-400 hover:text-white hover:cursor-pointer': this.storable, 'text-gray-400 bg-amber-200/25': !this.storable}"
                :disabled="!this.storable"
                v-show="this.$route.query.viewMode==='creation'"
                @click="saveComponent"
            >
              <font-awesome-icon icon="fa-solid fa-plus" class="mr-1"/>
              Create
            </button>

            <button
                class="text-black block py-2 px-3 rounded-md whitespace-nowrap drop-shadow-lg"
                :class="{ 'bg-amber-200 hover:bg-amber-400 hover:text-white hover:cursor-pointer': this.storable, 'text-gray-400 bg-amber-200/25': !this.storable}"
                :disabled="!this.storable"
                v-show="this.$route.query.viewMode==='change'"
                @click="updateComponent"
            >
              <font-awesome-icon icon="fa-solid fa-floppy-disk" class="mr-1"/>
              Save
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
                :class="{ 'bg-amber-200 hover:bg-amber-400 hover:text-red-600 hover:cursor-pointer': this.$route.query.id && this.component.statusName !== 'Killed',
             'text-gray-400 bg-amber-200/25': !this.$route.query.id,
              'text-gray-400 bg-amber-200/25': this.component.statusName === 'Killed'}"
                :disabled="this.component.statusName === 'Killed'"
                @click="isKillDialogVisible=true"
                v-show="this.$route.query.id"
            >
              <font-awesome-icon icon="fa-solid fa-skull" class="mr-1"/>
              Mark component as killed
            </button>
          </div>
          <ComponentEventTable :component-id="component.id"/>
        </div>
      </div>
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
import ErrorDialog from "@/components/util/dialogs/ErrorDialog";
import ComponentDetailTree from "@/components/imacs_component/ComponentDetailTree/ComponentDetailTree";

export default {
  name: "ComponentView",
  components: {ComponentDetailTree, DetailScreenContainer, ComponentEventTable, ModalDialog, ErrorDialog},
  data() {
    return {
      compTypeList: [],
      loading: false,
      loadingComponentTypes: false,
      loadingComponentType: false,
      loadingComponentTree: false,
      formattedDate: moment().format("DD MMM YYYY HH:mm"),
      component: {
        id: "",
        name: "",
        qrCode: "",
        articleNumber: "",
        orderNumber: "",
        birthDate: 0,
        location: "",
        filePath: "",
        statusName: null,
        componentTypeId: null
      },
      componentType: {
        id: null,
        name: null,
        articleNumber: null
      },
      error: null,
      storable: false,
      isDeleteDialogVisible: false,
      isErrorDialogVisible: false,
      isKillDialogVisible: false,
      changeWatcher: null,
      componentTreeItem: null
    }
  },
  computed: {
    viewMode() {
      return this.$route.query.viewMode
    },
    loadingDone() {
      return !this.loading && !this.loadingComponentTypes && !this.loadingComponentType && !this.loadingComponentTree
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
              this.fetchComponentTree(this.component.id)
            })
          })
          .catch(error => {
            this.error = error
            this.loading = false
            this.isErrorDialogVisible = true
          })
    },
    changeComponentType(event) {
      this.componentType = this.compTypeList.find(comp => {
        return comp.name === event.target.value
      })
    },
    saveComponent() {
      let newComponent = {
        id: this.component.id,
        filepath: this.component.filePath,
        qrCode: this.component.qrCode,
        orderNumber: this.component.orderNumber,
        location: this.component.location,
        birthdate: this.component.birthDate,
        componentTypeId: this.componentType.id,
        statusName: this.component.status.statusName
      }

      ComponentFetcher.saveComponent(newComponent)
          .then(response => {
            response.json().then(data => {
              this.component = data
              this.storable = false
              this.$emit('saved')
              componentSearchState.lastVisitedId = data.id
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
              this.fetchData()
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
              this.formattedDate = moment(data.birthdate).format("DD MMM YYYY HH:mm")
              this.fetchComponentType(this.component.componentTypeId)
              this.fetchComponentTree(this.component.id)
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
      this.error = null
      this.loadingComponentTypes = true

      ComponentTypeFetcher.getAllComponentTypes()
          .then(response => {
            response.json().then(data => {
              this.compTypeList = data
              this.loadingComponentTypes = false
            })
          })
          .catch(error => {
            this.error = error
            this.loadingComponentTypes = false
            this.isErrorDialogVisible = true
          })
    },
    updateComponent() {
      ComponentFetcher.updateComponent(this.component.id, this.component)
          .then(response => {
            response.json().then(data => {
              this.component = data
              this.storable = false
              this.$emit('saved')
              componentSearchState.lastVisitedId = data.id
            })
          })
          .catch(error => {
            this.error = error
            this.loading = false
            this.isErrorDialogVisible = true
          })
    },
    fetchComponentType(id) {
      this.error = null
      this.loadingComponentType = true

      ComponentTypeFetcher.getComponentType(id)
          .then(response => {
            response.json().then(data => {
              this.componentType = data
              this.loadingComponentType = false
            })
          })
          .catch(error => {
            this.error = error
            this.loadingComponentType = false
            this.isErrorDialogVisible = true
          })
    },
    fetchComponentTree(id) {
      this.error = null
      this.loadingComponentTree = true

      ComponentFetcher.fetchComponentTree(id)
          .then(response => {
            response.json().then(data => {
              this.componentTreeItem = data
              this.loadingComponentTree = false
            })
          })
          .catch(error => {
            this.error = error
            this.loadingComponentTree = false
            this.isErrorDialogVisible = true
          })

    }
  }
}
</script>

<style scoped>

</style>