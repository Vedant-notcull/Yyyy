import {cart} from '/scripts/cart.js';



export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function orderPush() {
document.querySelector('.place-order')
  .addEventListener('click', () => {
  
  const newOrder = {
    orderId: Date.now(), // unique ID (timestamp)
    items: [...cart], // copy all cart items
    date: new Date().toISOString(), // store date/time
    status: "pending" // can be updated later
  };
  
  orders.unshift(newOrder);
  
  // Save to localStorage
  localStorage.setItem('orders', JSON.stringify(orders));
  })
  
  

  
}


