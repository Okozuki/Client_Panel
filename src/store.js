import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';

// Redducers
// @todo

const firebaseConfig = {
  apiKey: "AIzaSyCj7d_JxKAv_G4b7_c-MRlZcU2P--589oQ",
  authDomain: "clientpanel-6f39e.firebaseapp.com",
  databaseURL: "https://clientpanel-6f39e.firebaseio.com",
  projectId: "clientpanel-6f39e",
  storageBucket: "clientpanel-6f39e.appspot.com",
  messagingSenderId: "469988478526",
  appId: "1:469988478526:web:27774de4e69ece5e"
}

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
}

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize other services on firebase instance
// const firestore = firebase.firestore()

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase)
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

// Create initial state
const initialState = {};

// Create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

// V3 UPDATE
// export const rrfProps = {
//   firebase,
//   config: rrfConfig,
//   dispatch: store.dispatch,
//   createFirestoreInstance 
// }

export default store;


