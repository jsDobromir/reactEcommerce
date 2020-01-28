import React, { Component } from 'react'
import {Route} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';
import CollectionOverview from '../../../components/collections-overview/collections-overview.component';
import CollectionPage from '../../collection/collection.component';
import {fetchCollectionsStart} from '../../../redux/shop/shop.actions';
import {selectIsCollectionFetching,selectIsCollectionsLoaded} from '../../../redux/shop/shop.selectors';

import WithSpinner from '../../../components/with-spinner/with-spinner.component';
import {connect} from 'react-redux';
import {firestore,convertCollectionSnapshotToMap} from '../../../firebase/firebase.utils';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

    componentDidMount(){
        const {fetchCollectionsStart} = this.props;
        fetchCollectionsStart();
    }

    render(){
        const {match,isCollectionFetching,isCollectionLoaded} = this.props;
        return (    
        
        
            <div className='shop-page'>
                <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props}/>}/>
                <Route path={`${match.path}/:collectionId`} 
                render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionLoaded} {...props}/>} />
            </div>
    );
    }
}

const mapStateToProps = createStructuredSelector({
    isCollectionFetching : selectIsCollectionFetching,
    isCollectionLoaded : selectIsCollectionsLoaded
})

const mapDispatchProps = (dispatch) => ({
    fetchCollectionsStart : () => dispatch(fetchCollectionsStart())
})

export default connect(mapStateToProps,mapDispatchProps)(ShopPage);
