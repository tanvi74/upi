import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Spinner from './components/Spinner'

// Redux setup
import { Provider } from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import rootReducer from './reducers/rootReducer'
import reduxPromise from 'redux-promise';

// Redux Persist setUp
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel1';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['siteModal']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const theStore = applyMiddleware(reduxPromise)(createStore)(persistedReducer);
const persistor = persistStore(theStore);


ReactDOM.render(
  <Provider store={theStore}>
    <PersistGate loading={<Spinner />} persistor = {persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
