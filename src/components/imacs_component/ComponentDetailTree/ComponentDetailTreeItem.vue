<template>
  <router-link
      class="rounded-xl p-3 w-64 mb-2 block"
      :class="{'bg-amber-200':isSelected && component.statusName !== 'Killed',
              'bg-red-400':isSelected && component.statusName === 'Killed',
               'border-red-400':component.statusName === 'Killed',
               'border-amber-200': component.statusName !== 'Killed',
               'border-2': !isSelected}"
      :to="{name:'component',query:{id:component.id,viewMode:'change'}}"
  >
    <div class ="flex flex-row" style="align-items: baseline">
      <font-awesome-icon icon="fa-skull" class="mr-2" v-if="component.statusName === 'Killed'"/>
      <div class="text-xl font-bold mb-3">{{ component.componentType.name }}</div>
    </div>

    <div class="flex flex-row justify-between" style="vertical-align: top">
      <div>{{ this.formattedBirthdate }}</div>
      <div>{{ component.componentType.articleNumber }}</div>
    </div>
    <div class="flex flex-row justify-between">
      <div>{{ component.qrCode }}</div>
      <div>{{ component.orderNumber }}</div>
    </div>
  </router-link>
</template>

<script>
import moment from "moment";

export default {
  name: "ComponentDetailTreeItem",
  props:['component'],
  computed:{
    formattedBirthdate(){
      return moment(this.component.birthdate).format("DD MMM YYYY")
    },
    isSelected(){
      return this.$route.query.id===""+this.component.id
    }
  }
}
</script>


<style scoped>

</style>