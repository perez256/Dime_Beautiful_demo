import React from 'react';
import {Link} from 'react-router-dom';
import {Card, Button} from 'react-bootstrap';
import Rating from './Rating';

function Product({product}) {



  return (
    <Card className='my-3 p-0 rounded'>
        <Link to={`/${product.id}`} >
        {product.images.length ? <Card.Img src={product?.images[0]['src']} alt={`${product?.title} product shot`}/>  : null}   
        </Link>

        <Card.Body>
        <Link to={`/product/${product?.id}`} style={{textDecoration: 'none'}}> <Card.Title as='h5'>{product?.title}</Card.Title></Link>

        <Card.Text as='h6'>
        <div className='my-3'>
             {/* 4.5 from 30 reviews */}
            <Rating value={4.5} text={`${40} reviews`} color={'#333333'} />
        </div>
        </Card.Text>




        <Card.Text as='h3'> 
        $ {product?.variants[0]['price']}
        </Card.Text>

        <div className="d-grid gap-1">
            <Button variant="primary" size="md" className='rounded' >
            Add to Bundle
            </Button>
        </div>


        </Card.Body>
    </Card>
  )
}

export default Product