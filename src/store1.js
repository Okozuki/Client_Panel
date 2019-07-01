import { createStore, combineReducers } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { firebaseReducer } from 'react-redux-firebase';
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore';
// import 'firebase/auth';
// import 'firebase/storage';

// Redducers
import notifyReducer from './reducers/notifyReducer';
import settingsReducer from './reducers/settingsReducer';


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
// const createStoreWithFirebase = compose(
//   reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
//   reduxFirestore(firebase)
// )(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingsReducer
});

//Check for settings in localStorage
// let defaultSettings;

if (localStorage.getItem('settings') == null) {
  // Default Settings
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  }

  // Set to Local Storage
  localStorage.setItem('settings', JSON.stringify(defaultSettings));
}


// Create initial state
const initialState = { settings: JSON.parse(localStorage.getItem('settings')) };


// Create store
const store = createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

);

// V3 UPDATE
export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}

export default store;


