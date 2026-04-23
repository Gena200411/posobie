AOS.init({
  once: true,
  duration: 800,
  offset: 100
});

let currentTheme = null;

function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }
  currentTheme = theme;
  sessionStorage.setItem('theme', theme);
}

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function initTheme() {
  const sessionTheme = sessionStorage.getItem('theme');
  if (sessionTheme) {
    applyTheme(sessionTheme);
  } else {
    applyTheme(getSystemTheme());
  }
}

function toggleTheme() {
  const newTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
  applyTheme(newTheme);
}

function watchSystemThemeChange() {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!sessionStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

function hidePreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('fade-out');
    setTimeout(function() {
      preloader.style.display = 'none';
    }, 500);
  }
}

function scrollFunction() {
  const btn = document.getElementById('scrollTopBtn');
  if (btn) {
    btn.style.display = window.scrollY > 200 ? 'block' : 'none';
  }
}

function scrollToTop() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}

function navbarBackground() {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
}

window.addEventListener('scroll', function() {
  scrollFunction();
  navbarBackground();
});

document.addEventListener('DOMContentLoaded', function() {
  const anchors = document.querySelectorAll('#navbar a[href^="#"]');
  anchors.forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#' && targetId !== '#navbar') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const navbar = document.getElementById('navbar');
          const navbarHeight = navbar ? navbar.offsetHeight : 70;
          window.scrollTo({top: targetElement.offsetTop - navbarHeight - 10, behavior: 'smooth'});
        }
      }
    });
  });
});

function showSeries(manufacturer) {
  const modal = document.getElementById(manufacturer + 'Modal');
  if (modal) modal.style.display = 'block';
}

function closeModal(manufacturer) {
  const modal = document.getElementById(manufacturer + 'Modal');
  if (modal) modal.style.display = 'none';
}

window.onclick = function(event) {
  const modals = ['intelModal', 'amdModal', 'russianModal'];
  modals.forEach(function(modalId) {
    const modal = document.getElementById(modalId);
    if (event.target === modal) modal.style.display = 'none';
  });
};

document.addEventListener('DOMContentLoaded', function() {
  initTheme();
  watchSystemThemeChange();
});

window.addEventListener('load', function() {
  hidePreloader();
});