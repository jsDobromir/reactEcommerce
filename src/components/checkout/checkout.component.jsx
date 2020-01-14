import React from 'react';
import {connect} from 'react-redux';
import {selectCartItems,selectCartTotalPrice} from '../../redux/cart/cart.selector';
import {createStructuredSelector} from 'reselect';
import './checkout.styles.scss';
import CheckoutItem from '../checkout-item/checkout-item.component';
import StripeCheckoutButton from '../stripe-button/stripe-button.component';
const CheckOut = ({cartItems,cartTotal}) => {
    return(
        <div className='checkout-page'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {cartItems.length > 0 && (
                cartItems.map(cartItem => (
                <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
                ))
            )}
            <div className='total'><span>Total : ${cartTotal}</span></div>
            <div className='test-warning'>
                *Please use the following test credit card for payement*
                <br />
                4242 4242 4242 4242 - Exp : 01/20 - CVV : 123
            </div>
            <StripeCheckoutButton price={cartTotal}/>
        </div>
    )
}

const mapStateToProps = createStructuredSelector ({
    cartItems : selectCartItems,
    cartTotal : selectCartTotalPrice
});

export default connect(mapStateToProps)(CheckOut);