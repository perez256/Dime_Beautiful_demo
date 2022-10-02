import React from 'react'
import {Container,Nav,Navbar }from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'


function Header() {
  return (
    <header>
      <Navbar  expand="lg" style={{backgroundColor: '#F4F3F1'}} collapseOnSelect>
        <Container>
        <LinkContainer to='/'>
          <Navbar.Brand >DIME BEAUTIFUL SHOP</Navbar.Brand>
          </LinkContainer>


          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mr-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              {/* <LinkContainer to='/bundle'>
              <Nav.Link ><i className='fas fa-shopping-cart' ></i> Bundle</Nav.Link>
              </LinkContainer> */}
             
              {/* <Nav.Link href="#action2"><i className='fas fa-archive' ></i> Products</Nav.Link> */}
              {/* <Nav.Link href="#action3"><i className='fas fa-user' ></i> Login</Nav.Link> */}
            </Nav>
        
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header> 
  )
}
 
export default Header