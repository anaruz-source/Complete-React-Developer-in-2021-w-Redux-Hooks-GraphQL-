import { createStore, applyMiddleware } from "redux";
import logger from 'redux-logger';
import {persistStore} from 'redux-persist';

import createSagaMiddleware from "redux-saga";


import rootSaga from "./root-saga";
import rootReducer from "./root-reducer";


const saga = createSagaMiddleware()

const middlewares = [saga];

if(process.env.NODE_ENV == 'development') {

    middlewares.push(logger)
    
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares))


saga.run(rootSaga)

export const persistor = persistStore(store);
