import React from 'react';
import {Link} from 'react-router-dom';

import {auth} from '../../firebase/firebase.utils';

import {ReactComponent as Logo} from './crown.svg';
import './header.styles.scss';

const Header = ({currentUser}) => (
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
        </div>
    </div>

);

export default Header;