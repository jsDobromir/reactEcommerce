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
export const firestore = firebase.firestore();
export const createUserProfileFromDocument = async (userAuth,additionalData) => {
        
        if(!userAuth) return;

        const userRef = firestore.doc(`users/${userAuth.uid}`);
        const collectionRef = firestore.collection('users');

        const snapshot = await userRef.get();
        const collectionSnapshot = await collectionRef.get();

        if(!snapshot.exists){
                const {displayName,email} = userAuth;
                const createdAt = new Date();
                try{
                        await userRef.set({
                                displayName : displayName,
                                email : email,
                                createdAt,
                                ...additionalData
                        });
                }catch(error){
                        console.log('error creating user',error.message);
                }
        }
        return userRef;
        
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
        const collectionRef= firestore.collection(collectionKey);
        const batch = firestore.batch();
        objectsToAdd.forEach(obj => {
                const newDocRef = collectionRef.doc();
                batch.set(newDocRef,obj);
        });

        return await batch.commit();
}

export const convertCollectionSnapshotToMap = (collections) => {
        const transformedCollection = collections.docs.map(doc => {
                const {title,items} = doc.data();
                return{
                        routeName : encodeURI(title.toLowerCase()),
                        id : doc.id,
                        title,
                        items
                };
        });
        return transformedCollection.reduce((accumulator,collection) => {
                accumulator[collection.title.toLowerCase()] = collection;
                return accumulator;
        },{});
}

export const getCurrentUser = () => {
        return new Promise((resolve,reject) => {
                const unsubscribe = auth.onAuthStateChanged(userAuth => {
                        unsubscribe();
                        resolve(userAuth);
                },reject)
        });
}

export const auth = firebase.auth();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt : 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
