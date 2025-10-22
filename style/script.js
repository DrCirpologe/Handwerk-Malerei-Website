/**
 * WIENER MEISTER MALEREI - MODERN JAVASCRIPT
 * Ultra-modern, performance-optimized interactions
 */

class ModernWebsite {
  constructor() {
    this.navbar = document.getElementById('navbar');
    this.mobileMenuToggle = document.getElementById('mobileMenuToggle');
    this.mobileMenu = document.getElementById('mobileMenu');
    this.isMenuOpen = false;
    this.lastScrollY = 0;
    this.ticking = false;
    
    this.init();
  }
  
  init() {
    this.setupScrollEffects();
    this.setupMobileMenu();
    this.setupSmoothScrolling();
    this.setupAnimationObserver();
    this.setupPerformanceOptimizations();
  }
  
  /**
   * Modern scroll effects with requestAnimationFrame optimization
   */
  setupScrollEffects() {
    const updateScroll = () => {
      const scrollY = window.pageYOffset;
      
      // Navbar background effect
      if (scrollY > 50) {
        this.navbar?.classList.add('scrolled');
      } else {
        this.navbar?.classList.remove('scrolled');
      }
      
      // Parallax effects for hero video
      const heroVideo = document.querySelector('.hero-video-modern');
      if (heroVideo && scrollY < window.innerHeight) {
        const parallaxSpeed = scrollY * 0.5;
        heroVideo.style.transform = `translate(-50%, calc(-50% + ${parallaxSpeed}px))`;
      }
      
      this.lastScrollY = scrollY;
      this.ticking = false;
    };
    
    const onScroll = () => {
      if (!this.ticking) {
        requestAnimationFrame(updateScroll);
        this.ticking = true;
      }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
  }
  
  /**
   * Mobile menu with smooth animations
   */
  setupMobileMenu() {
    if (!this.mobileMenuToggle || !this.mobileMenu) return;
    
    this.mobileMenuToggle.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleMobileMenu();
    });
    
    // Close menu when clicking links
    const menuLinks = this.mobileMenu.querySelectorAll('.mobile-menu-link');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    });
    
    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMobileMenu();
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isMenuOpen && 
          !this.mobileMenu.contains(e.target) && 
          !this.mobileMenuToggle.contains(e.target)) {
        this.closeMobileMenu();
      }
    });
  }
  
  toggleMobileMenu() {
    if (this.isMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }
  
  openMobileMenu() {
    this.isMenuOpen = true;
    this.mobileMenu.classList.add('active');
    this.mobileMenuToggle.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus management for accessibility
    const firstLink = this.mobileMenu.querySelector('.mobile-menu-link');
    if (firstLink) {
      setTimeout(() => firstLink.focus(), 100);
    }
  }
  
  closeMobileMenu() {
    this.isMenuOpen = false;
    this.mobileMenu.classList.remove('active');
    this.mobileMenuToggle.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  /**
   * Smooth scrolling for anchor links
   */
  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const offsetTop = target.offsetTop - 80; // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }
  
  /**
   * Intersection Observer for scroll animations
   */
  setupAnimationObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          
          // Stagger animations for child elements
          if (entry.target.classList.contains('stagger-animation')) {
            const children = entry.target.children;
            Array.from(children).forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('animate-fade-in-up');
              }, index * 150);
            });
          }
        }
      });
    }, observerOptions);
    
    // Observe elements that should animate
    document.querySelectorAll('.animate-fade-in-up, .stagger-animation').forEach(el => {
      observer.observe(el);
    });
  }
  
  /**
   * Performance optimizations
   */
  setupPerformanceOptimizations() {
    // Preload critical images
    this.preloadCriticalImages();
    
    // Lazy load non-critical images
    this.setupLazyLoading();
    
    // Optimize video loading
    this.optimizeVideoLoading();
  }
  
  preloadCriticalImages() {
    const criticalImages = [
      'image/pic1.jpg'
    ];
    
    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }
  
  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });
      
      document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }
  
  optimizeVideoLoading() {
    const video = document.querySelector('.hero-video-modern');
    if (video) {
      // Pause video when not visible to save resources
      const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Autoplay failed, which is okay
            });
          } else {
            video.pause();
          }
        });
      });
      
      videoObserver.observe(video);
    }
  }
}

/**
 * Advanced form handling
 */
class ModernFormHandler {
  constructor() {
    this.forms = document.querySelectorAll('form');
    this.init();
  }
  
  init() {
    this.forms.forEach(form => {
      this.setupFormValidation(form);
      this.setupFormSubmission(form);
    });
  }
  
  setupFormValidation(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });
  }
  
  validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'Dieses Feld ist erforderlich.';
    }
    
    // Email validation
    else if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
      }
    }
    
    // Phone validation
    else if (type === 'tel' && value) {
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
      if (!phoneRegex.test(value)) {
        isValid = false;
        errorMessage = 'Bitte geben Sie eine gültige Telefonnummer ein.';
      }
    }
    
    this.showFieldError(field, isValid ? '' : errorMessage);
    return isValid;
  }
  
  showFieldError(field, message) {
    this.clearFieldError(field);
    
    if (message) {
      field.classList.add('error');
      const errorDiv = document.createElement('div');
      errorDiv.className = 'field-error';
      errorDiv.textContent = message;
      field.parentNode.appendChild(errorDiv);
    }
  }
  
  clearFieldError(field) {
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }
  }
  
  setupFormSubmission(form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Validate all fields
      const inputs = form.querySelectorAll('input, textarea, select');
      let isFormValid = true;
      
      inputs.forEach(input => {
        if (!this.validateField(input)) {
          isFormValid = false;
        }
      });
      
      if (!isFormValid) {
        return;
      }
      
      // Show loading state
      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Wird gesendet...';
      submitButton.disabled = true;
      
      try {
        // Simulate form submission (replace with actual endpoint)
        await this.submitForm(form);
        this.showSuccessMessage(form);
        form.reset();
      } catch (error) {
        this.showErrorMessage(form, 'Fehler beim Senden. Bitte versuchen Sie es später erneut.');
      } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }
    });
  }
  
  async submitForm(form) {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  }
  
  showSuccessMessage(form) {
    const message = document.createElement('div');
    message.className = 'form-success';
    message.textContent = 'Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.';
    form.appendChild(message);
    
    setTimeout(() => message.remove(), 5000);
  }
  
  showErrorMessage(form, text) {
    const message = document.createElement('div');
    message.className = 'form-error';
    message.textContent = text;
    form.appendChild(message);
    
    setTimeout(() => message.remove(), 5000);
  }
}

/**
 * Performance monitoring
 */
class PerformanceMonitor {
  constructor() {
    this.init();
  }
  
  init() {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          this.logPerformanceMetrics();
        }, 0);
      });
    }
  }
  
  logPerformanceMetrics() {
    const perfData = performance.getEntriesByType('navigation')[0];
    
    if (perfData) {
      const metrics = {
        dns: perfData.domainLookupEnd - perfData.domainLookupStart,
        tcp: perfData.connectEnd - perfData.connectStart,
        request: perfData.responseStart - perfData.requestStart,
        response: perfData.responseEnd - perfData.responseStart,
        dom: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
        load: perfData.loadEventEnd - perfData.loadEventStart
      };
      
      console.log('Performance Metrics:', metrics);
    }
  }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ModernWebsite();
  new ModernFormHandler();
  new PerformanceMonitor();
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}