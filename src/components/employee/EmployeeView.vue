<template>
  <DetailScreenContainer>
    <div class="mt-12 pr-4">
      <label for="inputField" class="block text-xs text-black/50">First Name</label>
      <input
          v-model="this.employee.firstName"
          placeholder="First Name"
          class="text-xl outline-0 border-b w-full"
      >

      <div class="mt-12 pr-4">
        <label for="inputField" class="block text-xs text-black/50">Last Name</label>
        <input
            v-model="this.employee.lastName"
            placeholder="Last Name"
            class="text-xl outline-0 border-b w-full"
        >
      </div>

        <div class="mt-12 pr-4 flex flex-row">
          <div class="text-xl text-black">Active</div>
          <input
              type="checkbox"
              v-model="this.employee.active"
              checked
              class="outline-0 border-b ml-5 w-5 hover: cursor-pointer color: accent-amber-300"

          >
          </div>

      <div class="mt-12 flex flex-row">
        <button
            class="text-black block py-2 px-3 rounded-md whitespace-nowrap"
            :class="{ 'bg-amber-200 hover:bg-amber-400 hover:text-white hover:cursor-pointer': this.storable, 'text-gray-400 bg-amber-200/25': !this.storable}"
            :disabled="!this.storable"
            @click="saveEmployee"
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
      title="Delete Employee?"
      hint="This cannot be undone!"
      @cancel="isDeleteDialogVisible = false"
  >
    <template v-slot:buttonRow>
      <button @click="deleteEmployee" class="bg-red-600 hover:bg-red-700 text-white hover:shadow-md font-bold py-2 px-3 rounded-md ml-2" >
        <font-awesome-icon icon="fa-solid fa-trash" class="mr-1" />
        Delete
      </button>
    </template>
  </ModalDialog>

  <ErrorDialog v-show="isErrorDialogVisible" :error_code="this.error" @cancel="this.isErrorDialogVisible = false"/>
</template>

<script>
import {EmployeeFetcher} from "@/utils/EmployeeFetcher";
import router from "@/router";
import DetailScreenContainer from "@/components/util/detail_screen_container/DetailScreenContainer";
import {employeeSearchState} from "@/components/employee/employee";
import ModalDialog from "@/components/util/dialogs/ModalDialog";
import ErrorDialog from "@/components/util/dialogs/ErrorDialog";

export default {
  name: "employeeView",
  components: {
    ErrorDialog,
    DetailScreenContainer,
    ModalDialog
  },
  data() {
    return {
      loading: false,
      employee: { id: "", firstName: "", lastName: "", active: true },
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

            this.employee = { id: "", firstName: "", lastName: "", active: true }
            this.loading = false

            this.changeWatcher = this.$watch(
                () => this.employee,
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
    saveEmployee() {
      EmployeeFetcher.saveEmployee(this.employee)
          .then(response => {
            if (!response.ok) {
              throw Error(response.statusText)
            }

            return response
          })
          .then(response => {
            response.json().then(data => {
              this.employee = data
              this.storable = false
              this.$emit('saved')
              router.push({ name: 'employee', query: { id: data.id , viewMode: 'change' } })
              employeeSearchState.lastVisitedId = data.id
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

      EmployeeFetcher.getEmployee(this.$route.query.id)
          .then(response => {
            response.json().then(data => {

              if (this.changeWatcher !== null) {
                this.storable = false
                this.changeWatcher()
              }

              this.employee = data
              this.loading = false
              employeeSearchState.lastVisitedId = data.id

              this.changeWatcher = this.$watch(
                  () => this.employee,
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
    deleteEmployee() {
      this.isDeleteDialogVisible = false

      this.error = null
      this.loading = true

      EmployeeFetcher.deleteEmployee(this.employee.id)
          .then(response => {
            if (!response.ok) {
              throw Error(response.status)
            }

            return response
          })
          .then(() => {
            router.push({ name: 'noEmployeeSelected'})
            employeeSearchState.lastVisitedId = null
            this.$emit('deleted')
            this.loading = false
          })
          .catch(error => {
            this.error = error
            this.loading = false
            this.isErrorDialogVisible = true

          })
    },
    updateComponent() {
      EmployeeFetcher.updateEmployee(this.employee.id, this.employee)
          .then(response => {
            response.json().then(data => {
              this.employee = data
              this.storable = false
              this.$emit('saved')
              employeeSearchState.lastVisitedId = data.id
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