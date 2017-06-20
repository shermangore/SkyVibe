// Initialize Firebase
var config = {
    apiKey: "AIzaSyDQU3oj6IicLbBeJENhcXXDFLd4t54uLNg",
    authDomain: "skyvibe-35dfe.firebaseapp.com",
    databaseURL: "https://skyvibe-35dfe.firebaseio.com",
    projectId: "skyvibe-35dfe",
    storageBucket: "skyvibe-35dfe.appspot.com",
    messagingSenderId: "70151523481"
};

firebase.initializeApp(config);

/**
 * Data object to be written to Firebase.
 */
var weatherData = {
  sender: null,
  timestamp: null,
  lat: null,
  lng: null
};

/**
 * Starting point for running the program. Authenticates the user.
 * @param {function} Called when authentication succeeds.
 */
function initAuthentication(onAuthSuccess) {
  firebase.authAnonymously(function(error, authData) {
    if (error) {
      console.log('Login Failed!', error);
    } else {
      data.sender = authData.uid;
      onAuthSuccess();
    }
  }, {remember: 'sessionOnly'});  // Users will get a new id for every session.
}