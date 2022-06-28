import {reactive} from "vue";


export const componentSearchState = reactive({
    fresh: true,
    key: "",
    page: 0,
    searchResults: [],
    lastVisitedId: null
})