import React, { useEffect, useState } from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col, ListGroup, Modal, Image, Form, Button , Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { addToCart, removeFromCart } from '../Redux/actions/cartActions';
import Message from '../components/Message';



function Bundle() {
  const {id} = useParams();
  console.log(id)

// modal
const [show, setShow] = useState(false);


const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

// end

  const location = useLocation();
  const [discountPrice, setDiscountPrice] = useState(0);

  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  console.log('qty: ', qty);
  const dispatch = useDispatch();

  const bundle = useSelector(state => state.cart);
  const {bundleItems} = bundle
  console.log('bundleItems', bundleItems)

  useEffect(() => {
    if(id) {
      dispatch(addToCart(id, qty, discountPrice))
    }
   
  }, [dispatch, id, qty ]);


  const removeFromCartHandler = (id) => {
    console.log('remove: ', id.split('/')[4]);

    dispatch(removeFromCart(id));
    
  }




  return (

    <>
    <Row>
      <Col md={8}>
        <h1>Shopping Bundle</h1>

        {bundleItems.length === 0 ? (
          <Message variant='info'>
            Your bundle is empty <Link to='/'>Go Back</Link>
            </Message>
        ) :
        (<ListGroup variant='flush'>
          {
            bundleItems.map(item => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt= {item.title} fluid rounded/>
                  </Col>

                  <Col md={3}>
                    <Link to={`/${item.product}`}>{item.title}</Link>
                  </Col>

                  <Col md={2}>
                    $ {item.price}
                  </Col>

                  <Col md={3}>
                    <Form.Control as="select" 
                            value={item.qty}
                            onChange={(e) => dispatch(addToCart(item.product.split('/')[4], Number(e.target.value)))}
                            >
                              {
                                [...Array(20).keys()].map((x) => (
                                <option key={x+1} value={x+1}>{x+1}</option>
                                ))
                              }
                          
                          </Form.Control>
                  </Col>

                  <Col md={1}>
                    <Button 
                    type='button' 
                    variant='light'
                    onClick ={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i> 
                      </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))
          }
        </ListGroup>)
       
      } 
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>SubTotal ({bundleItems.reduce((acc, item) => acc + item.qty, 0)})</h2>
              $ {bundleItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}

              {}
            </ListGroup.Item>

            <ListGroup.Item>
              <h5>Discount</h5>
              {
              (bundleItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2))  >= 100 
              ? (
              <>
              $ {(bundleItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)) *0.1}
              <h6>Discounted Total</h6>
              $ {
              (bundleItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)) 
              - ((bundleItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)) *0.1) 

              }
              </>
                )
              :(
              <>
              $ { 0}
              </>
                
              )
              }
              
            </ListGroup.Item>

          </ListGroup>
          <div className="d-grid gap-1">
          
              <Button variant="primary" size="md" 
              type='button' 
              onClick={handleShow}
              disabled={bundleItems.length === 0}
              className='rounded' >
                Proceed to Bundle
               </Button>

                       </div>

          <ListGroup>

          </ListGroup>
        </Card>
      </Col>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{backgroundColor: 'black'}}>
          <Modal.Title style={{color: 'white'}}>Add $100 to Save 10%</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Row>
          <Col xs={6} sm={6} md={6}>Bundle Price</Col>
          <Col xs={6} sm={6} md={6}>Your Savings</Col>
          </Row>
          <Row>
          <Col xs={6} sm={6} md={6}><b style={{color: 'black'}}>$ { 
          bundleItems.reduce((acc, item) => acc + item.qty* item.price, 0) >= 100 ?
          
          (bundleItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)) 
              - ((bundleItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)) *0.1) 
              : bundleItems.reduce((acc, item) => acc + item.qty * item.price, 0) 
              }</b></Col>


          <Col xs={6} sm={6} md={6} style={{color: 'black'}}>$ {

      bundleItems.reduce((acc, item) => acc + item.qty* item.price, 0) >= 100 ?
          
          (bundleItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)) *0.1
          :
          0
          
}
          </Col>
          </Row>
          </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </Row>

    {/* Drawer */}



    </>

    



  )
}

export default Bundle