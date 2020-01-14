import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {auth} from '../../firebase/firebase.utils';

import {ReactComponent as Logo} from './crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cartDropdown/cartDropdown.component';
import {selectCartHidden} from '../../redux/cart/cart.selector';
import {selectCurrentUser} from '../../redux/user/user.selector';

import './header.styles.scss';

const Header = ({currentUser,hidden}) => (
    <div className='header'>
        <Link to="/" className='logo-container'>
            <Logo className='logo'/>
        </Link>
        <div className='options'>
            <Link to='/shop' className='option' >
                SHOP
            </Link>
            <Link to='/contact' className='contact' >
                CONTACT
            </Link>
            {
                currentUser ? 
                <div className='option' onClick={()=> auth.signOut()}>SIGNOUT</div>
                :
                <Link className='option' to='/signin'>SINGIN</Link>
            }
            <CartIcon/> 
        </div>
        {!hidden && (<CartDropdown/>)}
    </div>

);

const mapStateToProps = createStructuredSelector ({
    currentUser : selectCurrentUser,
    hidden : selectCartHidden
});

export default connect(mapStateToProps)(Header);