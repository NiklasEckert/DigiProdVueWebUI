<template>
  <ModalDialog
    title="ERROR"
    :hint="error_code"
  >

  </ModalDialog>
</template>

<script>
import ModalDialog from "@/components/util/dialogs/ModalDialog";
export default {
  name: "ErrorDialog",
  components: {ModalDialog},
  props: ['error_code']
}
</script>

<style scoped>

</style>