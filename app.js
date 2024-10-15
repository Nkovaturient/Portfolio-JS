/**GSAP animations */
var tl = gsap.timeline()
tl.to(".brand", {
  y: 20,
  opacity:1,
  duration: 1.2,
  delay: 1,
})
tl.to(".nav-item a", {
  y: -40,
  opacity: 1,
  // stagger: 0.5,
  duration: 1.2,
});

/**Typing */
document.addEventListener("DOMContentLoaded", function () {
  var options = {
    strings: ["a MERN Stack Developer", "an Explorer", "a Tech-Savvy", "an Astrophile🌙"],
    typeSpeed: 50,  
    backSpeed: 25,  
    loop: true      
  };

  var typed = new Typed("#typing", options); 
});

/*Project-slider */
const carousel = document.querySelector('.carousel');
let isDown = false;
let startX;
let scrollLeft;

carousel.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener('mouseleave', () => {
  isDown = false;
});

carousel.addEventListener('mouseup', () => {
  isDown = false;
});

carousel.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - carousel.offsetLeft;
  const walk = (x - startX) * 2; 
  carousel.scrollLeft = scrollLeft - walk;
});



/*dark mode */
// const btn = document.querySelector(".dark");
// const nav = document.querySelector(".navbar");
// const navItem = document.getElementsByClassName("nav-link");

// btn.addEventListener("click", () => {
//   const displaypage = document.querySelector("body");

//   nav.style.backgroundColor = "#fff";
//   displaypage.style.backgroundColor = "#fff";
//   displaypage.style.color = "#000";
// });

// const hamburger = document.querySelector(".hamburger");

// hamburger.addEventListener("click", () => {
//   for (nav of navItem) {
//     if (nav.style.display != "inline") {
//       info.style.display = "inline";
//     } else {
//       nav.style.display = "none";
//     }
//   }
// });

// $(document).ready(function () {
//   $(window).scroll(function () {
//     //  sticky navbar on scroll script  //
//     if (this.scrollY > 20) {
//       $(".navbar").addClass("sticky");
//     } else {
//       $(".navbar").removeClass("sticky");
//     }

//     //  scroll-up button show/hide script  //
//     if (this.scrollY > 500) {
//       $(".scroll-up-btn").addClass("show");
//     } else {
//       $(".scroll-up-btn").removeClass("show");
//     }
//   });

//   //  slide-up script  //

//   $(".scroll-up-btn").click(function () {
//     $("html").animate({ scrollTop: 0 });
//     //  removing smooth scroll on slide-up button click  //
//     $("html").css("scrollBehavior", "auto");
//   });

//   $(".navbar .menu li a").click(function () {
//     //  Smooth scroll on Menu Items click  //

//     $("html").css("scrollBehavior", "smooth");
//   });

//   //  Toggle Navbar  //

//   $(".menu-btn").click(function () {
//     $(".navbar .menu").toggleClass("active");
//     $(".menu-btn i").toggleClass("active");
//   });

//   //  Typing Text Animation  //

//   var typed = new Typed("#typing", {
//     strings: [
//       "Full Stack Web Developer",
//       "Programmer",
//       "Tech-Savvy",
//       "Astrophile",
//       "Coder",
//     ],
//     typeSpeed: 100,
//     backSpeed: 60,
//     loop: true,
//   });

//   //  Owl Carousel  //

//   $(".carousel").owlCarousel({
//     margin: 20,
//     loop: true,
//     autoplay: true,
//     autoplayTimeOut: 2000,
//     autoplayHoverPause: true,
//     responsive: {
//       0: {
//         items: 1,
//         nav: false,
//       },
//       600: {
//         items: 2,
//         nav: false,
//       },
//       1000: {
//         items: 3,
//         nav: false,
//       },
//       2000: {
//         items: 4,
//         nav: false,
//       },
//     },
//   });
// });



/*contact form */
const msgbtn = document.querySelector("#contact-btn");


msgbtn.addEventListener('click', (e)=>{
  e.preventDefault();
  const name = document.querySelector("#name").value.trim();
const email = document.querySelector("#email").value.trim();
const msg = document.querySelector("#msg").value.trim();

  let formData={
    username: name,
    email: email,
    message: msg,
  }

  if(formData.username !== "" && formData.email !== "" && formData.message !== ""){
  emailjs.send('service_k6r5bm9', 'template_5zvwmti', formData)
    .then(function(response) {
      alert('Email sent successfully! Will Catch up to you soon!', response.status, response.text);
      document.querySelector("#name").value = '';
        document.querySelector("#email").value = '';
        document.querySelector("#msg").value = '';
    }, function(error) {
      alert('Failed to send email. Please try again later.', error);
    });
  }
  else {
    alert('Please fill out all fields before submitting.');
  }
}) 



const shareData = {
  title: "MDN",
  text: "Learn web development on MDN!",
  url: "https://developer.mozilla.org",
};

const butn = document.querySelector("buttons");
const resultPara = document.querySelector(".result");

// Share must be triggered by "user activation"
// butn.addEventListener("click", async () => {
//   try {
//     await navigator.share(shareData);
//     resultPara.textContent = "MDN shared successfully";
//   } catch (err) {
//     resultPara.textContent = `Error: ${err}`;
//   }
// });
