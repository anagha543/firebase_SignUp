// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Firebase configuration
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

const auth = getAuth();
const db = getFirestore();

// Check if the user is logged in
onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef).then((doc) => {
            if (doc.exists()) {
                const userData = doc.data();
                document.getElementById('loggedUserFname').innerText = userData.firstName;
                document.getElementById('loggedUserLname').innerText = userData.lastName;
                document.getElementById('loggedUserEmail').innerText = userData.email;
            } else {
                console.log('User not found');
            }
        })
        .catch((error) => {
            console.log("Error fetching user data:", error);
        });
    }
});

// Logout functionality
const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(() => {
        window.location.href = 'index.html'; // Redirect to index.html after logout
    })
    .catch((error) => {
        console.error('Error signing out:', error);
    });
});
