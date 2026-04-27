/**
 * main.js - Core functionality for CLM Website
 */

// ===== DOM Elements =====
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mainNav = document.getElementById('mainNav');
  
  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (mainNav && mainNav.classList.contains('active')) {
      if (!mainNav.contains(event.target) && !mobileToggle.contains(event.target)) {
        mainNav.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    }
  });
  
  // Active Navigation Highlighting
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-list a');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    } else if (currentPage === '' && linkPage === 'index.html') {
      link.classList.add('active');
    }
  });
  
  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
  
  // Scroll Header Effect
  const header = document.querySelector('.site-header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    if (currentScroll > lastScroll && currentScroll > 200) {
      header.classList.add('header-hidden');
    } else {
      header.classList.remove('header-hidden');
    }
    
    lastScroll = currentScroll;
  });
});

// ===== Utility Functions =====
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^[0-9+\-\s()]{8,20}$/;
  return re.test(phone);
}

// ===== Scroll Reveal Observer =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal, .stagger-children').forEach(el => {
  revealObserver.observe(el);
});

// ===== Back to Top Button =====
const backToTop = document.createElement('button');
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTop.className = 'back-to-top';
backToTop.setAttribute('aria-label', 'Back to Top');
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Add CSS for Back to Top Button
const style = document.createElement('style');
style.textContent = `
  .back-to-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--clm-primary, #1a4d8c);
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
  
  .back-to-top.visible {
    opacity: 1;
    visibility: visible;
  }
  
  .back-to-top:hover {
    background: var(--clm-primary-dark, #0e3a6b);
    transform: translateY(-3px);
  }
  
  .scrolled {
    box-shadow: var(--shadow-md, 0 4px 6px rgba(0,0,0,0.07));
  }
  
  .header-hidden {
    transform: translateY(-100%);
    transition: transform 0.3s ease;
  }
  
  .menu-open {
    overflow: hidden;
  }
`;
document.head.appendChild(style);