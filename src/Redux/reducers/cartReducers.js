import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/bundleConstants"


export const cartReducer = (state ={bundleItems: []}, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.bundleItems.find(x => x.product === item.product)

            if(existItem) {
                return {
                    ...state, 
                    bundleItems: state.bundleItems.map(x =>  
                        x.product === existItem.product ? item : x)
                }

            } else{
                return {
                    ...state,
                    bundleItems: [...state.bundleItems, item]
                }
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                bundleItems: state.bundleItems.filter(x => x.product !== action.payload)
            }
        default:
            return state;
    }
}