import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProduct } from '../Redux/actions/productActions';



function Products() {
    // state
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const {error, loading, products } = productList


    // use effect
    useEffect(() => {
    dispatch(listProduct());

    }, [dispatch])

    // console.log(products)

  return (
    <div>
        <br/>
        <h1 style={{textAlign: 'center'}}>Products</h1>

        {
            loading ? <Loader />
            :error ? <Message variant="danger">{error}</Message>
            :
            <Row>
            {
                products.map((product) => {
                    return (
                        <Col xs={12} sm={6} md={6} lg={4} xl={3} key={product?.id}>
                            <Product product={product}/>
                        </Col>
                    ) 
                })        
            }

        </Row>
           
            

        }
        </div>
  )
}
 
export default Products