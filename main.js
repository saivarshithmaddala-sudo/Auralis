/**
 * Auralis Solutions - Interaction Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Scroll Reveal Logic
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;

        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;

            if (revealTop < triggerBottom) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Header Scroll Effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple Counter Animation for Metrics
    const metrics = document.querySelectorAll('.metric-item h3');
    let animated = false;

    const animateCounters = () => {
        if (animated) return;
        
        const triggerBottom = window.innerHeight * 0.9;
        const firstMetric = metrics[0].getBoundingClientRect().top;

        if (firstMetric < triggerBottom) {
            animated = true;
            metrics.forEach(metric => {
                const targetText = metric.innerText;
                const target = parseInt(targetText.replace(/\D/g, ''));
                const suffix = targetText.replace(/[0-9]/g, '');
                let count = 0;
                const duration = 2000;
                const increment = target / (duration / 16);

                const updateCount = () => {
                    count += increment;
                    if (count < target) {
                        metric.innerText = Math.ceil(count) + suffix;
                        requestAnimationFrame(updateCount);
                    } else {
                        metric.innerText = target + suffix;
                    }
                };
                updateCount();
            });
        }
    };

    window.addEventListener('scroll', animateCounters);
    animateCounters();

    // Modal Logic
    const modal = document.getElementById('contactModal');
    const triggers = document.querySelectorAll('#openModal, .service-card');
    const closeBtn = document.getElementById('closeModal');

    if (triggers.length > 0 && modal && closeBtn) {
        triggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; 
            });
        });

        const closeModalFunc = () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scrolling
        };

        closeBtn.addEventListener('click', closeModalFunc);

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModalFunc();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModalFunc();
            }
        });
    }
});
