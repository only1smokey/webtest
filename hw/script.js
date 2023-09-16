// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBb7QRB7LKECFLc2nr6nDuwL7u27be7Ii4",
    authDomain: "school-hw123.firebaseapp.com",
    projectId: "school-hw123",
    storageBucket: "school-hw123.appspot.com",
    messagingSenderId: "998860086731",
    appId: "1:998860086731:web:dbf784afae4c60c731aa4e",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
let auth = firebase.auth();

// Sign-in with Google function
// Sign-in with Google function
function signInWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    if (isMobile()) {
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // Handle result here
        }).catch(function(error) {
            alert.log(error.message);
        });
    } else {
        firebase.auth().signInWithRedirect(provider);
    }
}





function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Authentication status check
firebase.auth().onAuthStateChanged((user) => {
    document.getElementById('app').style.display = 'block';
    if (user) {
        // User is signed in
        document.getElementById('loginArea').style.display = 'block';
        document.getElementById('authBtn').textContent = 'Sign out';
    } else {
        // User is signed out
        document.getElementById('loginArea').style.display = 'block';
        document.getElementById('authBtn').textContent = 'Sign in with Google';
    }
    fetchHomeworks();  // fetch the homeworks regardless of the authentication state
});


function toggleSignIn() {
    if (auth.currentUser) {
        // User is signed in; sign them out
        auth.signOut();
    } else {
        // User is signed out; sign them in
        signInWithGoogle();
    }
}


document.getElementById('homeworkForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let message = document.getElementById('messageText').value;

    let postedBy = "Anonymous";
    if (auth.currentUser) {
        postedBy = auth.currentUser.displayName || auth.currentUser.email;
    }

    db.collection("homeworks").add({
        text: message,
        postedBy: postedBy,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()  // Adding a timestamp
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById('messageText').value = '';  // clear the input
        fetchHomeworks();
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
});

// Fetching the homework function
function fetchHomeworks() {
    db.collection("homeworks").orderBy("timestamp", "desc").get().then((querySnapshot) => {
        let messagesDiv = document.getElementById('messages');
        messagesDiv.innerHTML = "";  // clear the existing messages

        querySnapshot.forEach((doc) => {
            let messageElement = document.createElement('div');
            
            let textElement = document.createElement('p');
            textElement.textContent = doc.data().text;
            textElement.classList.add('homework-text');
            
            let authorElement = document.createElement('span');
            authorElement.textContent = "Posted by: " + doc.data().postedBy;
            authorElement.classList.add('homework-author');
            
            // If the message is by the currently logged-in user, add a class to style it differently
            if (auth.currentUser && doc.data().postedBy === auth.currentUser.email) {
                messageElement.classList.add('by-me');
            }
            
            messageElement.appendChild(textElement);
            messageElement.appendChild(authorElement);
            messagesDiv.appendChild(messageElement);
        });
    });
}


