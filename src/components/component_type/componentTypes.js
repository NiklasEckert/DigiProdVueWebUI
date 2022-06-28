import {reactive} from "vue";


export const componentTypesSearchState = reactive({
    fresh: true,
    key: "",
    page: 0,
    searchResults: [],
    lastVisitedId: null
})