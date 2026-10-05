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

  // --- 3. Dynamic Coming Soon Countdown Timer (Stops 31 Dec 2026) ---
  const heroCountdownContainer = document.getElementById('heroCountdownContainer');
  if (heroCountdownContainer) {
    // Inject the Minimal 4-Box Countdown Component dynamically into Hero Section via JS
    heroCountdownContainer.innerHTML = `
      <div class="countdown-minimal-widget">
        <div class="countdown-unit-box">
          <div class="unit-number-frame">
            <span class="unit-number" id="cdDays">00</span>
          </div>
          <span class="unit-text">DAYS</span>
        </div>

        <div class="countdown-colon">:</div>

        <div class="countdown-unit-box">
          <div class="unit-number-frame">
            <span class="unit-number" id="cdHours">00</span>
          </div>
          <span class="unit-text">HOURS</span>
        </div>

        <div class="countdown-colon">:</div>

        <div class="countdown-unit-box">
          <div class="unit-number-frame">
            <span class="unit-number" id="cdMins">00</span>
          </div>
          <span class="unit-text">MINS</span>
        </div>

        <div class="countdown-colon">:</div>

        <div class="countdown-unit-box">
          <div class="unit-number-frame">
            <span class="unit-number" id="cdSecs">00</span>
          </div>
          <span class="unit-text">SECS</span>
        </div>
      </div>
    `;

    // Target Date: 31 December 2026 at 23:59:59 (Year: 2026, Month: 11 for December, Date: 31)
    const targetDate = new Date(2026, 11, 31, 23, 59, 59).getTime();

    const daysEl = document.getElementById('cdDays');
    const hoursEl = document.getElementById('cdHours');
    const minsEl = document.getElementById('cdMins');
    const secsEl = document.getElementById('cdSecs');

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        // Stop timer when 31 Dec 2026 is reached
        if (daysEl) daysEl.textContent = '00';
        if (hoursEl) hoursEl.textContent = '00';
        if (minsEl) minsEl.textContent = '00';
        if (secsEl) secsEl.textContent = '00';

        const titleEl = heroCountdownContainer.querySelector('.countdown-title');
        if (titleEl) titleEl.textContent = '🎉 WE ARE NOW LIVE! ORDER DELICIOUS FOOD NOW';
        clearInterval(countdownInterval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
      if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Notify Form Submission
    const notifyForm = document.getElementById('notifyForm');
    const notifyEmailInput = document.getElementById('notifyEmailInput');
    if (notifyForm) {
      notifyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = notifyEmailInput.value.trim();
        if (!email || !email.includes('@')) {
          showToast('Please enter a valid email address!', 'warning');
          return;
        }
        showToast(`🎉 You're on the list (${email})! 50% discount reserved for launch.`, 'success');
        notifyEmailInput.value = '';
      });
    }

    // Connect Nav Search button to focus the notification input
    const navSearchTrigger = document.getElementById('navSearchTrigger');
    if (navSearchTrigger) {
      navSearchTrigger.addEventListener('click', () => {
        if (notifyEmailInput) {
          notifyEmailInput.focus();
          notifyEmailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    }
  }

  // --- 4. Category Cards Click Feedback ---
  const categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach((card) => {
    card.addEventListener('click', () => {
      const catName = card.querySelector('.cat-title')?.textContent || 'Food';
      showToast(`Delicious ${catName} ordering will be live soon! Countdown active above.`, 'info');
      
      const cdSection = document.getElementById('heroCountdownContainer');
      if (cdSection) {
        cdSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  // --- 5. Partner Section Registration & Card Feedback ---
  const partnerActionBtn = document.getElementById('partnerActionBtn');
  const partnerRegisterBtn = document.getElementById('partnerRegisterBtn');

  const handlePartnerRegister = (e) => {
    if (e) e.preventDefault();
    showToast('🎉 Partner onboarding registration is opening soon! Partner Hotline: +880 1700-000000', 'success');
  };

  if (partnerActionBtn) {
    partnerActionBtn.addEventListener('click', handlePartnerRegister);
  }
  if (partnerRegisterBtn) {
    partnerRegisterBtn.addEventListener('click', handlePartnerRegister);
  }

  const partnerCardItems = document.querySelectorAll('.partner-card-item');
  partnerCardItems.forEach((card) => {
    card.addEventListener('click', () => {
      const name = card.getAttribute('data-partner') || 'Restaurant';
      showToast(`✨ ${name} will be available on FoodPao upon official launch!`, 'info');
    });
  });

  // --- 6. How It Works "Coming Soon" Button Feedback ---
  const howItWorksCtaBtn = document.getElementById('howItWorksCtaBtn');
  if (howItWorksCtaBtn) {
    howItWorksCtaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('🚀 Online ordering launches on 31 Dec 2026! Reserve your 50% discount above.', 'info');
      const cdSection = document.getElementById('heroCountdownContainer');
      if (cdSection) {
        cdSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

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
