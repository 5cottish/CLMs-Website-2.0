/**
 * forms.js - Form handling and validation for CLM Website
 */

document.addEventListener('DOMContentLoaded', function() {
  // Contact Form Handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('contactName')?.value.trim();
      const email = document.getElementById('contactEmail')?.value.trim();
      const subject = document.getElementById('contactSubject')?.value.trim();
      const message = document.getElementById('contactMessage')?.value.trim();
      const messageDiv = document.getElementById('contactFormMessage');
      
      // Validation
      if (!name || !email || !subject || !message) {
        showMessage(messageDiv, 'Please fill in all required fields.', 'error');
        return;
      }
      
      if (!validateEmail(email)) {
        showMessage(messageDiv, 'Please enter a valid email address.', 'error');
        return;
      }
      
      // Simulate form submission (replace with actual API call)
      showMessage(messageDiv, 'Sending message...', 'info');
      
      setTimeout(() => {
        showMessage(messageDiv, 'Thank you for your message! We will get back to you soon.', 'success');
        contactForm.reset();
      }, 1500);
    });
  }
  
  // Volunteer Form Handler
  const volunteerForm = document.getElementById('volunteerForm');
  if (volunteerForm) {
    volunteerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('volName')?.value.trim();
      const email = document.getElementById('volEmail')?.value.trim();
      const messageDiv = document.getElementById('volunteerFormMessage');
      
      if (!name || !email) {
        showMessage(messageDiv, 'Please provide your name and email address.', 'error');
        return;
      }
      
      if (!validateEmail(email)) {
        showMessage(messageDiv, 'Please enter a valid email address.', 'error');
        return;
      }
      
      showMessage(messageDiv, 'Submitting application...', 'info');
      
      setTimeout(() => {
        showMessage(messageDiv, 'Thank you for your interest in volunteering! We will contact you soon.', 'success');
        volunteerForm.reset();
      }, 1500);
    });
  }
  
  // Newsletter Signup (if present)
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = newsletterForm.querySelector('input[type="email"]')?.value.trim();
      const messageDiv = document.getElementById('newsletterMessage');
      
      if (!email || !validateEmail(email)) {
        showMessage(messageDiv, 'Please enter a valid email address.', 'error');
        return;
      }
      
      showMessage(messageDiv, 'Subscribing...', 'info');
      
      setTimeout(() => {
        showMessage(messageDiv, 'Successfully subscribed to our newsletter!', 'success');
        newsletterForm.reset();
      }, 1000);
    });
  }
});

// Helper Functions
function showMessage(element, message, type) {
  if (!element) return;
  
  element.innerHTML = `<p class="${type}-message">${message}</p>`;
  element.style.display = 'block';
  
  setTimeout(() => {
    element.style.display = 'none';
    element.innerHTML = '';
  }, 5000);
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^[0-9+\-\s()]{8,20}$/;
  return re.test(phone);
}