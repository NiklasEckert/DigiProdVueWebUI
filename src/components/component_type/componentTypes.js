import {reactive} from "vue";


export const componentTypesSearchState = reactive({
    fresh: true,
    key: "",
    page: { content: null },
    lastVisitedId: null
})