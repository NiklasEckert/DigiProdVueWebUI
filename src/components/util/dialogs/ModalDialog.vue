<template>
  <div class="fixed top-0 right-0 bottom-0 left-0 bg-gray-400/50 flex justify-center items-center backdrop-blur-sm">
    <div class="p-6 bg-white rounded-md box-border shadow-2xl scoped-min-w-96">
      <div class="font-bold">{{ this.title }}</div>

      <div class="mt-2">
        <p>{{ this.hint }}</p>
      </div>

      <div class="flex flex-row justify-end mt-6">
        <slot name="buttonRow">

        </slot>
        <button @click="this.$emit('cancel')" class="bg-slate-300 hover:bg-slate-600 hover:text-white font-bold py-2 px-3 rounded-md ml-2" >
          <font-awesome-icon icon="fa-solid fa-xmark" />
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalDialog",
  props: ['title', 'hint']
}
</script>

<style scoped>
.scoped-min-w-96 {
  min-width: 24rem;
}
</style>