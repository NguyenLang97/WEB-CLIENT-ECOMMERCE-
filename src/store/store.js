import { combineReducers, createStore } from 'redux'
import CartReducer from './cart/cart.reducer'
import CartUiReducer from './cart_ui/cart_ui.reducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const rootReducer = combineReducers({
    CartReducer: CartReducer,
    CartUiReducer: CartUiReducer,
})
const store = createStore(rootReducer, composeWithDevTools())

export default store
