import {takeLatest, put, all, call, takeEvery} from 'redux-saga/effects'

import { getFirestore,  getDoc, doc, setDoc, addDoc, collection,  getDocsFromServer, getDocs,  query, writeBatch} from 'firebase/firestore';
import { signInWithPopup, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword} from 'firebase/auth';



import UserActionTypes from './user.types'


import { googleProvider, auth , createUserProfileDocument, getCurrentUser} from '../../firebase/firebase.utils'
import { signInFailure, signInSuccess, signOutFailure, signOutSuccess, signUpFailure, signUpSuccess } from './user.actions';
import { emptyCart } from '../cart/cart.actions';


function* getSnapFromUserAuth (userAuth, additionalData) {

    const userRef =  yield call(createUserProfileDocument, userAuth, additionalData)

    const snap = yield getDoc(userRef)

   yield put(signInSuccess({id: snap.id, ...snap.data()}))
}

 function* signInWithGoogle(){


    try {
   
      const {user} = yield  signInWithPopup(auth, googleProvider);

      yield getSnapFromUserAuth(user)
        

    } catch(error) {

       yield put(signInFailure(error))
    }
}


function* signInWithEmail({payload:{email, password}}){

    try{
      
        const {user} = yield signInWithEmailAndPassword(auth, email, password)
        
        yield getSnapFromUserAuth(user)


    }catch(error){
          
        yield put(signInFailure(error))

    }
}


function* isUserAuthenticated() {
    
  try {
     

    const userAuth = yield getCurrentUser()

    if(!userAuth) return;

    yield getSnapFromUserAuth(userAuth)

  } catch(error) {


  }
}

function* signOutListener(){

    try{
    

        yield signOut(auth)
        yield put(signOutSuccess())

    }catch(error) {

        yield put(signOutFailure(error))
    }
}

function* signUp({payload:{email, password, displayName}}){

  try {

    const {user} = yield createUserWithEmailAndPassword(auth, email, password)

    yield put(signUpSuccess({user, additionalData:{displayName}}))

    
  } catch (error) {
    
    yield put(signUpFailure(error))
  }
}

function* signInAfterSignUp({payload:{user, additionalData}}){

  try {
    
    yield getSnapFromUserAuth(user, additionalData)

  } catch (error) {
    
    yield put(signInFailure(error))
  }


  
}

// Listeners 

 function* onGoogleSignInStart(){

   yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

function* onEmailSignInStart(){

   yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

function* onCheckUserSession(){

    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated )
}

function* onSignOut(){

yield takeLatest(UserActionTypes.SIGN_OUT_START, signOutListener)
}


function* onSignUpStart(){

  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}

function* onSignUpSuccess(){


  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)

}


export function* userSagas (){

  yield all([
      call(onGoogleSignInStart),
      call(onEmailSignInStart),
      call(onCheckUserSession),
      call(onSignOut),
      call(onSignUpStart),
      call(onSignUpSuccess)
      
    ])
}