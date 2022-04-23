
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';
import { getFirestore, setDoc, doc, collection, getDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';

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
            // Do something here if you want
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
            // Do something here if you want
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setFormError(errorMessage);
        });
}

function signOutUser() {
    signOut(auth);
}

let currUser;
onAuthStateChanged(auth, (user) => {
    const signedInContainer = document.getElementById('signed-in-container');
    const signedOutContainer = document.getElementById('signed-out-container');
    currUser = user;
    if (user) {
        signedInContainer.style.display = 'block';
        signedOutContainer.style.display = 'none';
        // For now, just instantly sign them out until next step
        const greetingMessage = document.getElementById('greeting-message-content');
        greetingMessage.textContent = `Good afternoon, ${user.email}`;
        return;
    }

    signedInContainer.style.display = 'none';
    signedOutContainer.style.display = 'block';
});


const firestore = getFirestore(app);

async function addUserData(e) {
    e.preventDefault();
    if (!currUser) {
        return;
    }
    const key = document.getElementById('key-input').value;
    const value = document.getElementById("value-input").value;
    if (!key || key.trim().length === 0) {
        return;
    }
    const userRef = doc(firestore, "users", currUser.uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
        await updateDoc(userRef, {
            [key]: value
        });
    } else {
        await setDoc(userRef, {
            id: currUser.uid,
            email: currUser.email,
            [key]: value
        });
    }

}
// addUserData();

document.getElementById('create-account-button').onclick = createUserAccount;
document.getElementById('login-button').onclick = loginUser;
document.getElementById('sign-out-button').onclick = signOutUser;
document.getElementById("add-data-button").onclick = addUserData;