import React from 'react';

import './signin-signup.styles.scss';
import SignIn from '../../../../components/signin/signin.component';
import SignUp from '../../../../components/sign-up/sign-up.component';




const SingInSignUpPage = () => (
 <div className='signin'>
     <SignIn />
     <SignUp />
 </div>
);

export default SingInSignUpPage;