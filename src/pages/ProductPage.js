import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Form, Card, Button} from 'react-bootstrap'
import Rating from '../components/Rating';
import { listProductDetails } from '../Redux/actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';



function ProductPage() {
  const {id} = useParams();
  const navigate = useNavigate()
  // Redux
  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.productDetails);
  const {loading, error,  product } = productDetails;
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');

   // Quantity
   const [qty, setQty] = useState(1);

 
  // console.log('my id',id)
  // use effect
 
  useEffect(() => {
  
    dispatch(listProductDetails(id))
    setImage(product?.images[0]['src'])
    setPrice(product?.variants[0]['price'])
    

  }, [dispatch, id,product])

 

  const addToBundleHandler = () => {
    console.log('add to cart', id);
    navigate(`/bundle/${id}?qty=${qty}`);
  }


  return (
    <div>
        <Link to='/' className='btn btn-light my-3'>Go Back</Link>

        {
          loading ? <Loader />
          :error ? <Message variant="danger">{error}</Message>
          :
          <Row>
          <Col md={6}>
          <Image src={image} alt={`${product?.title} product shot`} fluid/> 
          </Col>


          <Col md={3}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h5>{product?.title}</h5>
                </ListGroup.Item>
              
                <ListGroup.Item>
                <Rating value={4.5} text={`${40} reviews`} color={'#333333'} />
                </ListGroup.Item>

                <ListGroup.Item>
                  Price: $ {price ? price : 0}
                </ListGroup.Item>
              
                <ListGroup.Item>
                  Description: {product?.description}
                </ListGroup.Item>
              
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
                  <ListGroup variant='flush'>
                      <ListGroup.Item>
                        <Row>
                          <Col>Price:</Col>
                          <Col><strong>$ {price}</strong></Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          <Col>Status:</Col>
                          <Col><strong>In Stock</strong></Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col xs='auto' className='my-1'>
                  
                          <Form.Control as="select" 
                          onChange={(e) => setQty(e.target.value)}
                          value={qty}>
                            {
                              [...Array(20).keys()].map((x) => (
                              <option key={x+1} value={x+1}>{x+1}</option>
                              ))
                            }
                         
                  
                          </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                      <div className="d-grid gap-1">
                      <Button variant="primary" size="md" 
                      type='button' 
                      onClick={addToBundleHandler}
                      className='rounded' >
                        Add to Bundle
                       </Button>
                       </div>
                      </ListGroup.Item>
                      
                  </ListGroup>
            </Card>
          </Col>
        </Row>

        }
        
    </div>
  )
}

export default ProductPage