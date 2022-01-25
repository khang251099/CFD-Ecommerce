import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";

import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import storage from "redux-persist/lib/storage";
import cart from "../reducer/cart";
import wl from "../reducer/wishList";
import history from "../reducer/history";
import rate from "../reducer/rate";

import { createFirestoreInstance } from "redux-firestore";
import firebase from "../reducer/firebase";

const rrfConfig = {
  userProfile: "users",
};

// Create store with reducers and initial state

const store = createStore(rootReducer, initialState);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  cart,
  wl,
  history,
  rate,
  firebase: firebaseReducer,
  firestore: firestoreReducer, //Dùng để truy cập csdl firestore của firebase
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);
