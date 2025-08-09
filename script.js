document.addEventListener('DOMContentLoaded', () => {

    // Smooth scroll for anchor links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const headerOffset = document.getElementById('header').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile navbar after click
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                            toggle: false
                        });
                        bsCollapse.hide();
                    }
                }
            }
        });
    });

    // Header Scroll Effect
    const header = document.getElementById('header');
    let lastScrollTop = 0;
    const scrollThreshold = header.offsetHeight;

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
            // Scrolling down, hide header
            header.style.top = `-${header.offsetHeight}px`;
        } else {
            // Scrolling up, show header
            header.style.top = '0';
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Testimonials Slider (Swiper)
    new Swiper('.testimonials-slider', {
        speed: 600,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
            el: '.testimonials-pagination',
            type: 'bullets',
            clickable: true
        },
        navigation: {
            nextEl: '.testimonials-nav-next',
            prevEl: '.testimonials-nav-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 20
            }
        }
    });

    // Portfolio Slider
    new Swiper('.portfolio-slider', {
        speed: 800,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: '.portfolio-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.portfolio-nav-next',
            prevEl: '.portfolio-nav-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            }
        }
    });

    // ScrollReveal Animations
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200,
        easing: 'ease-out',
        // reset: true // Uncomment to repeat animation on scroll
    });

    sr.reveal('.reveal-up');
    sr.reveal('.reveal-down', { origin: 'top' });
    sr.reveal('.reveal-left', { origin: 'left' });
    sr.reveal('.reveal-right', { origin: 'right' });

    // Apply staggered delay to elements with data-delay attribute
    const delayedElements = document.querySelectorAll('[style*="--delay"]');
    delayedElements.forEach(el => {
        const delayValue = getComputedStyle(el).getPropertyValue('--delay');
        sr.reveal(el, { delay: parseFloat(delayValue) * 1000 + 200 });
    });

    // Plan Modal Logic
    const planModal = document.getElementById('planModal');
    if (planModal) {
        planModal.addEventListener('show.bs.modal', function(event) {
            const card = event.relatedTarget;
            
            const planName = card.getAttribute('data-plan-name');
            const planPrice = card.getAttribute('data-plan-price');
            const planSub = card.getAttribute('data-plan-sub');
            const planFeatures = JSON.parse(card.getAttribute('data-plan-features'));

            const modalTitle = planModal.querySelector('.modal-title');
            const modalPrice = planModal.querySelector('#planModalPrice');
            const modalSub = planModal.querySelector('#planModalSub');
            const modalFeaturesList = planModal.querySelector('#planModalFeatures');
            
            modalTitle.textContent = planName;
            modalPrice.innerHTML = planPrice;
            modalSub.textContent = planSub;

            modalFeaturesList.innerHTML = ''; // Clear previous features
            planFeatures.forEach(feature => {
                const li = document.createElement('li');
                const iconClass = feature.included ? 'fa-check-circle text-success' : 'fa-times-circle text-muted';
                li.innerHTML = `<i class="fas ${iconClass} me-2"></i>${feature.item}`;
                modalFeaturesList.appendChild(li);
            });
        });
    }

});