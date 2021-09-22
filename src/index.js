import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware, compose } from 'redux';
import RootReducer from './Store/Reducers/RootReducer';
import { Provider, useSelector } from 'react-redux';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore, createFirestoreInstance } from 'redux-firestore';
import { reactReduxFirebase ,ReactReduxFirebaseProvider, getFirebase, isLoaded } from 'react-redux-firebase';
import firebase from  './FirebaseCFG/config';
import Loader from './Components/Layout/Loader';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Paper } from '@mui/material';

const store = createStore(RootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase,getFirestore})),
    reduxFirestore(firebase)
  )
);


const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
  enableRedirectHandling: false,
  resetBeforeLogin: false,
}

const rrfProps = {
  firebase,
  config: rrfConfig, firebase,
  dispatch: store.dispatch,
  createFirestoreInstance
}

function AuthIsLoaded({ children }) {  
  const auth = useSelector((state) => state.firebase.auth);   if
  (!isLoaded(auth))
      return (
        <Paper>
          <Loader />
        </Paper>
      );   
  return children; }

  const theme = createTheme({
    palette : {
      mode: 'dark'
    }
  });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <ThemeProvider theme={theme}>
          <AuthIsLoaded>
            <App />
          </AuthIsLoaded>
        </ThemeProvider>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
