import { Identity } from "@mui/base";
import { client } from "../../Constants/api";
import { CART_ADD_ITEM , CART_REMOVE_ITEM} from "../constants/bundleConstants"


export const addToCart = (id, qty, discountPrice) => async (dispatch, getState) => {
    const pid = `gid://shopify/Product/${id}`;
    await client.product.fetch(pid).then((product) => {

        dispatch(
            {
                type: CART_ADD_ITEM,
                payload: {
                    product: product.id,
                    title: product?.title,
                    price: product?.variants[0]['price'],
                    image: product?.images[0]['src'],
                    qty ,
                    discountPrice 
                }
            }
        )

        // local storage
        localStorage.setItem('bundleItems', JSON.stringify(getState().cart.bundleItems));
    })

}



export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })

     // local storage
     localStorage.setItem('bundleItems', JSON.stringify(getState().cart.bundleItems));


}