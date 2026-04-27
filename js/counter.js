/**
 * counter.js - Number counter animations for statistics
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all counter elements
  const counters = document.querySelectorAll('.stat-number[data-target]');
  
  // Only run if counters exist
  if (counters.length === 0) return;
  
  // Configuration
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  };
  
  // Counter animation function
  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // milliseconds
    const startTime = performance.now();
    const startValue = 0;
    
    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);
      
      element.textContent = currentValue.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toLocaleString();
      }
    }
    
    requestAnimationFrame(updateCounter);
  }
  
  // Intersection Observer to trigger counters when visible
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        animateCounter(element);
        observer.unobserve(element); // Only animate once
      }
    });
  }, observerOptions);
  
  // Observe each counter
  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
  
  // Optional: Reset counters when they become visible again (for SPA-like behavior)
  // This is useful if you have page transitions without full page reload
  
  // For pages with multiple counter sections, ensure they all animate
  // You can also add manual trigger function if needed
  window.triggerCounters = function() {
    const visibleCounters = document.querySelectorAll('.stat-number[data-target]');
    visibleCounters.forEach(counter => {
      if (isElementInViewport(counter)) {
        animateCounter(counter);
      }
    });
  };
  
  // Helper function to check if element is in viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Trigger on window scroll as fallback
  window.addEventListener('scroll', function() {
    const counters = document.querySelectorAll('.stat-number[data-target]:not(.animated)');
    counters.forEach(counter => {
      if (isElementInViewport(counter)) {
        counter.classList.add('animated');
        animateCounter(counter);
      }
    });
  });
});