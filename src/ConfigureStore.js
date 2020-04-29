// @flow

import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer, {}, applyMiddleware(thunk));
export const persistor = persistStore(store);
