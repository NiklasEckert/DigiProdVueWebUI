<template>
  <table class="table-fixed w-full">
    <thead>
    <tr>
      <th scope="col" class="text-left px-1 py-4">Name</th>
      <th scope="col" class="text-left px-1 py-4">Activity</th>
      <th scope="col" class="text-left px-1 py-4">Start</th>
      <th scope="col" class="text-left px-1 py-4">End</th>
      <th scope="col" class="text-left px-1 py-4">Employee</th>
      <th scope="col" class="text-left px-1 py-4">Workstation</th>
      <th scope="col" class="text-left px-1 py-4">Result</th>
    </tr>
    </thead>
    <tbody>
      <tr v-for="event in eventList" :key="event.eventId" class="border-b transition duration-300">
        <td class="px-1 py-4" style="font-weight: bold">
          {{ event.eventId }}
        </td>
        <td class="px-1 py-4">
          {{ event.activity }}
        </td>
        <td class="px-1 py-4">
          {{ event.formattedStartDate }}
        </td>
        <td class="px-1 py-4">
          {{ event.formattedEndDate }}
        </td>
        <td class="px-1 py-4">
          {{ event.worker.workerName }}
        </td>
        <td class="px-1 py-4">
          {{ event.workstation.workstationName }}
        </td>
        <td class="px-1 py-4">
          {{ event.results.join(" | ") }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>

import {ComponentFetcher} from "@/utils/ComponentFetcher";
import moment from "moment";

export default {
  name: "ComponentEventTable",
  props: ['componentId'],
  data() {
    return {
      loading: false,
      eventList: [],
      error: null,
      storable: false,
      changeWatcher: null
    }
  },
  created() {
    this.$watch(
        () => this.componentId,
        () => {
          // this.fetchData()
        },
        {
          immediate: true
        }
    )
  },
  methods: {
    fetchData() {
      this.error = null
      this.loading = true
      ComponentFetcher.getEventsForComponent(this.componentId)
          .then(response => {
            response.json().then(data => {
              console.log(data)
              this.eventList = data.map(event => {
                event.formattedStartDate = moment(event.startDate).format("YYYY MMM DD HH:mm")
                event.formattedEndDate = moment(event.endDate).format("YYYY MMM DD HH:mm")
                return event
              })
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