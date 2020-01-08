import React from 'react';

import './signin.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {auth, signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : ''
        };
    }

    handleSubmit = async (e) =>{
        e.preventDefault();
        const {email,password} = this.state;
        try{
            await auth.signInWithEmailAndPassword(email,password);
            this.setState({email : '',password : ''})
        }catch(error){
            console.log(error);
        }
        this.setState({email : '',password : ''});
    }

    handleChange = (e) => {
        const {value,name} = e.target;

        this.setState({[name] : value});
    }

    render(){
        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput handleChange={this.handleChange} name='email' type='email' value={this.state.email} label="email"/>
                    <FormInput handleChange={this.handleChange} name="password" type='password' value={this.state.password} label="password"/>
                    <div className='buttons'>
                    <CustomButton type='submit'>SignIn</CustomButton>
                    <CustomButton onClick={signInWithGoogle}>Sign in with Google</CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;