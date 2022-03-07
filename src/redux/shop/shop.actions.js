import { collection, getDocs, query } from "firebase/firestore";


import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";




import shopActionTypes from "./shop.types";

export const fetchCollectionsStart = () => ({

    type: shopActionTypes.FETCH_COLLECTIONS_START,
})

export const fetchCollectionsSuccess = (collectionsMap) => ({

    type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
})


export const fetchCollectionsFailure = (errMessage) => ({

    type: shopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errMessage
})

export const fetchCollectionsStartAsync =  () => (

    async dispatch => {



        const collectionReference = collection(firestore, 'collections')

        dispatch(fetchCollectionsStart())

        try {

            const snap = await getDocs(query(collectionReference))
                
            const collectionsMap =  convertCollectionsSnapshotToMap(snap)
                   
            dispatch(fetchCollectionsSuccess(collectionsMap))

        } catch(error) {

          dispatch(fetchCollectionsFailure(error.message))
        }



            
    })
