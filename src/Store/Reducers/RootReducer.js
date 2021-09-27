import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import AuthReducer from "./AuthReducer";
import PagingReducer from "./PagingReducer";
import BlogReducer from "./BlogReducer";
import ContentReducer from "./ContentReducer";

const RootReducer = combineReducers({
    Auth: AuthReducer,
    Page: PagingReducer,
    Blog: BlogReducer,
    Content: ContentReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default RootReducer;