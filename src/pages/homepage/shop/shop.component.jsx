import React, { Component } from 'react'
import SHOP_DATA from './2.3 shop.data.js';
import CollectionPreview from '../../../components/preview-collection/collection-preview.component.jsx';
class ShopPage extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            collections : SHOP_DATA
        };
    }

    render() {
        const {collections} = this.state;
        return (
            <div className='shop-page'>
                {
                    collections.map(({id, ...otherCollectionsProps}) => (
                        <CollectionPreview key={id} {...otherCollectionsProps} />
                    ))
                }
            </div>
        )
    }
}

export default ShopPage;
