import React, { useState } from 'react';

import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import ItemProduct from './ItemProduct';

function ListCard({ cartList, handleRemove }) {
  let total = 0;
  let orderJSON = {};
  let alertDiv = '';
  const [message, setMessage] = useState({ variant: '', text: '' });
  const [showMessage, setShowMessage] = useState(false);

  const handleClickOrder = (cartList, total) => {
    orderJSON = {
      "porducts": cartList,
      "total": total
    }
    //console.log(orderJSON);
    createJson(orderJSON);
    setShowMessage(true);
    setMessage({ variant: 'success', text: `Order Created - Total to pay: ` + orderJSON.total });
  };
  
  function createJson(orderJSON){
    var json = JSON.stringify(orderJSON);
    json = [json];
    var blob1 = new Blob(json, { type: "text/plain;charset=utf-8" });

    var isIE = false || !!document.documentMode;
    if (isIE) {
      window.navigator.msSaveBlob(blob1, "Order_price.json");
    } else {
      var url = window.URL || window.webkitURL;
      let link = url.createObjectURL(blob1);
      var a = document.createElement("a");
      a.download = "Order_price.json";
      a.href = link;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  if (showMessage) {
    alertDiv = <Alert variant={message.variant} onClose={() => setShowMessage(false)} dismissible ><p> {message.text} </p> </Alert>;
  }

  return (
    <div className="container w-100 mb-4" style={cartList.length > 0 ? {} : { display: 'none' }} >
      {alertDiv}
      <Table striped bordered hover responsive className='ListCard' size="sm">
        <thead>
          <tr key={'head'}>
            <th>Name</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total Price</th>
            <th>Remove Product</th>
          </tr>
        </thead>
        <tbody>
          {cartList.length > 0
            ? cartList.map(cartList => <ItemProduct cartList={cartList} handleRemove={handleRemove} />)
            : <tr key={'0'}>
              <td colSpan={5}>
              </td>
            </tr>
          }
        </tbody>
      </Table>
      <Container className="mt-2" key={'divTotal'}>
        <Row xs={1} md={2} lg={2}>
          <Col><p>TOTAL ORDER PRICE: <span> {total = (cartList.map((cartList) => Number(cartList.total_price))).reduce((previous, current) => { return previous + current; }, 0)}</span></p></Col>
          <Col><button type={'button'} className='btn btn-warning btn-ms' variant="warning" size="sm" onClick={e => handleClickOrder(cartList, total)} >Create Order</button> </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ListCard;