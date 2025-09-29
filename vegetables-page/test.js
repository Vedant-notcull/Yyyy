import {headerAnimation, renderCart, clearCart} from '/vegetables-page/vege.js'
import {vegetables ,getVegetable ,loadVegetablesFetch
} from'/home-page/vegetable.js'
import {cart} from '/scripts/cart.js'
import {orderPush} from '/scripts/order.js';






loadVegetablesFetch().then(()=>{
  fullPage()
})






  
function fullPage(){
  orderPush()
  renderCart()
  clearCart()
  headerAnimation()

  
  
const url = new URL(window.location.href)
const vegetableId = Number(url.searchParams.get('vegetableId'))
const boxPart = document.querySelector('.box-part')
const vegeName = document.querySelector('.vege-name')

const matchingVege = getVegetable(vegetableId)
console.log(matchingVege)

vegeName.innerHTML =''
boxPart.innerHTML = ''
vegeName.innerHTML = matchingVege.name

matchingVege.farmers.forEach((farmer)=>{
  boxPart.innerHTML += `
  <div class="big-box">
  <div class="box1">
    <img src="/images/png-vege/${matchingVege.name}.jpg" alt="">
  </div>
  <div class="box2">
    <div class="info1">
      <span class="sold">sold by </span>
      <span class="farmer-name">${farmer.farmer}</span>
      <span class="money"> price: ₹${farmer.price} / kg </span>
      <span class="pin-location">${farmer.location}</span>
    </div>  
  </div>
  
    <button class="add--to-cart elem"
    data-vege-id ="${matchingVege.id}"
    data-farmer-id ="${farmer.farmerId}">
      Add to cart
    </button>
</div>

  
  
  `
})







document.querySelectorAll('.add--to-cart').forEach((addBtn)=>{



addBtn.addEventListener('click', ()=>{

const vegeId = addBtn.dataset.vegeId
const farmerId = addBtn.dataset.farmerId

let matching = cart.find(
  (product) => product.vegeId === vegeId && product.farmerId === farmerId
);

if (matching) {
  matching.quantity += 1;
  localStorage.setItem('cart', JSON.stringify(cart))
} else {
  cart.push({
      vegeId: vegeId,
      farmerId: farmerId,
      quantity: 1,
      deliveryOptionId: '2',
  })
  localStorage.setItem('cart', JSON.stringify(cart))
}




/*cart.forEach((cartItem)=>{
  
  if(cartItem.vegeId === vegeId ){
    cartItem.quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cart))
  }else if (vegeId){
    cart.push({
      vegeId: vegeId,
      farmerId : farmerId,
      quantity: 1,
      deliveryOptionId: '2',
    })
    
    localStorage.setItem('cart', JSON.stringify(cart))
    
  }
  
})*/


renderCart()
})
  

  
  headerAnimation()
  
  
})
console.log(cart)






}