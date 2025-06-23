// Sidebar toggle button
const sidebarToggleBtn = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('sidebar');

sidebarToggleBtn.addEventListener('click', () => {
  const expanded = sidebarToggleBtn.getAttribute('aria-expanded') === 'true';
  sidebarToggleBtn.setAttribute('aria-expanded', String(!expanded));
  sidebar.classList.toggle('active');
  if (!expanded) {
    sidebar.setAttribute('aria-hidden', 'false');
    // Focus first link inside sidebar for accessibility
    const firstLink = sidebar.querySelector('a');
    if (firstLink) firstLink.focus();
  } else {
    sidebar.setAttribute('aria-hidden', 'true');
    sidebarToggleBtn.focus();
  }
});

// Close sidebar on link click (mobile)
sidebar.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 1024) {
      sidebar.classList.remove('active');
      sidebarToggleBtn.setAttribute('aria-expanded', 'false');
      sidebar.setAttribute('aria-hidden', 'true');
    }
  });
});

// Trap focus inside sidebar when open (accessibility)
sidebar.addEventListener('keydown', e => {
  if (!sidebar.classList.contains('active')) return;
  const focusableEls = [...sidebar.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])')];
  if (focusableEls.length === 0) return;
  const first = focusableEls[0];
  const last = focusableEls[focusableEls.length - 1];
  if (e.key === 'Tab') {
    if (e.shiftKey) { // Shift + Tab
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else { // Tab
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }
});

// Keyboard shortcut: Ctrl+M toggles sidebar
document.addEventListener('keydown', e => {
  if (e.ctrlKey && (e.key === 'm' || e.key === 'M')) {
    e.preventDefault();
    sidebarToggleBtn.click();
  }
});

// Theme toggle button
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleIcon = themeToggleBtn.querySelector('span.material-icons');
const root = document.documentElement;

function setTheme(theme) {
  if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark');
    themeToggleBtn.setAttribute('aria-label', 'Ativar modo claro');
    themeToggleBtn.setAttribute('aria-pressed', 'true');
    themeToggleIcon.textContent = 'dark_mode';
  } else {
    root.setAttribute('data-theme', 'light');
    themeToggleBtn.setAttribute('aria-label', 'Ativar modo escuro');
    themeToggleBtn.setAttribute('aria-pressed', 'false');
    themeToggleIcon.textContent = 'light_mode';
  }
  localStorage.setItem('theme', theme);
}

themeToggleBtn.addEventListener('click', () => {
  const currentTheme = root.getAttribute('data-theme') || 'light';
  if (currentTheme === 'light') {
    setTheme('dark');
  } else {
    setTheme('light');
  }
});

// Initialize theme from localStorage or prefers-color-scheme
(function () {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
  } else {
    setTheme('light');
  }
})();
