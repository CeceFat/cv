/* =========================================================================
   蔡宗穎 Camus Tsai — CV site
   ========================================================================= */
(function () {
    'use strict';

    /* ---------- Lucide icons ---------- */
    function renderIcons() {
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
            return true;
        }
        return false;
    }
    if (!renderIcons()) {
        // CDN may still be loading; retry a few times then give up quietly.
        var tries = 0;
        var timer = setInterval(function () {
            if (renderIcons() || ++tries > 20) clearInterval(timer);
        }, 150);
    }

    /* ---------- Current year ---------- */
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------- Mobile nav ---------- */
    var menuBtn = document.getElementById('menu-btn');
    var navLinks = document.getElementById('nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', function () {
            var open = navLinks.classList.toggle('open');
            menuBtn.setAttribute('aria-expanded', String(open));
            menuBtn.setAttribute('aria-label', open ? '關閉選單' : '開啟選單');
        });

        navLinks.addEventListener('click', function (e) {
            if (e.target.closest('a')) {
                navLinks.classList.remove('open');
                menuBtn.setAttribute('aria-expanded', 'false');
                menuBtn.setAttribute('aria-label', '開啟選單');
            }
        });
    }

    /* ---------- Logo / back-to-top: scroll to top without reloading, keep URL clean ---------- */
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.querySelectorAll('.logo, .back-to-top').forEach(function (el) {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
            if (location.hash) {
                history.replaceState(null, '', location.pathname + location.search);
            }
        });
    });

    /* ---------- Back to top ---------- */
    var backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        var onScroll = function () {
            backToTop.classList.toggle('visible', window.scrollY > 500);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ---------- Reveal sections on scroll ---------- */
    var revealTargets = document.querySelectorAll(
        '.section .section-title, .about-content, .expertise-card, .timeline-item, .sop-list li, .repo-card, .contact-card'
    );

    if ('IntersectionObserver' in window && revealTargets.length) {
        revealTargets.forEach(function (el) { el.classList.add('reveal'); });

        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        revealTargets.forEach(function (el) { io.observe(el); });
    }

    /* ---------- Live GitHub star counts (best effort, fails silently) ---------- */
    var repoCards = document.querySelectorAll('.repo-card[data-repo]');
    repoCards.forEach(function (card) {
        var name = card.getAttribute('data-repo');
        fetch('https://api.github.com/repos/CeceFat/' + name, {
            headers: { Accept: 'application/vnd.github+json' }
        })
            .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
            .then(function (data) {
                var count = data.stargazers_count;
                if (!count) return;                       // hide the badge at 0 stars
                var wrap = card.querySelector('.stars');
                var out = card.querySelector('.star-count');
                if (!wrap || !out) return;
                out.textContent = count;
                wrap.hidden = false;
                renderIcons();
            })
            .catch(function () { /* rate-limited or offline — badge stays hidden */ });
    });
})();
