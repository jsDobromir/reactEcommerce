import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_K9WCGVSoQQzStWS3QE6yNhyQ00WU4CNXAx';

    const onToken = token => {
        console.log(token);
        axios({
            url : 'payment',
            method : 'post',
            data : {
                amount : priceForStripe,
                token : token
            }
        }).then(resp => {
            console.log(resp);
            alert('Payment successfull');
        }).catch(error => {
            console.log('payment error : ' + error);
            alert('There was an issue with your payment');
        });
    }

    return(
        <StripeCheckout 
            label="Pay Now"
            name="Shop Clothing"
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
}

export default StripeCheckoutButton;