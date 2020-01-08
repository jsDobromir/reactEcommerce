import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
        apiKey: "AIzaSyAivS8AkrkpgWeb7T03dXmgPBhtFiXvjb8",
        authDomain: "crown-db-d3866.firebaseapp.com",
        databaseURL: "https://crown-db-d3866.firebaseio.com",
        projectId: "crown-db-d3866",
        storageBucket: "crown-db-d3866.appspot.com",
        messagingSenderId: "732134623051",
        appId: "1:732134623051:web:786127989af86791f34ace",
        measurementId: "G-LH5QYJJNBZ"
};

firebase.initializeApp(config);
const firestore = firebase.firestore();
export const createUserProfileFromDocument = async (userAuth,additionalData) => {

        if(!userAuth) return;

        const userRef = firestore.doc(`users/${userAuth.uid}`);
        const snapshot = await userRef.get();
        
        if(!snapshot.exists){
                const {displayName,email} = userAuth;
                const createdAt = new Date();
                try{
                        await userRef.set({
                                displayName,
                                email,
                                createdAt,
                                ...additionalData
                        });
                }catch(error){
                        console.log('error creating user',error.message);
                }
        }
        return userRef;
}

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt : 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firestore;