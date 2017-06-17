/**
 * Data object to be written to Firebase.
 */
var data = {
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

