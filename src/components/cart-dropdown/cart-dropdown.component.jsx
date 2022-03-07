import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router";


import CartItem from "../cart-item/cart-item.component";

import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from "../../redux/cart/cart.actions";


import { CartDropdownContainer, CartItemsContainer, EmptyMessageContainer, ButtonContainer } from "./cart-dropdown.styles";

const CartDropdown = ({cartItems, history, dispatch}) => (

    <CartDropdownContainer>

        <CartItemsContainer>
            {
                cartItems.length ?
                cartItems.map(item =>(

                    <CartItem key= {item.id} item= {item} />
                )): (<EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>)
            }
        </CartItemsContainer>

        <ButtonContainer onClick = {
            () => {
            history.push('/checkout');
             dispatch(toggleCartHidden());
             } }>GO TO CHECKOUT
         </ButtonContainer>
        </CartDropdownContainer>
)

const mapStateToProps = createStructuredSelector({cartItems: selectCartItems})
export default withRouter(connect(mapStateToProps)(CartDropdown));