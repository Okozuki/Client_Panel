import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
// import contactReducer from './contactReducer';

// export default combineReducers({
//   contact: contactReducer
// });

// Add firebase to reducers
export const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
})

// export default rootReducer;