document.addEventListener('DOMContentLoaded', function() {

    // 1. Smooth Scroll (Lenis)
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Hero Mouse-follow Glow Effect
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX: x, clientY: y } = e;
            const { offsetWidth: width, offsetHeight: height } = hero;
            const xPercent = (x / width) * 100;
            const yPercent = (y / height) * 100;
            hero.style.setProperty('--mouse-x', `${xPercent}%`);
            hero.style.setProperty('--mouse-y', `${yPercent}%`);
        });
    }

    // 3. ナビゲーションバーのスクロールエフェクト
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. TypeIt.jsによるタイピングアニメーション
    const typingText = document.getElementById('typing-text');
    if(typingText) {
        new TypeIt("#typing-text", {
            strings: "AIで、ビジネスの境界を超える。",
            speed: 120,
            waitUntilVisible: true,
            startDelay: 1200,
            cursor: true,
            cursorChar: "|",
            cursorSpeed: 1000,
            breakLines: false,
        }).go();
    }

    // 5. GSAP & ScrollTriggerによるスクロールリビールアニメーション
    gsap.registerPlugin(ScrollTrigger);
    
    // セクションタイトルを対象（光るアニメーション用）
    document.querySelectorAll('.section-title, .section-title-left').forEach((title) => {
        gsap.fromTo(title, { opacity: 0 }, {
            opacity: 1,
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                onEnter: () => title.classList.add('visible'),
                once: true
            }
        });
    });

    // カードなど、個別の要素を対象
    const animatedElements = document.querySelectorAll('.service-card, .work-item, .testimonial, .faq-item, .professional-image, .professional-text');
    animatedElements.forEach((el) => {
        gsap.fromTo(el,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                    once: true
                }
            }
        );
    });

    // 6. FAQアコーディオン
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            document.querySelectorAll('.faq-item.active').forEach(activeItem => {
                if (activeItem !== item) {
                    activeItem.classList.remove('active');
                    gsap.to(activeItem.querySelector('.faq-answer'), { height: 0, duration: 0.3, ease: 'power1.inOut' });
                }
            });

            if (!isActive) {
                item.classList.add('active');
                gsap.to(answer, { height: 'auto', duration: 0.4, ease: 'power1.inOut' });
            } else {
                item.classList.remove('active');
                gsap.to(answer, { height: 0, duration: 0.3, ease: 'power1.inOut' });
            }
        });
    });

    // 7. ハンバーガーメニュー
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

});
