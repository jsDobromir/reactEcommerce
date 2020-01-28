import React,{useState} from 'react';

import './signin.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {googleSignInStart,emailSignInStart} from '../../redux/user/user.action';
import { connect } from 'react-redux';

const SignIn = ({emailSignInStart,googleSignInStart}) => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();
        emailSignInStart(email,password);
    }

        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={handleSubmit}>
                    <FormInput handleChange={(e) => {setEmail(e.target.value)}} name='email' type='email' value={email} label="email"/>
                    <FormInput handleChange={(e) => {setPassword(e.target.value)}} name="password" type='password' value={password} label="password"/>
                    <div className='buttons'>
                    <CustomButton type='submit'>SignIn</CustomButton>
                    <CustomButton type='button' onClick={googleSignInStart}>Sign in with Google</CustomButton>
                    </div>
                </form>
            </div>
        );

}

const mapDispatchToProps = dispatch => ({
    googleSignInStart : () => dispatch(googleSignInStart()),
    emailSignInStart : (email,password) => dispatch(emailSignInStart({email,password}))
});

export default connect(null,mapDispatchToProps)(SignIn);