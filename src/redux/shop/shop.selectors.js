import { createSelector } from "reselect";

const shopSelector = state => state.shop

export const shopCollectionsSelector = createSelector(
    [shopSelector],
    shop => shop.collections
)

export const collectionsForPreviewSelector = createSelector(
    [shopCollectionsSelector],
    collections => collections ? Object.keys(collections).map(key =>collections[key]): []
)
export const collectionSelector = collectionUrlParam => createSelector(

    [shopCollectionsSelector],
    collections => collections ? collections[collectionUrlParam] : null

)


export const collectionsFetchingSelector = createSelector(
    [shopSelector],
    shop => shop.isFetching
)



export const collectionsLoadedSelector = createSelector(
    [shopCollectionsSelector],
    collections => !!collections
)