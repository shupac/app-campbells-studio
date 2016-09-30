import firebase from 'firebase';

export default function() {
    'ngInject'

    var config = {
      apiKey: "AIzaSyDA3M49bDaNEbXdX_6vhXSuPk3S2DeAfYo",
      authDomain: "campbells-yoga.firebaseapp.com",
      databaseURL: "https://campbells-yoga.firebaseio.com",
      storageBucket: "",
      messagingSenderId: "273710453930"
    };
    firebase.initializeApp(config);

    var email = 'djshu.us@gmail.com';
    var password = 'forrestyoga';

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(error);
    });

    return {
      db: firebase.database()
    };
};
