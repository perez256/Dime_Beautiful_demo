import React from 'react'
import {Container} from 'react-bootstrap'
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import Products from './pages/Products';
import ProductPage from './pages/ProductPage'
import Bundle from './pages/Bundle'


function App() {
  return (
    <Router >
      < Header/>
        <main className="py-3">
          
          <Container>
            <Routes>
            <Route path='/' element={<Products /> } exact/>
            <Route path='/gid://shopify/Product/:id' element={<ProductPage /> }/>
            <Route path='/bundle/:id' element={<Bundle /> }/>
            {/* <Route path='/bundle/' element={<Bundle /> }/>
            <Route path='/bundle/:id?:qty' element={<Bundle /> }/> */}

            
            </Routes>
          </Container>
         
        </main>

      <Footer/>
    </Router>
  );
}

export default App;
