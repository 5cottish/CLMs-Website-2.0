/**
 * animations.js - Scroll animations and interactive effects
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize scroll reveal for elements with .reveal class
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  revealElements.forEach(el => revealObserver.observe(el));
  
  // Stagger children animation
  const staggerElements = document.querySelectorAll('.stagger-children');
  
  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        staggerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  staggerElements.forEach(el => staggerObserver.observe(el));
  
  // Parallax effect for hero section
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      hero.style.transform = `translateY(${scrolled * 0.4}px)`;
    });
  }
  
  // Animated counters for stats
  const counterElements = document.querySelectorAll('.stat-number[data-target]');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const target = parseInt(element.getAttribute('data-target'));
        animateCounter(element, target);
        counterObserver.unobserve(element);
      }
    });
  }, { threshold: 0.5 });
  
  counterElements.forEach(el => counterObserver.observe(el));
  
  function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current).toLocaleString();
      }
    }, stepTime);
  }
  
  // Hover animations for cards
  const cards = document.querySelectorAll('.program-card, .leader-card, .story-card, .involve-card, .stat-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
  });
  
  // Typing animation for hero text (optional)
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle && heroTitle.getAttribute('data-typed')) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    }
    
    typeWriter();
  }
  
  // Smooth reveal for images on scroll
  const images = document.querySelectorAll('.about-image img, .leader-image img, .story-image img');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'scale(1)';
        imageObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  images.forEach(img => {
    img.style.opacity = '0';
    img.style.transform = 'scale(0.95)';
    img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    imageObserver.observe(img);
  });
});