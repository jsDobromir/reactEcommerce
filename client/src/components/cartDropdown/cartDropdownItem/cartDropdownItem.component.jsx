import React,{useState,useEffect} from 'react';
import './cartDropdownItem.styles.scss';
import {connect} from 'react-redux';


const CartDropdownItem = ({cartItem}) => {
    const {id,name,price,imageUrl,quantity} = cartItem;

    return (
        <div className='cartItem'>
            <div className='image' style={{backgroundImage : `url(${imageUrl})`}}></div>
            <div className='nameprice'>
                <p>{name}</p>
                <p>{quantity} x {price}</p>
            </div>
        </div>
    )
}


export default CartDropdownItem;