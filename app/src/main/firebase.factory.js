import firebase from 'firebase';

export default function FirebaseFactory($state, $rootScope) {
    'ngInject'

    var config = {
      apiKey: "AIzaSyDA3M49bDaNEbXdX_6vhXSuPk3S2DeAfYo",
      authDomain: "campbells-yoga.firebaseapp.com",
      databaseURL: "https://campbells-yoga.firebaseio.com",
      storageBucket: "",
      messagingSenderId: "273710453930"
    };

    firebase.initializeApp(config);

    var user;
    
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        $rootScope.resumeRoute();
      } else {
        $state.go('login');
      }
    });

    function auth(cred) {
        return firebase.auth().signInWithEmailAndPassword(cred.email, cred.password).then(function(result) {
          console.log(result);
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
    }

    function signOut() {
      return firebase.auth().signOut();
    }

    return {
      auth,
      db: firebase.database(),
      isAuth: function() {
        return !!firebase.auth().currentUser;
      },
      signOut
    };
};
