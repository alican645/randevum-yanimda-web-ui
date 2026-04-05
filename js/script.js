// Initialize Lucide icons
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

// Navbar scroll effect
const navbar = document.getElementById('siteNavbar');
if (navbar) {
    window.addEventListener('scroll', function () {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
        const isOpen = navMenu.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen);
    });
}

// Close mobile menu on link click
document.querySelectorAll('.navbar-nav-links a, .nav-dropdown-menu a').forEach(function (link) {
    link.addEventListener('click', function () {
        if (navMenu) navMenu.classList.remove('open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        // Close dropdown too
        document.querySelectorAll('.nav-dropdown').forEach(function (dd) {
            dd.classList.remove('open');
            const trigger = dd.querySelector('.nav-dropdown-trigger');
            if (trigger) trigger.setAttribute('aria-expanded', 'false');
        });
    });
});

// Dropdown toggle
document.querySelectorAll('.nav-dropdown-trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        var dropdown = trigger.closest('.nav-dropdown');
        var isOpen = dropdown.classList.toggle('open');
        trigger.setAttribute('aria-expanded', isOpen);
    });
});

// Close dropdown on outside click
document.addEventListener('click', function (e) {
    document.querySelectorAll('.nav-dropdown').forEach(function (dd) {
        if (!dd.contains(e.target)) {
            dd.classList.remove('open');
            const trigger = dd.querySelector('.nav-dropdown-trigger');
            if (trigger) trigger.setAttribute('aria-expanded', 'false');
        }
    });
});

// Active link on scroll (IntersectionObserver)
const sections = document.querySelectorAll('[data-nav-section]');
const navLinks = document.querySelectorAll('.navbar-nav-links a[data-section], .nav-dropdown-menu a[data-section]');
const mobileDropdownTrigger = document.querySelector('#mobileDropdown .nav-dropdown-trigger');

if (sections.length > 0) {
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('data-nav-section');
                navLinks.forEach(function (link) {
                    link.classList.toggle('active', link.getAttribute('data-section') === id);
                });
                // Highlight dropdown trigger when a mobile section is active
                if (mobileDropdownTrigger) {
                    var isMobileSection = (id === 'mobile-customer' || id === 'mobile-business');
                    mobileDropdownTrigger.classList.toggle('active', isMobileSection);
                }
            }
        });
    }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });

    sections.forEach(function (section) {
        observer.observe(section);
    });
}
