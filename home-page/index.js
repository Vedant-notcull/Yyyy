import { loadVegetablesFetch, vegetables } from '/home-page/vegetable.js'

import {headerAnimation} from '/vegetables-page/vege.js'

import {cart} from '/scripts/cart.js'
import {orderPush, orders} from '/scripts/order.js';


loadVegetablesFetch().then( ()=>{
  console.log(vegetables)
  firstPage()
  secondPage()
  gsapAni()
  orderPush()
})


function firstPage(){
  const vegetablePart = document.querySelector('.vegetable-part')
  vegetablePart.innerHTML = ''
  
  vegetables.forEach((vegetable)=>{
    if(vegetable.boxType==="big"){
      console.log(vegetable.id)
      vegetablePart.innerHTML += `
      <div class="vegetable-box">
        <img src="/images/vegeies/${vegetable.name.toLowerCase()}.jpg" alt="${vegetable.name}">
        <div class="info">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod dicta, voluptas dolores molestiae, quia nostrum. Molestiae necessitatibus, dolore, 
            <a href="/vegetables-page/twst.html?vegetableId=${vegetable.id}">
        <button class="explore">explore</button>
        </a>
        </div>
      </div>
      
      `
    }
  })
  
  
  
}

function secondPage() {
  const vegetablePart2 = document.querySelector('.vegetable-part2')
  vegetablePart2.innerHTML = ''

 vegetables.forEach((vegetable)=>{
  
  if(vegetable.boxType === "small"){ 
   
   vegetablePart2.innerHTML += `
    <div class="vegetable-box2">
     <!--      cucmber            -->
     <img src="/images/vegeies/${vegetable.name}.jpg" alt="${vegetable.name}">
     <div class="info2">
     ${vegetable.name}
       <a href="/vegetables-page/twst.html?vegetableId=${vegetable.id}">
       <button>explore</button>
       </a>
     </div>
    </div>  `
  }
   
 })
 console.log(cart)
}

function gsapAni(){
const tl = gsap.timeline()
//navbar animation  
  headerAnimation()



//register scroll trigger 
gsap.registerPlugin(ScrollTrigger);

//first page horizontal scroll 
function firstPageScroll(){ 
let wrapper = document.querySelector(".wrapper");
let container = document.querySelector(".vegetable-part");

gsap.to(container, {
  x: () => -(container.scrollWidth - wrapper.offsetWidth),
  ease: "none",
  scrollTrigger: {
    trigger: wrapper,
    pin: true,
    scrub: 1,
    markers: true,
    start: "top top",
// remove this scroller when going to pc //
    scroller:'.hero',
// remove this scroller when going to pc //
    end: 'bottom center '
  }
});
}
firstPageScroll();















}
