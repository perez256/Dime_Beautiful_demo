import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {  productDetailReducer, productListReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';



const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailReducer,
    cart:cartReducer,
})
 
const bundleItemsFromStorage = localStorage.getItem('bundleItems') ?
    JSON.parse(localStorage.getItem('bundleItems')) : []

const initialState = {
    cart: {bundleItems: bundleItemsFromStorage}

}

const middleware = [thunk]

const store = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...middleware)))

export default store;