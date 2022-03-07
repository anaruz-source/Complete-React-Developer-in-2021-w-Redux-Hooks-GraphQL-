import React from 'react';


import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signInWithEmailAndPassword } from '@firebase/auth';


import {googleSignInStart, emailSignInStart} from '../../redux/user/user.actions'

import {SignInContainer, TitleContainer, ButtonsContainer} from './sign-in.styles'
import { connect } from 'react-redux';

class SignIn extends React.Component {


    constructor(props){

        super(props);
        this.state = {

            email: '',
            password: ''
        }
    }
    handleSubmit = async (e) =>{

        e.preventDefault();
        const {email, password} = this.state;
        const {emailSignInStart} = this.props

        emailSignInStart(email, password);

    }
    handleChange = (e) => {

        const {name, value} = e.target;

        this.setState({[name]:value})
    }
    render(){

        const {email, password} = this.state;
        const {googleSignInStart} = this.props;
        return(
            <SignInContainer>
               <TitleContainer>I already have an account</TitleContainer>
               <span>Sign in with your email and password</span>
               <form onSubmit={this.handleSubmit}>
                   <FormInput
                   name = 'email'
                   type='email'
                   label = 'Email'
                   value={email}
                   handleChange =  {this.handleChange}
                   required  />
                   <FormInput
                    name = 'password'
                    type='password'
                    label ='Password'
                    value={password}
                    handleChange =  {this.handleChange}
                    required  />
                    <ButtonsContainer>
                        <CustomButton type='submit'>SIGN IN </CustomButton>
                        <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>{' '}SIGN IN WITH GOOGLE{' '}</CustomButton>
                    </ButtonsContainer>
               </form>
            </SignInContainer>
        )

    }
}


const mapDispatchToProps = dispatch =>({

    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})
export default connect(null, mapDispatchToProps)(SignIn);