import {takeEvery,takeLatest,call,put} from 'redux-saga/effects';
import {firestore,convertCollectionSnapshotToMap} from '../../firebase/firebase.utils';
import {
    fetchCollectionsSuccess,
    fetchCollectionsFailure 
} from './shop.actions';
import ShopActionTypes from './shop.types';

export function* fetchCollectionAsync(){

    try{
    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get();
    const collectionsMap =  yield call(convertCollectionSnapshotToMap,snapshot);
    yield put(fetchCollectionsSuccess(collectionsMap));
    }
    catch(error){
        yield put(fetchCollectionsFailure(error.message));
    }
    //     collectionRef.get().then(snapshot => {
    //        const collectionsMap =  convertCollectionSnapshotToMap(snapshot);
    //        dispatch(fetchCollectionsSuccess(collectionsMap));
    //     }).catch(error => dispatch(fetchCollectionsFailure(error.message)));
}

export function* fetchCollectionsStart () {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START,fetchCollectionAsync);

}