import { all, call, put, takeLatest } from "redux-saga/effects";
import UserActionTypes from "../user/user.types";
import { emptyCart } from "./cart.actions";



function* emptyCartListener(){

    yield  put(emptyCart())
}

function* onSignOutSucces(){


   yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, emptyCartListener)
 
}


export function* cartSagas(){

 yield  all([
        call(onSignOutSucces)
    ])
}