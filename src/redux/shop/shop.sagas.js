import { call,all, put, takeLatest} from 'redux-saga/effects'
import { getDocs, collection, query } from 'firebase/firestore'

import { firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'
import shopActionTypes from './shop.types'
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions'


export function* fetchCollectionsStartAsync () {



    const collectionReference = collection(firestore, 'collections')

    

    try {

        const snap = yield getDocs(query(collectionReference))

        console.log(snap)
            
        const collectionsMap =  yield call(convertCollectionsSnapshotToMap, snap)
               
        yield put(fetchCollectionsSuccess(collectionsMap))

    } catch(error) {

        yield put(fetchCollectionsFailure(error.message))
    }
}

export function* onFetchCollectionsStart() {


    yield takeLatest(
        shopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsStartAsync
        )
}


export function* shopSagas(){

    all([call(onFetchCollectionsStart)])
}