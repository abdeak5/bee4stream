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
    initRevealAnimations();
    initSmoothScroll();
    fetchMatches();
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

        // Check for Live Page Settings
        try {
            const settingsResponse = await fetch('data/live_settings.json');
            if (settingsResponse.ok) {
                const settings = await settingsResponse.json();
                const liveBtn = document.getElementById('live-cta');
                if (settings.live_page_enabled === false) {
                    if (liveBtn) liveBtn.style.display = 'none';
                    // If on live page and disabled, redirect (optional)
                    if (window.location.pathname.includes('live.html')) {
                        window.location.href = 'index.html';
                    }
                }
            }
        } catch (e) {
            console.error('Error loading settings:', e);
        }

    } catch (error) {
        console.error('Error loading content:', error);
    }
}

/* ===================================
   Fetch and Render Matches
   =================================== */
async function fetchMatches() {
    try {
        const response = await fetch('data/matches.json');
        if (!response.ok) throw new Error('Failed to load matches');
        const data = await response.json();
        const matchesContainer = document.getElementById('matches-container');
        if (!matchesContainer) return;

        // Ensure data.matches is an array
        const matches = data.matches || [];
        window.matchesData = matches; // Cache for openPlayer usage

        // Clear existing content
        matchesContainer.innerHTML = '';

        if (matches.length === 0) {
            matchesContainer.innerHTML = '<p class="text-center text-slate-400 col-span-full">لا توجد مباريات مباشرة حالياً</p>';
            return;
        }

        matches.forEach((match, index) => {
            // Basic Validation
            if (!match.is_active) return;

            const isLive = isMatchLive(match.match_time);
            const timeString = new Date(match.match_time).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });

            const card = document.createElement('div');
            card.className = 'match-card reveal-up';
            card.style.animationDelay = `${0.1 * index}s`;

            card.innerHTML = `
                <div class="match-time-badge ${isLive ? 'match-status-live' : 'match-status-upcoming'}">
                    ${isLive ? '<span class="live-dot"></span> مباشر' : '<i data-lucide="calendar" class="w-3 h-3"></i> قريباً'}
                </div>

                <div class="teams-container">
                    <div class="team-info">
                        <img src="${match.team_a_logo}" alt="${match.team_a_name}" class="team-logo">
                        <span class="team-name">${match.team_a_name}</span>
                    </div>

                    <div class="vs-badge">VS</div>

                    <div class="team-info">
                        <img src="${match.team_b_logo}" alt="${match.team_b_name}" class="team-logo">
                        <span class="team-name">${match.team_b_name}</span>
                    </div>
                </div>

                <div class="match-time" dir="ltr">
                    <i data-lucide="clock" class="w-4 h-4 text-purple-500"></i>
                    <span>${timeString}</span>
                </div>

                <button class="btn-watch" onclick="openPlayer(${index})">
                    <i data-lucide="play-circle" class="w-5 h-5"></i>
                    <span>مشاهدة المباراة</span>
                </button>
             `;

            matchesContainer.appendChild(card);
        });

        lucide.createIcons();

    } catch (error) {
        console.error('Error fetching matches:', error);
    }
}

// Helper to check if match is approximately live (simple logic: within 2 hours of start)
function isMatchLive(matchTimeStr) {
    if (!matchTimeStr) return false;
    const matchTime = new Date(matchTimeStr).getTime();
    const now = new Date().getTime();
    const diff = now - matchTime;
    // Considered live if started in the last 120 minutes or starts in next 10 minutes
    return diff > -600000 && diff < 120 * 60000;
}

// Open Player Modal
window.openPlayer = function (index) {
    // 1. Get Match Data
    const matchesData = window.matchesData || []; // cached from fetchMatches
    const match = matchesData[index];
    if (!match) return;

    window.currentStreamUrl = match.stream_url;
    const modal = document.getElementById('player-modal');
    const playerElement = document.getElementById('player');

    // 2. Overlay Elements
    const logoOverlay = document.getElementById('channel-logo');
    const tickerOverlay = document.getElementById('news-ticker-bar');
    const adOverlay = document.getElementById('ad-overlay');
    const playerContainer = document.querySelector('.aspect-video'); // contains video

    if (modal) {
        modal.classList.remove('hidden');
        // Force reflow
        void modal.offsetWidth;
        modal.classList.add('active');

        // --- 3. LOGIC ---

        // A. Channel Logo
        if (match.channel_logo && logoOverlay) {
            logoOverlay.querySelector('img').src = match.channel_logo;
            logoOverlay.classList.remove('hidden');
        } else if (logoOverlay) {
            logoOverlay.classList.add('hidden');
        }

        // B. News Ticker
        if (match.news_ticker && tickerOverlay) {
            document.getElementById('ticker-text').textContent = match.news_ticker;
            tickerOverlay.classList.remove('hidden');
        } else if (tickerOverlay) {
            tickerOverlay.classList.add('hidden');
        }

        // C. Ad Break Mode
        if (match.ad_active && adOverlay) {
            // Show Ad Overlay
            adOverlay.classList.remove('hidden');
            // Hide Player (optional, or just cover it)
            // playerContainer.classList.add('opacity-0'); 

            // Set Ad Text
            const adText = document.getElementById('ad-text');
            if (adText) adText.innerHTML = match.ad_text || 'نتوقف لإعلان قصير...';

            // Note: We do NOT init player if ad is active to save bandwidth/confusion
            if (window.player) {
                window.player.destroy();
                window.player = null;
            }

        } else {
            // Show Player Mode
            if (adOverlay) adOverlay.classList.add('hidden');
            // playerContainer.classList.remove('opacity-0');

            initPlyr(playerElement, match.stream_url);
        }
    }
};

// Close Player Modal
window.closePlayer = function () {
    const modal = document.getElementById('player-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.classList.add('hidden');
            if (window.player) {
                window.player.destroy();
                window.player = null;
            }
            if (window.hls) {
                window.hls.destroy();
                window.hls = null;
            }
        }, 300); // Wait for transition
    }
};

// Reload Stream (Error Recovery)
window.reloadPlayer = function () {
    if (window.currentStreamUrl) {
        if (window.player) {
            window.player.destroy();
            window.player = null;
        }
        if (window.hls) {
            window.hls.destroy();
            window.hls = null;
        }

        const playerElement = document.getElementById('player');
        // Show loader
        const loader = document.getElementById('player-loader');
        if (loader) loader.classList.remove('hidden');

        setTimeout(() => {
            initPlyr(playerElement, window.currentStreamUrl);
            if (loader) loader.classList.add('hidden');
        }, 500);
    }
}

function initPlyr(videoElement, source) {
    // Determine HLS config based on user agent (optional)
    const hlsConfig = {
        enableWorker: true,
        lowLatencyMode: true,
    };

    if (Hls.isSupported()) {
        const hls = new Hls(hlsConfig);
        hls.loadSource(source);
        hls.attachMedia(videoElement);
        window.hls = hls;

        // Error Handling
        hls.on(Hls.Events.ERROR, function (event, data) {
            if (data.fatal) {
                switch (data.type) {
                    case Hls.ErrorTypes.NETWORK_ERROR:
                        // try to recover network error
                        console.log('fatal network error encountered, try to recover');
                        hls.startLoad();
                        break;
                    case Hls.ErrorTypes.MEDIA_ERROR:
                        console.log('fatal media error encountered, try to recover');
                        hls.recoverMediaError();
                        break;
                    default:
                        // cannot recover
                        hls.destroy();
                        break;
                }
            }
        });
    } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS support (Safari)
        videoElement.src = source;
    }

    window.player = new Plyr(videoElement, {
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
        settings: ['quality', 'speed'],
        autoplay: true
    });
}

