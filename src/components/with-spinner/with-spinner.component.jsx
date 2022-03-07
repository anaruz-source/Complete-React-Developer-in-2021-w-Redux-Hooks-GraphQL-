import React from "react";

import { SpinnerContainer, SpinnerOverlay } from "./with-spinner.styles";



const WithSpinner = WrappedComponent =>({isLoading, ...props}) =>{

    console.log('props', props)
return (    isLoading ? (
        <SpinnerOverlay>
            <SpinnerContainer></SpinnerContainer>
        </SpinnerOverlay>
    ) : (<WrappedComponent {...props} />)
)
}

export default WithSpinner;