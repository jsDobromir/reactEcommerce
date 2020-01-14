import React, { Component } from 'react'
import {Route} from 'react-router-dom';

import CollectionOverview from '../../../components/collections-overview/collections-overview.component';
import CollectinPage from '../../collection/collection.component';
const ShopPage = ({match}) =>  {
    return (    
        
        
            <div className='shop-page'>
                <Route exact path={`${match.path}`} component={CollectionOverview}/>
                <Route path={`${match.path}/:collectionId`} component={CollectinPage}/>
            </div>
    );
}


export default ShopPage;
