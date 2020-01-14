import React from 'react';
import './checkout-item.styles.scss';
import {connect} from 'react-redux';
import {removeCartItem, removeItem, addItem} from '../../redux/cart/cart.action';

const CheckoutItem = ({cartItem,removeCartItem,removeItem,addItem}) => {
    console.log({cartItem});
    return(
        <div className='checkout-item'>
            <div className='image-container'>
                <img src={cartItem.imageUrl} alt='item' />
            </div>
            <span className='name'>{cartItem.name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={() => {
                    if(cartItem.quantity===1){
                        removeCartItem(cartItem);
                    }
                    else{
                        removeItem(cartItem);
                    }
                }}>&#10094;</div>
                <span className='value'>{cartItem.quantity}</span>
                <div className='arrow' onClick={() => addItem(cartItem)}>&#10095;</div>
                </span>
            <span className='price'>{cartItem.price}</span>
            <div className='remove-button' onClick={()=> {
                removeCartItem(cartItem);
            }}>&#10005;</div>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    removeCartItem : cartItem => dispatch(removeCartItem(cartItem)),
    removeItem : cartItem => dispatch(removeItem(cartItem)),
    addItem : cartItem => dispatch(addItem(cartItem))
});

export default connect(null,mapDispatchToProps)(CheckoutItem);