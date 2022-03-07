import React from 'react';


import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';


import { SignUpContainer, TitleContainer } from './sign-up.styles';
import { signUpStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux';



class SignUp extends React.Component{

    constructor(){

        super();

        this.state = {

            displayName:'',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const {displayName, email, password, confirmPassword} = this.state;
        const {signUpStart} = this.props
        if(password != confirmPassword) {

            console.log('passwords don\'t match!, retry again');
        }

      signUpStart({email, password, displayName})
    }

    handleChange = e =>{

        const {name, value} = e.target;

        this.setState({[name]:value});
    }
    render(){

        const {displayName, email, password, confirmPassword} = this.state;
        return (

            <SignUpContainer>

                <TitleContainer> I do not have an account</TitleContainer>
                <span>Sign up with your email and password</span>

                <form onSubmit= {this.handleSubmit}>
                    <FormInput
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange ={ this.handleChange}
                    placeholer = 'Display Name'
                    label = 'Display Name'
                    required
                     />

                   <FormInput
                    type='email'
                    name='email'
                    value={email}
                    onChange ={ this.handleChange}
                    placeholer = 'Email'
                    label = 'Email'
                    required
                     />
                     <FormInput
                    type='password'
                    name='password'
                    value={password}
                    onChange ={ this.handleChange}
                    placeholer = 'Password'
                    label = 'Password'
                    required
                     />

                    <FormInput
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange ={ this.handleChange}
                    placeholer = 'Confirm Password'
                    label = 'Confirm Password'
                    required
                     />

                     <CustomButton type='submit'>SIGN UP</CustomButton>

                </form>

            </SignUpContainer>
        )
    }
}


const mapDispatchToProps = dispatch => ({

    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
})
export default connect(null, mapDispatchToProps)(SignUp);