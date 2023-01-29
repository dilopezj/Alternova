import React from 'react';

import './Products.css';

import Container from 'react-bootstrap/Container';
//import photoNoImg from './../Products_img/imagen-no-disponible.png';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import productsJson from '../data/Products.json';

function Products({ handleAddProducts }) {
    let productsList = productsJson.products.map((product, i) => (
        <Col key={`${i}-col`} >
            <Card id={`${i}-card`}  >
                <Card.Img variant="top" src={require(`./../Products_img/` + product.name + `.png`)} alt={product.name} style={{ height: 100 }} />
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                        <Container>
                            <Row xs={1} md={1} lg={2} >
                                <Col>{product.stock}</Col>
                                <Col><button id={`${i}-btncard`} name={product.name} type={'submit'} className='btn btn-danger btn-sm' variant="primary" size="sm" onClick={e => handleClick(product)} >Add</button> </Col>
                            </Row>
                        </Container>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    ));

    const handleClick = (oneCart) => {
        const newProduct = { name: oneCart.name, quantity: 1, unit_price: oneCart.unit_price, total_price: oneCart.unit_price, stock: oneCart.stock, completed: false }
        handleAddProducts(newProduct);
    };   

    return (<Container>
        <Row xs={1} md={3} lg={3}>
            {productsList}
        </Row>
    </Container>);
}



export default Products;