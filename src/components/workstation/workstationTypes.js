import {reactive} from "vue";


export const workstationsSearchState = reactive({
    fresh: true,
    key: "",
    page: { content: null },
    lastVisitedId: null
})