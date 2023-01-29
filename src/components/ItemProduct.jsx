import React from 'react';

function ItemProduct({ cartList, handleRemove   }) {

  return (<tr className='ItemProduct text-center' key={cartList.name} >
            <td>{cartList.name}</td>
            <td>{cartList.quantity}</td>
            <td>{cartList.unit_price}</td>
            <td>{cartList.total_price}</td>
            <td><button className='btn-close btn-close-black align-self-center' onClick={() => handleRemove(cartList.name)}></button></td>
          </tr>
  );
}

export default ItemProduct;