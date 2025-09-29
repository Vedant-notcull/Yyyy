import {headerAnimation} from '/vegetables-page/vege.js'
import {vegetables ,getVegetable ,loadVegetablesFetch
} from'/home-page/vegetable.js'
import {cart} from '/scripts/cart.js'
import {  orderPush} from '/scripts/order.js'




loadVegetablesFetch().then(() => {
  headerAnimation()
  orderPush()
  gsapu()
    card()
})



function gsapu() {
  gsap.registerPlugin(SplitText, ScrollTrigger);


// Split paragraph into lines
let split = new SplitText(".text-reveal", { type: "words" });
let split2 = new SplitText(".farmer-para", { type: "words" });

gsap.fromTo(
  split.words,
  { color: "#1a1a1a" },
  {
    color: "white",
    duration: 1,
    stagger: 1,
    scrollTrigger: {
      scroller:'.hero',
      trigger: ".wrapper",
      start: "top top",
      end: "bottom center",
      scrub: true,
      markers:false,
      pin: true,
    }
  }
);

  
gsap.fromTo(
  split2.words,
  { color: "#A8BA80" ,opacity :0, y:'25px' },
  {
    color: "black",
    duration: 1,
    stagger: 1,
    y:'0',
    opacity :1,
    scrollTrigger: {
      scroller:'.hero',
      trigger: ".wrapper2",
      start: "top top",
      end: "bottom center",
      scrub: true,
      markers:false,
      pin: true,
    }
  }
);
  
  
  
  
  
  
  
  
  
}

function card(){
 const cardd = document.querySelectorAll('.card')
  gsap.set(cardd,
  { opacity :0, y:200 })
  
  gsap.set('.card.left', {
    opacity :0, y:0
  })
  
const tl = gsap.timeline()



tl.fromTo('.card.center ',
 { y:200, opacity:0, rotation:-12},
 { y:0, opacity :1, duration: 1,ease:'power.in',
   rotation:5 }
)
tl.to('.card.center',{
 rotation:0 , duration:0.5, ease:'power.in'
 , zIndex : 500
})
tl.fromTo('.card.left',
{ x : 200,y:0, opacity : 0 , rotation:0},
{ x:0 , rotation:0, opacity:1, duration :1, zIndex:300 }
, "+1.5")

tl.fromTo('.card.right',
{ x : -100,y:0, opacity : 0 , rotation:0},
{ x:0 , rotation:0, opacity:1, duration :1, stagger:0.1}
, "+1.2")
  
  
  
  
}