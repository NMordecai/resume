document.addEventListener('DOMContentLoaded', () => { // This function handles the opening and closing of the mobile navigation menu.
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  menuToggle.addEventListener('click', () => {
    // Toggles the 'show' and 'active' class on the navigation links container to display/hide it.
    navLinks.classList.toggle('show');
    menuToggle.classList.toggle('active');
  });

 // This uses the Intersection Observer API to highlight the nav link corresponding to the section in view.
  const sections = document.querySelectorAll('section');
  const navLi = document.querySelectorAll('#nav-links li a');

  const observerOptions = {
    root: null, 
    rootMargin: '0px',
    threshold: 0.6 
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // this will Remove 'active' class from all nav links
        navLi.forEach(link => link.classList.remove('active'));
        
        // and this will Add 'active' class to the corresponding nav link
        const activeLink = document.querySelector(`#nav-links li a[href="#${entry.target.id}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); 

    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const message = this.message.value.trim();

    //this helps the user to Clear previous status messages
    formStatus.textContent = '';
    formStatus.style.color = '';

    if (!name || !email || !message) {
      formStatus.textContent = 'Please fill in all fields.';
      formStatus.style.color = 'red';
      return;
    }

    // email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        formStatus.textContent = 'Please enter a valid email address.';
        formStatus.style.color = 'red';
        return;
    }

    formStatus.textContent = 'Sending...';
    formStatus.style.color = 'green';

    setTimeout(() => {
      formStatus.textContent = 'Message sent successfully!';
      contactForm.reset(); 
      setTimeout(() => formStatus.textContent = '', 3000);
    }, 1500);
  });
});