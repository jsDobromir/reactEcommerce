import CartActionTypes from './cart.types';


export const toggleCartHidden = () => ({
    type : CartActionTypes.TOGGLE_CART_HIDDEN,
});

export const addItem = (cartItem) => ({
    type : CartActionTypes.ADD_ITEM,
    payload : cartItem
});

export const removeItem = item => ({
    type : CartActionTypes.REMOVE_ITEM,
    payload : item
}); 


export const removeCartItem = (cartItem) => ({
    type : CartActionTypes.REMOVE_CART_ITEM,
    payload : cartItem
});

export const clearCart = () => ({
    type : CartActionTypes.CLEAR_CART
});