// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfAbVdpPq_TCpns6gnKcMeUw7XLnNxDmQ",
  authDomain: "login-form-aa56c.firebaseapp.com",
  projectId: "login-form-aa56c",
  storageBucket: "login-form-aa56c.appspot.com",
  messagingSenderId: "879952539669",
  appId: "1:879952539669:web:936bfb5d86c7416c881e1c",
  measurementId: "G-XR4TQM4HK9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Helper function to show messages
function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function () {
    messageDiv.style.opacity = 0;
  }, 5000);
}

// Sign up event listener
const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
  event.preventDefault();

  // Corrected: fetch correct input values
  const email = document.getElementById('rEmail').value;
  const password = document.getElementById('rPassword').value;
  const firstName = document.getElementById('fName').value;
  const lastName = document.getElementById('lName').value;

  if (!email || !password || !firstName || !lastName) {
    showMessage("Please fill in all the fields!", 'signUpMessage');
    return;
  }

  const auth = getAuth();
  const db = getFirestore();

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      const userData = {
        email: email,
        firstName: firstName,
        lastName: lastName
      };

      // Show success message
      showMessage('Account Created Successfully', 'signUpMessage');
      
      // Save user data to Firestore
      const docRef = doc(db, "users", user.uid);
      return setDoc(docRef, userData);
    })
    .then(() => {
      window.location.href = 'index.html';
    })
    .catch((error) => {
      const errorCode = error.code;
      console.error("Error during signup:", error);  // Add detailed logging
      if (errorCode === 'auth/email-already-in-use') {
        showMessage("Email Address Already Exists!!!", 'signUpMessage');
      } else if (errorCode === 'auth/weak-password') {
        showMessage("Password is too weak! It should be at least 6 characters.", 'signUpMessage');
      } else {
        showMessage('Unable to create user. Please try again.', 'signUpMessage');
      }
    });
});

// Sign in event listener
const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event) => {
  event.preventDefault();

  // Correctly fetch email and password values
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!email || !password) {
    showMessage("Please enter both email and password", 'signInMessage');
    return;
  }

  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      showMessage('Login is successful', 'signInMessage');
      const user = userCredentials.user;
      localStorage.setItem('loggedInUserId', user.uid);
      window.location.href = 'homepage.html';  // Redirect to homepage after successful login
    })
    .catch((error) => {
      const errorCode = error.code;
      console.error("Error during login:", error);  // Add detailed logging
      if (errorCode === 'auth/invalid-email' || errorCode === 'auth/wrong-password') {
        showMessage('Invalid Email or Password', 'signInMessage');
      } else {
        showMessage('Unable to login. Please try again.', 'signInMessage');
      }
    });
});
