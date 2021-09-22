import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import AuthReducer from "./AuthReducer";
import PagingReducer from "./PagingReducer";

const RootReducer = combineReducers({
    Auth: AuthReducer,
    Page: PagingReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default RootReducer;