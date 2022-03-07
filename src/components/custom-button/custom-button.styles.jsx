import styled, {css} from "styled-components";


const baseStyles = css`
border: none;
background-color: black;
color: white;
&:hover {
  background-color: white;
  color: black;
  border: 1px solid black;
}

`

const invertedButtonStyles = css`
    background-color: white;
    color: black;
    border: 1px solid white;

    &:hover{

      background-color: black;
      color: white;
      border: none

    }
`

const googleSignInStyles = css`
         background-color: #4285f4;
         color: white;
         border: none;

        &:hover {
            background-color: #357ae8;
            border:none;
        }
`

    


const insideStyles = css`
        
      position: absolute;
      width: 80%;
      top: 255px;
      opacity: 0.7;
      display: none;
`
const getComputedStyles = props =>{

    const {inverted, inside, isGoogleSignIn} = props

    if(isGoogleSignIn) return googleSignInStyles

    return inverted ? inside ?  insideStyles + invertedButtonStyles : invertedButtonStyles : inside ? insideStyles + baseStyles : baseStyles
}
export const CustomButtonContainer = styled.button`
    min-width: 165px;
    width: auto;
    height: 50px;
    letter-spacing: 0.5px;
    line-height: 50px;
    padding: 0 35px 0 35px;
    font-size: 15px;

    text-transform: uppercase;
    font-family: 'Open Sans Condensed';
    font-weight: bolder;

    cursor: pointer;
    display: flex;
    justify-content: center;


    ${getComputedStyles}


`