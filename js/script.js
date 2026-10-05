/**
 * FoodPao - Interactive Vanilla JavaScript
 * Features: Mobile drawer, sticky nav, scrollspy, location search, modal auth,
 * favorites toggle, and dynamic toast alerts.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Sticky Navigation Bar & Header State ---
  const header = document.getElementById('main-header');
  const navLinks = document.querySelectorAll('.nav-link, .drawer-link');
  const sections = document.querySelectorAll('section[id], footer[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scrollspy to update active navigation item
    let currentSection = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = section.getAttribute('id');
      }
    });

    if (currentSection) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
          link.classList.add('active');
        }
      });
    }
  });

  // --- 2. Mobile Drawer Navigation ---
  const mobileToggleBtn = document.getElementById('mobileToggleBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  const openDrawer = () => {
    mobileDrawer.classList.add('active');
    drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove('active');
    drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // --- 3. Location Search Bar Interaction ---
  const heroSearchForm = document.getElementById('heroSearchForm');
  const locationInput = document.getElementById('locationInput');
  const navSearchTrigger = document.getElementById('navSearchTrigger');

  if (heroSearchForm) {
    heroSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = locationInput.value.trim();
      if (!val) {
        showToast('Please enter your delivery location!', 'warning');
        locationInput.focus();
        return;
      }

      showToast(`Finding top restaurants near "${val}"...`, 'success');
      
      // Smooth scroll to restaurants section
      const resSection = document.getElementById('restaurants');
      if (resSection) {
        resSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  if (navSearchTrigger) {
    navSearchTrigger.addEventListener('click', () => {
      locationInput.focus();
      locationInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      locationInput.select();
    });
  }

  // --- 4. Category Cards Click Feedback ---
  const categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach((card) => {
    card.addEventListener('click', () => {
      const catName = card.querySelector('.cat-title')?.textContent || 'Food';
      showToast(`Showing popular ${catName} spots near you!`, 'info');
      
      const resSection = document.getElementById('restaurants');
      if (resSection) {
        resSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- 5. Restaurant Favorite Buttons Toggle ---
  const favBtns = document.querySelectorAll('.res-fav-btn');
  favBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.classList.toggle('active');
      const resCard = btn.closest('.restaurant-card');
      const resName = resCard ? resCard.querySelector('.res-name').textContent : 'Restaurant';
      
      if (btn.classList.contains('active')) {
        showToast(`Added ${resName} to your favorites! ❤️`, 'success');
      } else {
        showToast(`Removed ${resName} from favorites.`, 'info');
      }
    });
  });

  // --- 6. Restaurant Cards Click ---
  const restaurantCards = document.querySelectorAll('.restaurant-card');
  restaurantCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.res-fav-btn')) return;
      const resName = card.querySelector('.res-name')?.textContent || 'Restaurant';
      showToast(`Opening ${resName} menu...`, 'info');
    });
  });

  // --- 7. Login / Sign Up Modal Handling ---
  const authModalBackdrop = document.getElementById('authModalBackdrop');
  const openAuthModalBtn = document.getElementById('openAuthModalBtn');
  const drawerAuthBtn = document.getElementById('drawerAuthBtn');
  const closeAuthModalBtn = document.getElementById('closeAuthModalBtn');
  const loginTabBtn = document.getElementById('loginTabBtn');
  const signupTabBtn = document.getElementById('signupTabBtn');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');

  const openAuthModal = () => {
    authModalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    closeDrawer();
  };

  const closeAuthModal = () => {
    authModalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (openAuthModalBtn) openAuthModalBtn.addEventListener('click', openAuthModal);
  if (drawerAuthBtn) drawerAuthBtn.addEventListener('click', openAuthModal);
  if (closeAuthModalBtn) closeAuthModalBtn.addEventListener('click', closeAuthModal);

  if (authModalBackdrop) {
    authModalBackdrop.addEventListener('click', (e) => {
      if (e.target === authModalBackdrop) {
        closeAuthModal();
      }
    });
  }

  // Modal Tab Switching
  if (loginTabBtn && signupTabBtn) {
    loginTabBtn.addEventListener('click', () => {
      loginTabBtn.classList.add('active');
      signupTabBtn.classList.remove('active');
      loginForm.style.display = 'flex';
      signupForm.style.display = 'none';
    });

    signupTabBtn.addEventListener('click', () => {
      signupTabBtn.classList.add('active');
      loginTabBtn.classList.remove('active');
      signupForm.style.display = 'flex';
      loginForm.style.display = 'none';
    });
  }

  // Form Submissions in Modal
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Welcome back to FoodPao! Logged in successfully.', 'success');
      closeAuthModal();
    });
  }

  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Account created! Welcome to FoodPao family.', 'success');
      closeAuthModal();
    });
  }

  // Global Escape key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAuthModal();
      closeDrawer();
    }
  });

  // --- 8. App Store Links Interaction ---
  const storeBtns = document.querySelectorAll('.store-btn');
  storeBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const storeName = btn.querySelector('.store-main')?.textContent || 'App Store';
      showToast(`Redirecting to download on ${storeName}...`, 'info');
    });
  });

  // --- 9. Toast Notification System ---
  function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3200);
  }
});
