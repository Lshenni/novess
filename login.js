// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-analytics.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";

// Your web app's Firebase configuration

// const firebaseConfig = {
//     apiKey: "AIzaSyDI8-3Zcd0EwMRHuUBtZhK_b1hoT_c7oU8",
//     authDomain: "novess-web.firebaseapp.com",
//     databaseURL: "https://novess-web-default-rtdb.asia-southeast1.firebasedatabase.app",
//     projectId: "novess-web",
//     storageBucket: "novess-web.appspot.com",
//     messagingSenderId: "444827191127",
//     appId: "1:444827191127:web:53e90ea54a396ff7a4a012"
//     };

//new web - novess-evidence
const firebaseConfig = {
  apiKey: "AIzaSyBU9rRU22gqv8ZAgtM_XZ88ftZQ2xbFpaM",
  authDomain: "novess-evidence.firebaseapp.com",
  databaseURL: "https://novess-evidence-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "novess-evidence",
  storageBucket: "novess-evidence.appspot.com",
  messagingSenderId: "961224559252",
  appId: "1:961224559252:web:67c6f38606569840154281",
  measurementId: "G-BTYQNX72B4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);

//login
var loginemail = document.getElementById("login-email");
var loginpassword = document.getElementById("login-password");
// const loginBtn = document.getElementById("login-btn");

//register
var carnumIn = document.getElementById("register-carnum");
var regemailIn = document.getElementById("register-email");
var regpasswordIn = document.getElementById("register-password");


//login
window.login= function(e) {
  e.preventDefault();
  var obj = {
    email: loginemail.value,
    password: loginpassword.value,
  };

    signInWithEmailAndPassword(auth, obj.email, obj.password)
    .then(function (success) {
      alert("logined Successfully")
      var aaaa =  (success.user.uid);
      localStorage.setItem("uid",aaaa)
      console.log(aaaa)
      
      // Store the authenticated user's UID in localStorage
      localStorage.setItem("uid", success.user.uid);

      window.location.replace('index.html')
     // localStorage.setItem(success,user,uid)
      
    })
    .catch(function (err) {
      alert("login error"+err);
    });

  console.log(obj);
}

//register
window.signup = function (e) {
    //if(regpasswordIn)
    
        if(carnumIn.value == "" || regemailIn.value =="" || regpasswordIn.value ==""){
            alert("All Field Are Required"); 
            return;
        }
    
        e.preventDefault();
        var obj = {
          carnum: carnumIn.value,
          regemail: regemailIn.value,
          regpassword: regpasswordIn.value,
        };
      
        createUserWithEmailAndPassword(auth, obj.regemail, obj.regpassword)
        .then(cred =>{ 
            const userRef = ref(db, "Users/" + obj.carnum);  // Reference to the user document with car plate number as the key
            return set(userRef, { // Set the document data
            // set ic num field
                carnum: obj.carnum, // set ic num field
                email: obj.regemail, // store email
                uid: cred.user.uid // store uid
            });
            
        })
        //.then(function(success){
        .then(() => { 
            alert("Registered successfully");
            window.location.replace('login.html');
            //console.log(success.user.uid)
            
        }).catch(function(err){
          alert("Error in " + err);
        });
        // console.log()
        // console.log(obj);
};

