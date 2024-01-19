function toggleMenu(){
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");  
}
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".section");
  
    function checkInView() {
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
  
        if (sectionTop < windowHeight * 0.75) {
          section.classList.add("is-visible");
        }
      });
    }
  
    // Initial check in case some sections are already in view on page load
    checkInView();
  
    // Attach the checkInView function to the scroll event
    window.addEventListener("scroll", checkInView);
  });

  // Function to handle the intersection changes
function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }
  
  // Create an Intersection Observer
  const observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });
  
  // Target the #profile section
  const profileSection = document.querySelector('#profile');
  
  // Observe the #profile section
  observer.observe(profileSection);
  
  