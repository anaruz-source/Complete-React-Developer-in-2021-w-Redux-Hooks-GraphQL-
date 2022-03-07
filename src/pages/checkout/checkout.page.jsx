import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";


import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import StripeCheckoutButton from "../../components/stripe-checkout-button/stripe-checkout-button.component";

import { selectCartItems, selectCartItemsTotalPrice } from "../../redux/cart/cart.selectors";



import {  CheckoutHeaderContainer,
         BlockHeaderContainer,
         TotalContainer,
         TestWarningContainer,
         CheckoutPageContainer
         } from "./checkout.styles";

const CheckoutPage = ({cartItems, total}) =>(

    <CheckoutPageContainer>
        <CheckoutHeaderContainer>
            <BlockHeaderContainer>
                <span>Product</span>
            </BlockHeaderContainer>

            <BlockHeaderContainer>
                <span>Description</span>
            </BlockHeaderContainer>

            <BlockHeaderContainer>
                <span>Quantity</span>
            </BlockHeaderContainer>

            <BlockHeaderContainer>
                <span>Price</span>
            </BlockHeaderContainer>

            <BlockHeaderContainer>
                <span>Remove</span>
            </BlockHeaderContainer>

        </CheckoutHeaderContainer>

        {cartItems.map(item => (<CheckoutItem key={item.id} cartItem={item} />))}

        <TotalContainer>
            <span>TOTAL: ${total}</span>
        </TotalContainer>

        <StripeCheckoutButton price = {total} />
        <TestWarningContainer>
            Please use the following test credit card for payments*
            4242 4242 4242 4242 - EXP: 01/22 - CVV: 123
        </TestWarningContainer>

    </CheckoutPageContainer>
);


const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartItemsTotalPrice
})

export default connect(mapStateToProps)(CheckoutPage);
