
export const addOneOrMoreItems = (cartItems, newItem) => {

    let found = false; // used to check if element is found

    newItem = {...newItem, quantity: 1}; // new item doesnt have quantity attr yet

     cartItems = cartItems.map( item => {

        if(item.id === newItem.id) {

           found = true;
            return {...item, quantity:  item.quantity + 1}

        } else {

            return item;
        }
    })

   return found ? cartItems : (cartItems.concat([newItem]));
}


export const removeItemFromCart = (cartItems, item) => {


    cartItems = cartItems.map(cartItem =>{

        if(cartItem.id == item.id) {

            return {...cartItem, quantity: cartItem.quantity - 1}
        }
        return cartItem
    });

   return cartItems.filter(cartItem => cartItem.quantity > 0)

}