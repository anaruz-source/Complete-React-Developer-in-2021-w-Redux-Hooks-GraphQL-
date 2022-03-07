import styled, {css} from "styled-components";


const theme = {

  subColor: 'grey',
  mainColor: 'black',
}

const shrinkLabel = css`
  
top: -14px;
font-size: 12px;
color: ${theme.mainColor};

`

const passwordStyles = css`
letter-spacing: 0.3em;


`

export const GroupContainer = styled.div`

    position: relative;
    margin: 45px 0;

`

export const FormInputContainer = styled.input`

background: none;
background-color: white;
color:  ${theme.subColor};
font-size: 18px;
padding: 10px 10px 10px 5px;
display: block;
width: 100%;
border: none;
border-radius: 0;
border-bottom: 1px solid ${theme.subColor};
margin: 25px 0;

&:focus {
  outline: none;
}

&:focus ~ label {
  ${shrinkLabel}
}

${({type}) => {

    if(type.toLowerCase() =='password') return passwordStyles
}}

`

export const FormInputLabelContainer = styled.label`

color: ${theme.subColor};;
font-size: 16px;
font-weight: normal;
position: absolute;
pointer-events: none;
left: 5px;
top: 10px;
transition: 300ms ease all;
${({value}) => value.length ? shrinkLabel: '' }
`

