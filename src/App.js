//create: Donna Lopez - 2023
import { useEffect, useState } from "react";

import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Alert from 'react-bootstrap/Alert';

import Products from './components/Products.jsx';
import ProductsList from './components/ProductsList';

function App() {

  let alertDiv = '';
  const [cartList, setCartList] = useState([]);
  const [preventEmptySave, setPreventEmptySave] = useState(true);
  const [message, setMessage] = useState({ variant: '', text: '' });
  const [showMessage, setShowMessage] = useState(false);


  const saveProducts = () => {
    if (cartList.length < 1 && preventEmptySave) { return; }
    setPreventEmptySave(true);
    localStorage.setItem('cartList', JSON.stringify(cartList));
  };

  const handleAddProducts = cartList => {
    const tempJson = JSON.parse(localStorage.getItem('cartList'));
    const tempProduct = tempJson.find(a => a.name === cartList.name);
    if (tempProduct) {
      let tempQuantity = Number(tempProduct.quantity) + 1;
      if (tempQuantity <= tempProduct.stock) {
        handleRemove(cartList.name);
        setCartList(prevProducts => [{ name: tempProduct.name, quantity: tempQuantity, unit_price: tempProduct.unit_price, total_price: (tempQuantity * Number(tempProduct.unit_price)), stock: tempProduct.stock }, ...prevProducts]);
      } else {
        setShowMessage(true);
        setMessage({ variant: 'warning', text: `You can not add more items of this product: ` + tempProduct.name });
      }
    } else {
      if (cartList.stock === 0) {
        setShowMessage(true);
        setMessage({ variant: 'warning', text: `You can not add more items of this product: ` + tempProduct.name });
      } else {
        setShowMessage(false);
        setMessage({ variant: '', text: '' });
        setCartList(prevProducts => [cartList, ...prevProducts]);
      }

    }
  };

  const handleRemove = name => {
    setPreventEmptySave(false);
    setCartList(prevProducts => prevProducts.filter(cartList => cartList.name !== name));
    setShowMessage(false);
    setMessage({ variant: '', text: '' });
  };

  useEffect(() => {
    setCartList(JSON.parse(localStorage.getItem('cartList')) || []);
  }, []);

  useEffect(() => {
    saveProducts();
  }, [cartList]);

  if (showMessage) {
    alertDiv = <Alert variant={message.variant} onClose={() => setShowMessage(false)} dismissible ><p> {message.text} </p> </Alert>;
  }

  return (
    <div className="App">
      <div className='App-header'>
        <h1>Alternova Shop</h1>
      </div>
      <div className='App-body'>
        <Container className="mt-2">
          <Row xs={1} md={1} lg={2}>
            <Col> {alertDiv} <Products handleAddProducts={handleAddProducts} /></Col>
            <Col>
              <h2><Badge pill bg="danger">Cart</Badge></h2>
              <ProductsList cartList={cartList} handleRemove={handleRemove} message={message} showMessage={showMessage} />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
