import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_K9WCGVSoQQzStWS3QE6yNhyQ00WU4CNXAx';

    const onToken = token => {
        console.log(token);
        alert('payement successfull');
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