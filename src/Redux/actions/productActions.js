import { 
    PRODUCT_LIST_FAIL, 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS,
     
     
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL

} from '../constants/productConstants';
import {client} from '../../Constants/api'



export const listProduct = () => async (dispatch) => {
    try {

        dispatch({type: PRODUCT_LIST_REQUEST });

         await client.product.fetchAll().then((res) => {
            console.log(res)

            dispatch({
                type: PRODUCT_LIST_SUCCESS,
                payload: res 
            });

            console.log('data ', res);
    

           });
    }catch(error){
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}


export const listProductDetails = (id) => async (dispatch) => {
    try {

        dispatch({type: PRODUCT_DETAIL_REQUEST });
        

        const pid = `gid://shopify/Product/${id}`;
        // console.log(pid)

        await client.product.fetch(pid).then((product) =>  {
            dispatch({
                type: PRODUCT_DETAIL_SUCCESS,
                payload: product 
            });

            // console.log('details ', product);

        })

    }catch(error){
        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}