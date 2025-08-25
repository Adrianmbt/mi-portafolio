document.addEventListener('DOMContentLoaded', function() {

    // 1. INICIALIZAR TOOLTIPS DE BOOTSTRAP
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // 2. LÓGICA PARA EL MODO OSCURO
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const applyTheme = (theme) => {
        body.classList.toggle('dark-mode', theme === 'dark');
        if(darkModeToggle) darkModeToggle.checked = (theme === 'dark');
    };
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    darkModeToggle.addEventListener('change', () => {
        const theme = darkModeToggle.checked ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        applyTheme(theme);
    });

    // --- ANIMACIONES CON ANIME.JS ---

    // Animación inicial al cargar la página
    anime.timeline({
        easing: 'easeOutExpo',
        duration: 1000
    }).add({
        targets: '.personal-info-card',
        translateY: [-50, 0],
        opacity: [0, 1],
        delay: 200
    }).add({
        targets: '.content-card',
        translateY: [-50, 0],
        opacity: [0, 1],
    }, '-=800');

    // Función para animar el contenido de una pestaña activa
    const animateTabContent = (tabPaneId) => {
        const targetPane = document.querySelector(tabPaneId);
        if (!targetPane) return;

        const elementsToAnimate = targetPane.querySelectorAll('.timeline-item, .project-card');
        if (elementsToAnimate.length > 0) {
             anime({
                targets: elementsToAnimate,
                translateY: [50, 0],
                opacity: [0, 1],
                delay: anime.stagger(100, { start: 200 }),
                easing: 'easeOutCubic'
            });
        }
    };
    
    // Animar la primera pestaña activa al cargar
    const initialActiveTab = document.querySelector('.nav-pills .nav-link.active');
    if (initialActiveTab) {
        animateTabContent(initialActiveTab.dataset.bsTarget);
    }
    
    // Listener para animar al cambiar de pestaña
    const tabs = document.querySelectorAll('button[data-bs-toggle="pill"]');
    tabs.forEach(tab => {
        tab.addEventListener('shown.bs.tab', event => {
            const targetPaneId = event.target.dataset.bsTarget;
            animateTabContent(targetPaneId);
        });
    });

    // Animación de hover para iconos sociales
    document.querySelectorAll('.social-icon').forEach(icon => {
        icon.addEventListener('mouseenter', () => anime({ targets: icon, scale: 1.25, rotate: '1turn', duration: 800 }));
        icon.addEventListener('mouseleave', () => anime({ targets: icon, scale: 1, rotate: '0turn', duration: 600 }));
    });

    // Animación de hover para tarjetas (Neumorfismo presionado)
    document.querySelectorAll('.card').forEach(card => {
        if (card.classList.contains('personal-info-card')) return;

        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                boxShadow: 'var(--neumorph-shadow-inset)',
                duration: 300,
                easing: 'easeOutCubic'
            });
        });

        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                boxShadow: 'var(--neumorph-shadow)',
                duration: 500,
                easing: 'easeOutElastic(1, .8)'
            });
        });
    });

});