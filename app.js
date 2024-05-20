/*dark mode */
const btn=document.querySelector(".dark");
const nav=document.querySelector('.navbar');
const navItem= document.getElementsByClassName('nav-link');

btn.addEventListener("click", ()=>{
    const displaypage= document.querySelector("body");

   nav.style.backgroundColor="#fff";
   displaypage.style.backgroundColor="#fff";
   displaypage.style.color="#000";

});

const hamburger= document.querySelector(".hamburger");

hamburger.addEventListener("click", ()=>{

  for(nav of navItem){
    if(nav.style.display != "inline"){
      info.style.display = "inline";
    } else{
      nav.style.display= "none";
    }
  }

});


$(document).ready(function () {
  $(window).scroll(function () {
    //  sticky navbar on scroll script  //
    if (this.scrollY > 20) {
      $(".navbar").addClass("sticky");
    } else {
      $(".navbar").removeClass("sticky");
    }

    //  scroll-up button show/hide script  //
    if (this.scrollY > 500) {
      $(".scroll-up-btn").addClass("show");
    } else {
      $(".scroll-up-btn").removeClass("show");
    }
  });

  //  slide-up script  //

  $(".scroll-up-btn").click(function () {
    $("html").animate({ scrollTop: 0 });
    //  removing smooth scroll on slide-up button click  //
    $("html").css("scrollBehavior", "auto");
  });

  $(".navbar .menu li a").click(function () {
    //  Smooth scroll on Menu Items click  //

    $("html").css("scrollBehavior", "smooth");
  });

  //  Toggle Navbar  //

  $(".menu-btn").click(function () {
    $(".navbar .menu").toggleClass("active");
    $(".menu-btn i").toggleClass("active");
  });

  //  Typing Text Animation  //

  var typed = new Typed("#typing", {
    strings: [
      "Full Stack Web Developer",
      "Programmer",
      "Tech-Savvy",
      "Astrophile",
      "Coder"
    ],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
  });

  // var typed = new Typed(".typing", {
  //   strings: [
  //     "Full Stack Web Developer",
  //     "Programmer",
  //     "Tech-Savvy",
  //     "Astrophile"
  //   ],
  //   typeSpeed: 100,
  //   backSpeed: 60,
  //   loop: true
  // });

  //  Owl Carousel  //

  $(".carousel").owlCarousel({
    margin: 20,
    loop: true,
    autoplay: true,
    autoplayTimeOut: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
        nav: false
      },
      600: {
        items: 2,
        nav: false
      },
      1000: {
        items: 3,
        nav: false
      },
      2000: {
        items: 4,
        nav: false
      }
    }
  });
});

//**FORMS */
// const form=document.querySelector("form");
// const msgbtn=document.querySelector("#contact-btn");

// msgbtn.addEventListener("click", (e)=>{
//    console.log("clicked!");
// })
