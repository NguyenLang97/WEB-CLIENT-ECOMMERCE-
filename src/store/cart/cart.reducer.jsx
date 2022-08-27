import { ADD_ITEM, REMOVE_ITEM, DELETE_ITEM } from './cart.action'

const initialState = {
    cartItems: [],
    totalQuantity: 0,
    totalAmount: 0,
}

const CartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM:
            const newItem = action.payload
            const existingItem = state.cartItems.find((item) => item.id === newItem.id)
            console.log(newItem)
            console.log(existingItem)
            const newTotalAmount = state.cartItems.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0)

            if (!existingItem) {
                const newCartItems = { ...newItem, quantity: 1, totalPrice: newItem.price }
                console.log(newCartItems)
                console.log(newTotalAmount)
                console.log(state)

                return {
                    ...state,
                    cartItems: [...state.cartItems, newCartItems],
                    totalQuantity: ++state.totalQuantity,
                    totalAmount: Number(state.totalAmount) + Number(newTotalAmount) + Number(newItem.price),
                }
            } else {
                return {
                    ...state,
                    totalQuantity: ++state.totalQuantity,
                    totalAmount: Number(state.totalAmount) + Number(existingItem.totalPrice),
                }
            }
            console.log(state)
        // case DELETE_ITEM:
        // const id = action.payload
        // const existingItem = state.cartItems.find((item) => item.id === id)
        // state.totalQuantity++

        // if (existingItem) {
        //     state.cartItems = state.cartItems.filter((item) => item.id !== id)
        //     state.totalQuantity = state.totalQuantity - existingItem.quantity
        // }

        // state.totalAmount = state.cartItems.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0)

        // case REMOVE_ITEM:
        // const id = action.payload
        // const existingItem = state.cartItems.find((item) => item.id === id)
        // state.totalQuantity--

        // if (existingItem.quantity === 1) {
        //     state.cartItems = state.cartItems.filter((item) => item.id !== id)
        // } else {
        //     existingItem.quantity--
        //     existingItem.totalPrice = Number(existingItem.totalPrice) - Number(existingItem.price)
        // }

        // state.totalAmount = state.cartItems.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0)

        default:
            return state
    }
}

export default CartReducer
