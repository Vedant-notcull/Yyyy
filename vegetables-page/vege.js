import {vegetables ,getVegetable ,loadVegetablesFetch} from '/home-page/vegetable.js'
import {cart} from '/scripts/cart.js'
import {orders, orderPush} from '/scripts/order.js'

// header.js


headerAnimation()



export function headerAnimation() {
  const placeOrderBtn = document.querySelector('.place-order')
  
  const headbar = document.querySelector(".headbar");
  const hiddenItems = document.querySelectorAll(".hidden");
  const showItem = document.querySelector(".show");
  const addToCartBtn = document.querySelector(".elem");
  const addedMsg = document.querySelector(".added-to-cart");
  const cartBtn = document.querySelector(".nav-item:nth-child(3)")
  const cartContainer = document.querySelector('.cart-items');

  const cartCards = cartContainer.querySelectorAll('.cart-card');
  
  const cartOverlay = document.querySelector(".cart-overlay");
  
  const homeBtn = document.querySelector(".nav-item:nth-child(1)")
  const vegetableBtn = document.querySelector(".nav-item:nth-child(2)")
  




let isOn = false;     // tracks navbar expanded state
let cartOpen = false; // tracks cart overlay state







// Expand navbar
function expandNavbar(){
  const tl = gsap.timeline({
    onComplete: ()=>{
      isOn = true;
    }
  })
    tl.to(headbar, { height: "49%", width: "60%"
    ,duration: 1.2, ease: "elastic.out(1, 0.8)" });
    tl.to(hiddenItems, 
    { display: "flex" ,opacity: 1, duration: 0.3, stagger: 0.1 }, "<");  
}

headbar.addEventListener("click", (e) => {
  e.stopPropagation();
  if (!isOn && !cartOpen) {   // don’t expand if cart is already open
  expandNavbar()
  }
});




// Collapse navbar only if expanded (not when cart is open)
function collapseNavbar() {
  const tl = gsap.timeline({
    onComplete: ()=>{
      isOn = false;
    }
  })
  gsap.to(headbar, { height: "42%", width: "10%", duration: 0.4, ease: "ease.out" });
  gsap.to(hiddenItems, { display: "hidden", opacity: 0, duration: 0.2 });
  
}





document.addEventListener("click", () => {
  if (isOn && !cartOpen) {
    collapseNavbar();
  }
})

/////////////////////


let isBusy = false
  // Add to cart animation
 function showCartMessage(hello) {
  
  if ( isBusy === true) return ;
  isBusy = true 
  
  const tl = gsap.timeline({
    onComplete: ()=>{
      isBusy = false 
    }
  });
  
  
  tl.to(showItem, {
    opacity: 0,
    y: -10,
    duration: 0.25,
    onComplete: () => (showItem.textContent = hello)
  }).fromTo(showItem, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" });
  
  tl.to(headbar, { width: "20%" });
  tl.to(showItem, { marginLeft: "100px", duration: 0.4 });
  
  tl.to(headbar, { height: "140px", duration: 0.7, ease: "power2.out" });
  
  tl.fromTo(addedMsg, { opacity: 0, scale: 0.8 }, { display: "flex", opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }, "<");
  
  tl.to({}, { duration: 1.5});
  tl.to(addedMsg, { opacity: 0, duration: 0.3 });
  tl.to(headbar, { height: "42%", paddingLeft: "0px", duration: 0.5, ease: "power2.inOut" });
  tl.to(showItem, { marginLeft: "30px", duration: 0.38 });
  
  tl.to(headbar, { width: "10%" });
  
  tl.to(showItem, {
    opacity: 0,
    y: -10,
    duration: 0.25,
    marginLeft: "30px",
    onComplete: () => (showItem.textContent = "home")
  }).fromTo(showItem, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" });
}
  
  
  
  
document.querySelectorAll('.elem').forEach((elem )=>{
  elem.addEventListener('click', ()=>{
    showCartMessage('cart')
  })
})


  
  

////////////))///////////
// Cart show
function cartDisplay() {
  const tl = gsap.timeline({
    onComplete : ()=>{
      cartOpen = true;
    }
  });

  // collapse nav items if open
  gsap.to(hiddenItems, { display: "hidden",  opacity: 0,duration:0.3 });
  isOn = false;
  
  tl.to(showItem, {
    opacity: 0,
    y: -10,
    duration: 0.25,
    onComplete: () => (showItem.textContent = "cart")
  }).fromTo(
    showItem,
    { opacity: 0, y: 10 ,marginLeft: 0},
    { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
  );


  tl.to(showItem, { marginLeft: "320px",duration: 0.38});
  tl.to(headbar, { width: "55%",},'<');


  tl.to(headbar, {
    height: "580px",
    duration: 0.6,
    ease: "power2.inOut",
  });
  
  
  tl.fromTo(
    cartOverlay,
    { display: "none", opacity: 0, y: -20 },
    { display: "flex", opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
    
  );

}

// Cart hide
function hideCart() {

  const tl = gsap.timeline({
    onComplete: ()=>{
      cartOpen = false
      isOn = false
    }
  });
  // Hide cart overlay
  tl.to(cartOverlay, {
    opacity: 0, duration: 0.3 ,
    onComplete: () => (cartOverlay.style.display = "none")
  });

  // Shrink capsule back to its clean initial state
  tl.to(headbar, { height: "42%", paddingLeft: "0px", duration: 0.5, ease: "power2.inOut" });

  // Reset showItem text back to home smoothly
  tl.to(showItem, { marginLeft: "30px",duration: 0.38 });
  
  tl.to(headbar, { width: "10%" });
    
  tl.to(showItem, {
      opacity: 0,
      y: -10,
      duration: 0.25,
      onComplete: () => (showItem.textContent = "home")
    }).fromTo(showItem, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" })

}


// Cart button toggle
cartBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // prevent document listener
  if (!cartOpen  ) {
    cartDisplay();
  }else {
  hideCart();
 } 
  
});

// Close cart when clicking outside
document.addEventListener("click", () => {
  if (cartOpen) {
    hideCart();
  } else if (isOn && !cartOpen) {
    collapseNavbar();
  }
});









////////////////////////////////////////////////
////////////////////////////////////////////////

placeOrderBtn.addEventListener('click' , ()=>{
  completeOrderAnimation()
  clearCart()
})

function completeOrderAnimation() {

addedMsg.innerHTML = ''
addedMsg.innerHTML = `
      <div> Yeyyy </div> 
      <div> Order Placed </div>
`

  const tl = gsap.timeline({
    onComplete: ()=>{
      isOn = false;
      cartOpen = false;

    }
  });
  
tl.to(' .cart-card', {
  opacity:0, y:-20, duration:0.4, stagger:0.1,
  onComplete : ()=>{
    cart.length = 0
    localStorage.setItem('cart', JSON.stringify( cart))
  }
})

tl.to( cartOverlay , {
  opacity : 0, display :'none', duration: 0.4, 
  stagger:1
})
tl.to(headbar, { height:"140px" , duration: 0.6, ease: "power2.out"});
tl.to(showItem, {
  opacity: 0,
  y: -10,
  duration: 0.25,
  onComplete: () => (showItem.textContent = "cart")
}).fromTo(showItem, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" });

tl.to(showItem,{ marginLeft: "100px", duration:0.4, opacity: 1 });
tl.to( headbar, {width: "20%" }, "<");
tl.fromTo(addedMsg, { opacity: 0, scale: 0.8 }, { display: "flex", opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }, "<");
  
tl.to({}, { duration: 3 });
tl.to(addedMsg, { opacity: 0, duration: 0.3 });
tl.to(headbar, { height: "42%", paddingLeft: "0px", duration: 0.5, ease: "power2.inOut" });
tl.to(showItem, { marginLeft: "30px", duration: 0.38 });
tl.to(headbar, { width: "10%" });
  
tl.to(showItem, {
  opacity: 0, y: -10, duration: 0.25, marginLeft: "30px",
  onComplete: () => (showItem.textContent = "home")
}).fromTo(showItem, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" })

  
  
}





loadVegetablesFetch().then(()=>{
renderCart()
clearCart()
deleteItems();

})

 }
 
 
 
export function renderCart() {
  const cartContainer = document.querySelector('.cart-items');
  
  cartContainer.innerHTML = ""; // reset
  
  cart.forEach(cartItem => {
    const matchingVege = getVegetable(cartItem.vegeId); // use id from cart
    let farmerVar = ''
      
    matchingVege.farmers.forEach((farmer) => {
      if (Number(farmer.farmerId) === Number(cartItem.farmerId)) {
        farmerVar = farmer
        }
      })
      
    
    if (matchingVege) {
      cartContainer.innerHTML += `
        <div class="cart-card">
          <div class="imgbox">
            <img src="/images/vegeies/${matchingVege.name}.jpg" alt="">
          </div>
          <div class="bhaji">
            <h3>${matchingVege.name}</h3>
            <h4>By ${farmerVar.farmer} </h4>
          </div>
          <div class="paisa">₹ ${farmerVar.price * cartItem.quantity }</div>
          <div class="kilo">${cartItem.quantity} kg</div>
          <div class="qty-btn">
            <div class="add" 
            data-vege-id ="${matchingVege.id}"
          data-farmer-id ="${farmerVar.farmerId}">
            + </div>
            <div class="minus"
            data-vege-id ="${matchingVege.id}"
          data-farmer-id ="${farmerVar.farmerId}"> 
            - </div>
          </div>
          <button class="delete-btn"
          data-vege-id ="${matchingVege.id}"
          data-farmer-id ="${farmerVar.farmerId}">
            <img src="/images/utils/delete (1).png">
          </button>
        </div>
      `;
    }
  });
  
  
  
  
  deleteItems()

}


export function clearCart() {
  document.querySelector('.empty-cart').addEventListener('click', () => {
    
    const cartContainer = document.querySelector('.cart-items');
    const cartCards = cartContainer.querySelectorAll('.cart-card');
    if (cartCards.length === 0)return;
    
    gsap.to( cartCards, { 
      opacity:0, y:-20, duration:0.4, stagger:0.1,
      onComplete : ()=>{
       cart.length = 0
       localStorage.setItem('cart', JSON.stringify( cart))
      }
    })
  
  })
  
  

  
  
}



function deleteItems() {
  document.querySelectorAll('.delete-btn').forEach((button) => {
    button.addEventListener('click', (event) => {
      const vegeId = event.currentTarget.dataset.vegeId;
      const farmerId = event.currentTarget.dataset.farmerId;
console.log('yyy')
      // get cart from storage
      let localCart = JSON.parse(localStorage.getItem('cart')) || [];

      // filter out the matching item
      let updated = [];
      localCart.forEach((cartItem) => {
        if (!(cartItem.vegeId == vegeId && cartItem.farmerId == farmerId)) {
          updated.push(cartItem);
        }
      });

      // update global cart variable
      cart.length = 0;
      updated.forEach(item => cart.push(item));



      // save back to storage
      localStorage.setItem('cart', JSON.stringify(cart));

      // remove the element with a fade-out animation
      renderCart()
    });
  });
}





  
  
  
  
  















