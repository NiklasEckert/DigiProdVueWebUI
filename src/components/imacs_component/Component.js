import {reactive} from "vue";


export const componentSearchState = reactive({
    fresh: true,
    key: "",
    page: { content: null },
    searchResults: [],
    lastVisitedId: null
})