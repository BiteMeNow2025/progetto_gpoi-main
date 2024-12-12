import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';

const CartPage = () => {
  // TODO: Implement cart state management
  const cartItems = [];
  const total = 0;

  return (
    <Container className="mt-5">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price * item.quantity}</td>
                  <td>
                    <Button variant="danger" size="sm">Remove</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-end">
            <h4>Total: ${total}</h4>
          </div>
          <div className="d-flex justify-content-end mt-3">
            <Button variant="primary">Proceed to Checkout</Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default CartPage;
