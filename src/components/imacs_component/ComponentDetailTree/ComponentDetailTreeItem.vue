<template>
  <router-link
      class="border-4 border-amber-200 rounded-xl p-3 w-64 mb-2 block"
      :class="{ 'bg-amber-200':isSelected } "
      :to="{name:'component',query:{id:component.id,viewMode:'change'}}"
  >
    <div class="text-xl font-bold mb-3">{{ component.componentType.name }}</div>
    <div>{{ component.qrCode}}</div>
    <div class="flex flex-row justify-between">
      <div>{{ this.formattedBirthdate }}</div>
      <div>{{ component.componentType.articleNumber }}</div>
    </div>
    <div class="flex flex-row justify-between">
      <div>{{ component.location }}</div>
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
      return moment(this.component.birthdate).format("YYYY MMM DD HH:mm")
    },
    isSelected(){
      return this.$route.query.id===""+this.component.id
    }
  }
}
</script>


<style scoped>

</style>