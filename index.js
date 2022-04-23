
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';

// Your web app's Firebase configuration
const firebaseConfig = {
    // apiKey: ...
    // ...Rest of your firebase credentials
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const getEmailAndPassword = (prefix) => {
    const email = document.getElementById(`${prefix}-email`).value;
    const password = document.getElementById(`${prefix}-password`).value;
    if (!email || email.trim().length === 0 || !password || email.trim().length === 0) {
        return {};
    }
    return { email, password };
}

const setFormError = (message) => {
    // TODO Set error on form
};

function createUserAccount(e) {
    e.preventDefault();
    const { email, password } = getEmailAndPassword('signup');
    if (!email || !password) {
        setFormError('Invalid email or password');
        return;
    }
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setFormError(errorMessage);
        });
}

function loginUser(e) {
    e.preventDefault();
    const { email, password } = getEmailAndPassword('login');
    if (!email || !password) {
        setFormError('Invalid email or password');
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setFormError(errorMessage);
        });
}

document.getElementById('create-account-button').onclick = createUserAccount;
document.getElementById('login-button').onclick = loginUser;