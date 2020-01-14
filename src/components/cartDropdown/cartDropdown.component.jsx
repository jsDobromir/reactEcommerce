import React from 'react';
import './cartDropdown.styles.scss';
import CustomButton from '../custom-button/custom-button.component';
//import CartDropdownItem from './cartDropdownItem/cartDropdownItem.component';
import { Link } from 'react-router-dom'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import CartItem from '../cart-item/cart-item.component';
import {selectCartItems} from '../../redux/cart/cart.selector';
import {createStructuredSelector} from 'reselect';
import {toggleCartHidden} from '../../redux/cart/cart.action';
const cartDropdown = ({cartItems,history,toggleCartHidden}) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {/* <CustomButton>Go to Checkout</CustomButton> */}
            {cartItems.length> 0 ? cartItems.map(cartItem => (
                     //<CartDropdownItem key={cartItem.id} cartItem={cartItem}/>
                     <CartItem key={cartItem.id} item={cartItem} />
                )) : <span className='empty-message'>No items in shopping cart</span>}
        </div>
        <CustomButton onClick={()=> {
            history.push('/checkout')
            toggleCartHidden();
        }}>Go to Checkout</CustomButton>
    </div>
)


const mapStateToProps = createStructuredSelector({
    cartItems : selectCartItems
});

const mapDispatchProps = dispatch => ({
    toggleCartHidden : () => dispatch(toggleCartHidden())
});

export default withRouter(connect(mapStateToProps,mapDispatchProps)(cartDropdown));