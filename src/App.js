import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';

import firebase from 'firebase/app'
import "firebase/auth";
import  firebaseConfig from './firebaseConfig';
firebase.initializeApp(firebaseConfig);
function App() {

  const [user , setUser] = useState({
    isSignIn : false,
    name : '',
    photo : ''
  });

  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = ()=>{

    firebase.auth().signInWithPopup(provider)
    .then(result=>{
      const {displayName , photoURL} = result.user;
      const signedIn = { isSignIn  :true , name : displayName , photo : photoURL};
      setUser(signedIn);
     // console.log(email , displayName , photoURL);
    })
    .catch(err=>console.log(err.message))
  }
  const handleSignOut = ()=>{

    firebase.auth().signOut()
    .then(res=>{
      const signOut =   { isSignIn : false,
        name : '',
        photo : ''}
        setUser(signOut);
    })
   

  }
  return (
    <div className="App">
    {(user.isSignIn) ?  <button onClick={handleSignOut}>Sign Out</button>   :<button onClick={handleSignIn}>Sign In</button>}
     {
       (user.isSignIn)?<div>
         <p>{user.name}</p>
         <img src={user.photo} alt="" srcset=""/>
        
       </div>: null
     }
    </div>
  );
}

export default App;
