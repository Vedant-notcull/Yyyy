import { cart } from '/scripts/cart.js';
import { headerAnimation } from '/vegetables-page/vege.js'
import { loadVegetablesFetch, vegetables ,getVegetable } from '/home-page/vegetable.js'
import {orders,orderPush} from '/scripts/order.js';


loadVegetablesFetch().then(() => {
  headerAnimation()
  secondpage()
  guu()

})
console.log(orders)



function secondpage( ){
 const part2 = document.querySelector('.part2')
part2.innerHTML = ''

orders.forEach((order) => {
  const orderDate = new Date(order.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

  // build all item-boxes for this order
  let itemsHTML = ""
  order.items.forEach((item) => {
    const matchingVege = getVegetable(item.vegeId)
    const farmerId = item.farmerId

    const farmerr = matchingVege.farmers.find(f => Number(f.farmerId) === Number(farmerId))

    itemsHTML += `
      <div class="item-box">
        <div class="item-img">
          <img src="/images/vegeies/${matchingVege.name}.jpg" alt="">
        </div>
        <div class="item-name">
          ${matchingVege.name} ${item.quantity}kg <br>
          <span class="farmer">by ${farmerr.farmer} - ₹ ${farmerr.price}</span>
        </div>
      </div>
    `
  })

  // now put everything together in one go
  const orderHTML = `
    <div class="order-box">
      <div class="heading-part">
        <div class="order-text">Ordered on</div>
        ${orderDate}
      </div>
      <div class="display-part">
        <div class="item-part">
          ${itemsHTML}
        </div>
      </div>
    </div>
  `

  // append to part2
  part2.innerHTML += orderHTML
})
 
  
  
}






function guu(){
  const tl = gsap.timeline();
  let open = false;
  document.querySelectorAll('.order-box').forEach((orderBox)=>{
    
  
  orderBox.addEventListener('click', () => {
    
    if(open === false){
      open = true;
      tl.to('.order-box', {
      height: '580px',
      })
      tl.to('.display-part',{
        display:'flex',
        opacity:1,
      })
      
    }else{
      
      tl.to('.display-part', {
        opacity:0,
        display: 'none',
        duration:0.2,
      })
      tl.to('.order-box', {
        height: '120px',
      })
      open = false;

    }
   
   
})
  
  })

  
}













/*

function bag(){
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(".bag", 
    {
      width: "100%",     // full width initially
      height: "100%",    // full height initially
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      scale: 1,
      position: "absolute"
    },
    {
      width: "150px",    // final small size
      height: "150px",
      top: "20px",       // move to top
      right: "20px",     // move to right corner
      left: "auto",      // reset left so right works
      bottom: "auto",    // reset bottom
      scale: 1,          // keep consistent after resizing
      scrollTrigger: {
        trigger: ".wrapper",   // the section it should end at
        scroller:'.hero'
        start: "top center",
        end: "bottom center",
        markers: true,
        scrub: true,
        pin: true
      }
    }
  );
}
*/