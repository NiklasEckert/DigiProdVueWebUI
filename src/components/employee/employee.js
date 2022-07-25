import {reactive} from "vue";


export const employeeSearchState = reactive({
    fresh: true,
    key: "",
    page: { content: null },
    lastVisitedId: null,
    active: "true"
})