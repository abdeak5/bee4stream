/* ===================================
   Be4stream Landing Page Scripts
   With Dark Mode Support
   ===================================
*/

// تفعيل الأيقونات والوضع الداكن
document.addEventListener('DOMContentLoaded', function () {
    initDarkMode();
    fetchContent();
    lucide.createIcons();
    initMobileMenu();
    initNavbarScroll();
    initRevealAnimations();
    initSmoothScroll();
});

/* ===================================
   الوضع الداكن
   =================================== */
function initDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const body = document.body;

    // التحقق من الوضع المحفوظ أو تفضيل النظام
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        enableDarkMode();
    }

    // زر التبديل
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            if (body.classList.contains('dark')) {
                disableDarkMode();
            } else {
                enableDarkMode();
            }
            // إعادة تحميل الأيقونات
            lucide.createIcons();
        });
    }

    // الاستماع لتغيير تفضيل النظام
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
            lucide.createIcons();
        }
    });
}

function enableDarkMode() {
    document.body.classList.add('dark');
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
}

function disableDarkMode() {
    document.body.classList.remove('dark');
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
}

/* ===================================
   قائمة الموبايل
   =================================== */
function initMobileMenu() {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('active');

            // تغيير الأيقونة
            const icon = menuBtn.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });

        // إغلاق القائمة عند النقر على رابط
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function () {
                mobileMenu.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }
}

/* ===================================
   تأثير تمرير شريط التنقل
   =================================== */
function initNavbarScroll() {
    const nav = document.getElementById('navbar');

    if (nav) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                nav.style.height = '70px';
                nav.style.boxShadow = document.body.classList.contains('dark')
                    ? '0 10px 40px -10px rgba(0,0,0,0.3)'
                    : '0 10px 40px -10px rgba(0,0,0,0.05)';
            } else {
                nav.style.height = '80px';
                nav.style.boxShadow = 'none';
            }
        });
    }
}

/* ===================================
   تأثير الظهور التدريجي
   =================================== */
function initRevealAnimations() {
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
            }
        });
    }, {
        threshold: 0.1
    });

    const revealElements = document.querySelectorAll('.reveal-up');
    revealElements.forEach(function (el) {
        observer.observe(el);
    });
}

/* ===================================
   التمرير السلس
   =================================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function (link) {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // تجاهل الروابط الفارغة
            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ===================================
   تحميل الصور بشكل تدريجي (Lazy Loading Enhancement)
   =================================== */
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(function (img) {
        img.src = img.dataset.src;
    });
}

/* ===================================
   Fetch Content from JSON
   =================================== */
async function fetchContent() {
    try {
        const response = await fetch('data/content.json');
        if (!response.ok) throw new Error('Failed to load content');
        const data = await response.json();

        // Logo
        const logo = document.getElementById('main-logo');
        if (logo && data.logo) logo.src = data.logo;

        // Hero Title
        const heroTitle = document.getElementById('hero-title');
        if (heroTitle && data.hero_title) heroTitle.innerHTML = data.hero_title;

        // Hero Description
        const heroDesc = document.getElementById('hero-desc');
        if (heroDesc && data.hero_desc) heroDesc.textContent = data.hero_desc;

        // Buttons
        const playstore = document.getElementById('playstore-link');
        if (playstore && data.playstore_url) playstore.href = data.playstore_url;

        const tg = document.getElementById('tg-link');
        if (tg && data.telegram_url) tg.href = data.telegram_url;

        const apk = document.getElementById('apk-link');
        if (apk && data.apk_url) apk.href = data.apk_url;

        const web = document.getElementById('website-link');
        if (web && data.web_url) web.href = data.web_url;

        // Preview Images
        const img1 = document.getElementById('preview-img-1');
        if (img1 && data.preview_img_1) img1.src = data.preview_img_1;

        const img2 = document.getElementById('preview-img-2');
        if (img2 && data.preview_img_2) img2.src = data.preview_img_2;

        const img3 = document.getElementById('preview-img-3');
        if (img3 && data.preview_img_3) img3.src = data.preview_img_3;

        // Re-initialize icons to ensure any injected icons render (though we mostly changed attributes)
        lucide.createIcons();

    } catch (error) {
        console.error('Error loading content:', error);
    }
}
