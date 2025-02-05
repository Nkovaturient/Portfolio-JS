// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.navbar-nav');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Add animation delay to nav items
navLinks.forEach((link, index) => {
  link.style.setProperty('--i', index + 1);
});

/**GSAP animations */
var tl = gsap.timeline()
tl.to(".brand", {
  y: 20,
  opacity:1,
  duration: 1.2,
  delay: 1,
})

/**Typing */
document.addEventListener("DOMContentLoaded", function () {
  var options = {
    strings: ["a MERN Stack Developer", "an Explorer","an Open Source Developer", "a Tech-Savvy", "an Astrophile🌙"],
    typeSpeed: 50,  
    backSpeed: 25,  
    loop: true      
  };

  var typed = new Typed("#typing", options); 
});


// Custom cursor effect
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});


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

document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const cards = document.querySelectorAll('.project-card');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');

  if (!track || !cards.length || !prevButton || !nextButton) {
      console.warn('Missing carousel elements');
      return;
  }

  let currentIndex = 0;
  const cardWidth = cards[0].offsetWidth + 32; // card width + gap
  
  function calculateMaxIndex() {
      const visibleWidth = track.parentElement.offsetWidth;
      const cardsPerView = Math.floor(visibleWidth / cardWidth);
      return Math.max(0, cards.length - cardsPerView);
  }

  let maxIndex = calculateMaxIndex();

  function updateCarousel() {
      // Ensure smooth transition
      track.style.transition = 'transform 0.3s ease-in-out';
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      
      // Update button states
      prevButton.disabled = currentIndex === 0;
      nextButton.disabled = currentIndex >= maxIndex;
      
      prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
      nextButton.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
  }

  prevButton.addEventListener('click', () => {
      if (currentIndex > 0) {
          currentIndex--;
          updateCarousel();
      }
  });

  nextButton.addEventListener('click', () => {
      if (currentIndex < maxIndex) {
          currentIndex++;
          updateCarousel();
      }
  });

  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
          maxIndex = calculateMaxIndex();
          // Reset position if current index is out of bounds
          if (currentIndex > maxIndex) {
              currentIndex = maxIndex;
          }
          updateCarousel();
      }, 250);
  });

  // Initial setup
  updateCarousel();
});


