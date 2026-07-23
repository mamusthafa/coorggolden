document.addEventListener('DOMContentLoaded', function() {
    // Dynamic Mobile Navigation Hamburger Menu Injection
    const headerContainer = document.querySelector('header .container');
    const nav = document.querySelector('nav');
    const navList = document.querySelector('nav ul');
    
    if (headerContainer && navList && nav) {
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.setAttribute('aria-label', 'Toggle menu');
        headerContainer.insertBefore(mobileMenuBtn, nav);
        
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent click from bubbling to document listener
            navList.classList.toggle('active');
            if (navList.classList.contains('active')) {
                mobileMenuBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
            } else {
                mobileMenuBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
            }
        });
        
        // Close menu when clicking outside (nav panel or button)
        document.addEventListener('click', function(e) {
            if (!e.target.closest('nav') && !e.target.closest('.mobile-menu-btn')) {
                navList.classList.remove('active');
                mobileMenuBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
            }
        });

        // Close menu when a link is clicked (useful for single-page hashes)
        const navLinks = navList.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                mobileMenuBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
            });
        });
    }
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        // Add dropdown arrow if not already present
        if (!question.querySelector('.arrow-icon')) {
            const arrow = document.createElement('span');
            arrow.className = 'arrow-icon';
            arrow.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
            question.appendChild(arrow);
        }
        
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            faqItem.classList.toggle('active');
            
            // Close other open items
            faqQuestions.forEach(q => {
                if (q !== question) {
                    q.parentElement.classList.remove('active');
                }
            });
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add current year to footer copyright
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = `&copy; ${currentYear} Coorg Golden Holidays. All rights reserved.`;
    }
    
    // Active Navigation Highlight
    const currentLocation = window.location.pathname;
    const pageName = currentLocation.split('/').pop() || 'index.html';
    const menuItems = document.querySelectorAll('nav ul li a');
    
    menuItems.forEach(item => {
        const itemPage = item.getAttribute('href');
        if (itemPage === pageName || (pageName === '' && itemPage === 'index.html')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Glassmorphic header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.75rem 0';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.05)';
        } else {
            header.style.padding = '1.25rem 0';
            header.style.background = 'rgba(255, 255, 255, 0.85)';
            header.style.boxShadow = 'none';
        }
    });
});
