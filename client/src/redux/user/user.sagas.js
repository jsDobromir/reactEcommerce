import {takeLatest,put,all,call} from 'redux-saga/effects';
import UserActionTypes from './user.types';

import {auth,googleProvider,createUserProfileFromDocument,getCurrentUser} from '../../firebase/firebase.utils';
import {signInSuccess,signInFailure, signOutSuccess, signOutFailure,signUpSuccess,signUpFailure} from './user.action';

export function* getSnapshotFromUserAuth(userAuth) {
    try{
        const userRef = yield call(createUserProfileFromDocument,userAuth);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({id : userSnapshot.id, ...userSnapshot.data() }))
    }catch(error){
        yield put(signInFailure(error));
    }
}

export function* googleSignInAsync(){
    try{
        const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    }catch(error){
        yield put(signInFailure(error));
    }
}

export function* onGoogleSignInStart () {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START,googleSignInAsync);
}

export function* emailSignInAsync({payload : {email,password}}){
    yield console.log(email);
    try{
        const {user} = yield auth.signInWithEmailAndPassword(email,password);
        yield getSnapshotFromUserAuth(user);
    }catch(error){
        yield put(signInFailure(error));
    }

}

export function* isUserAuthenticated(){
    try{
        const userAuth = yield getCurrentUser();
        if(!userAuth)return;
        yield getSnapshotFromUserAuth(userAuth);
    }catch(error){
        yield put(signInFailure(error))
    }
}

export function* onCheckUserSession(){
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION,isUserAuthenticated);
}

export function* onEmailSignInStart(){
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START,emailSignInAsync);
}

export function * signOutAsync(){
    yield console.log('signOutAsync');
    try{
        yield auth.signOut();
        yield put(signOutSuccess());
    }catch(error){
        yield put(signOutFailure(error));
    }
}

export function* onSignOutStart(){
    yield takeLatest(UserActionTypes.SIGN_OUT_START,signOutAsync);
}

export function* signUpAsync({payload : {displayName,email,password}}){
    try{
        const {user} = yield auth.createUserWithEmailAndPassword(email,password);
        yield createUserProfileFromDocument(user,{displayName});
        yield put(signUpSuccess(user));
    }catch(error){
        yield put(signUpFailure(error))
    }
}

export function* onSignUpStart(){
    yield takeLatest(UserActionTypes.SIGN_UP_START,signUpAsync);
}

export function* userSagas(){
    yield all([call(onGoogleSignInStart),
                call(onEmailSignInStart),
                call(isUserAuthenticated),
                call(onSignOutStart),
                call(onSignUpStart)
    ]);
}