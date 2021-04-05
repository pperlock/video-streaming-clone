import firebase from 'firebase';

const config={
    apiKey: process.env.REACT_APP_FIREBASE_API,
    authDomain: "videostreamer-e2ccd.firebaseapp.com",
    projectId: "videostreamer-e2ccd",
    storageBucket: "videostreamer-e2ccd.appspot.com",
    messagingSenderId: "281953951837",
    appId: "1:281953951837:web:85aa746952a30e0394adb4",
    // measurementId: "G-LMGWXZLQS0"
}

firebase.initializeApp(config)
// firebase.analytics();
export default firebase
