<template>
  <DetailScreenContainer>
    <label class="block text-xs text-black/50 mt-5">Article Description</label>
    <input
        v-model="this.compType.name"
        placeholder="Article Description"
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
            @click="isDeleteDialogVisible = true"
            v-show="this.$route.query.id"
        >
          <font-awesome-icon icon="fa-solid fa-trash" class="mr-1" />
          Delete
        </button>
      </div>
    </div>
  </DetailScreenContainer>

  <ModalDialog
      v-show="isDeleteDialogVisible"
      title="Delete Component Type?"
      hint="This cannot be undone!"
      @cancel="isDeleteDialogVisible = false"
  >
    <template v-slot:buttonRow>
      <button @click="deleteComponentType" class="bg-red-600 hover:bg-red-700 text-white hover:shadow-md font-bold py-2 px-3 rounded-md ml-2" >
        <font-awesome-icon icon="fa-solid fa-trash" class="mr-1" />
        Delete
      </button>
    </template>
  </ModalDialog>

  <ErrorDialog v-show="isErrorDialogVisible" :error_code="this.error" @cancel="this.isErrorDialogVisible = false"/>
</template>

<script>
import {ComponentTypeFetcher} from "@/utils/ComponentTypeFetcher";
import router from "@/router";
import DetailScreenContainer from "@/components/util/detail_screen_container/DetailScreenContainer";
import {componentTypesSearchState} from "@/components/component_type/componentTypes";
import ModalDialog from "@/components/util/dialogs/ModalDialog";
import ErrorDialog from "@/components/util/dialogs/ErrorDialog";

export default {
  name: "ComponentTypeDetailScreen",
  components: {
    ErrorDialog,
    DetailScreenContainer,
    ModalDialog
  },
  data() {
    return {
      loading: false,
      compType: { id: "", name: "", articleNumber: "" },
      error: null,
      storable: false,
      changeWatcher: null,
      isDeleteDialogVisible: false,
      isErrorDialogVisible: false,
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
            if (!response.ok) {
              throw Error(response.statusText)
            }

            return response
          })
          .then(response => {
            response.json().then(data => {
              this.compType = data
              this.storable = false
              this.$emit('saved')
              router.push({ name: 'compType', query: { id: data.id , viewMode: 'change' } })
              componentTypesSearchState.lastVisitedId = data.id
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

      ComponentTypeFetcher.getComponentType(this.$route.query.id)
          .then(response => {
            response.json().then(data => {

              if (this.changeWatcher !== null) {
                this.storable = false
                this.changeWatcher()
              }

              this.compType = data
              this.loading = false
              componentTypesSearchState.lastVisitedId = data.id

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
            this.isErrorDialogVisible = true
          })
    },
    deleteComponentType() {
      this.isDeleteDialogVisible = false

      this.error = null
      this.loading = true

      ComponentTypeFetcher.deleteComponentType(this.compType.id)
          .then(response => {
            if (!response.ok) {
              throw Error(response.status)
            }

            return response
          })
          .then(() => {
            router.push({ name: 'noCompTypeSelected'})
            componentTypesSearchState.lastVisitedId = null
            this.$emit('deleted')
            this.loading = false
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