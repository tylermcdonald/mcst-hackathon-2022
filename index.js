
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js'
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';

// Your web app's Firebase configuration
const firebaseConfig = {
    // apiKey: ...
    // ...Rest of your firebase credentials
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);


function createUserAccount(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if(!email || email.trim().length === 0 || !password || email.trim().length === 0) {
        // TODO Set error on form
        return;
    }
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // TODO Set error on form
            // ..
        });
}

document.getElementById('create-account-button').onclick = createUserAccount;