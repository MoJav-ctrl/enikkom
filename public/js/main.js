// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('open');
      });
    }
  
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    if (tabButtons.length) {
      tabButtons.forEach(button => {
        button.addEventListener('click', function() {
          // Remove active class from all buttons and contents
          document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('border-b-2', 'border-enikkom-btn', 'text-enikkom-bg');
            btn.classList.add('text-gray-500');
          });
          
          document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
            content.classList.add('hidden');
          });
          
          // Add active class to clicked button and corresponding content
          this.classList.remove('text-gray-500');
          this.classList.add('border-b-2', 'border-enikkom-btn', 'text-enikkom-bg');
          
          const tabId = this.getAttribute('data-tab');
          document.getElementById(tabId).classList.remove('hidden');
          document.getElementById(tabId).classList.add('active');
        });
      });
    }
  
    // Enquiry form submission
    const enquiryForm = document.getElementById('enquiry-form');
    if (enquiryForm) {
      enquiryForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = {
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          phone: document.getElementById('phone').value,
          message: document.getElementById('message').value
        };
        
        const messageElement = document.getElementById('form-message');
        
        try {
          const response = await fetch('/enquiries', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
          });
          
          const result = await response.json();
          
          if (response.ok) {
            messageElement.textContent = 'Thank you! Your enquiry has been submitted.';
            messageElement.classList.remove('hidden', 'text-red-600');
            messageElement.classList.add('text-green-600');
            enquiryForm.reset();
          } else {
            throw new Error(result.message || 'Submission failed');
          }
        } catch (error) {
          messageElement.textContent = error.message;
          messageElement.classList.remove('hidden', 'text-green-600');
          messageElement.classList.add('text-red-600');
        } finally {
          messageElement.classList.remove('hidden');
        }
      });
    }
  });
  