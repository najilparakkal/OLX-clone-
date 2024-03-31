import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { FirebaseContext } from './store/Context.jsx'
import { auth, firebaseApp,firestore } from './firebase/config.jsx'
import Context from './store/Context.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{firebaseApp,auth,firestore}}>
      <Context>
    <App />
    </Context>

    </FirebaseContext.Provider>
  </React.StrictMode>,
)
