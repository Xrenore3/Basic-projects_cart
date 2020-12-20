const reducer = (state, action) => {
  switch (action.type) {
    case "CLEAR_CART": {
      return { ...state, cart: [] };
    }
    case "REMOVE": {
      return {
        ...state,
        cart: state.cart.filter((cartItem) => cartItem.id !== action.id),
      };
    }
    case "INCREASE": {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === action.id) {
          return { ...cartItem, amount: cartItem.amount + 1 };
        }
        return cartItem;
      });
      return { ...state, cart: tempCart };
    }
    case "DECREASE": {
      const tempCart = state.cart
        .map((cartItem) => {
          if (cartItem.id === action.id) {
            return { ...cartItem, amount: cartItem.amount - 1 };
          }
          return cartItem;
        })
        .filter((cartItem) => cartItem.amount !== 0);
      return { ...state, cart: tempCart };
    }
    case "GET_TOTALS": {
      const totalAmount = state.cart.length;
      let totalPrice = state.cart.reduce((cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        return (cartTotal += price * amount);
      }, 0);
      totalPrice = parseFloat(totalPrice.toFixed(2))

      return { ...state, amount: totalAmount, total: totalPrice };
    }
    case 'LOADING': {
      return { ...state, loading: true }
    }
    case 'DISPLAY_ITEMS': {
      return { ...state, cart: action.playload,loading: false }
    }
    default:
      return state;
  }
};

export default reducer;
