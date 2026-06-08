// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if(navToggle) navToggle.addEventListener('click', () => navMenu.classList.toggle('active'));

    // Scroll Suave
    document.querySelectorAll('.nav-link, .btn-card, .btn-primary[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if(href && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if(target) { target.scrollIntoView({ behavior: 'smooth' }); if(navMenu) navMenu.classList.remove('active'); }
            }
        });
    });

    // Carregar Galeria com 1.jpg a 8.jpg
    function carregarGaleria() {
        const galeriaGrid = document.getElementById('galeriaGrid');
        if(galeriaGrid) {
            galeriaGrid.innerHTML = '';
            for(let i = 1; i <= 8; i++) {
                const imgPath = `imagens/${i}.jpg`;
                const item = document.createElement('div');
                item.className = 'galeria-item';
                item.innerHTML = `<a href="${imgPath}" data-lightbox="galeria" data-title="Trabalho Ray Almeida"><img src="${imgPath}" alt="Unhas luxo" loading="lazy" onerror="this.src='https://via.placeholder.com/400x400?text=Unha+Luxo'"></a>`;
                galeriaGrid.appendChild(item);
            }
        }
    }

    // Carregar Instagram
    function carregarInstagram() {
        const instaGrid = document.getElementById('instagramGrid');
        if(instaGrid) {
            instaGrid.innerHTML = '';
            for(let i = 1; i <= 5; i++) {
                const imgPath = `imagens/insta${i}.jpg`;
                const div = document.createElement('div');
                div.innerHTML = `<img src="${imgPath}" alt="@rayunhasdefibra" loading="lazy" onerror="this.src='https://via.placeholder.com/300x300?text=Instagram'">`;
                instaGrid.appendChild(div.firstChild);
            }
        }
    }
    carregarGaleria();
    carregarInstagram();

    // Agendamento
    const form = document.getElementById('agendamentoForm');
    const msgDiv = document.getElementById('mensagemAgendamento');
    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const nome = document.getElementById('nome').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const email = document.getElementById('email').value.trim();
            const servico = document.getElementById('servico').value;
            const data = document.getElementById('data').value;
            const horario = document.getElementById('horario').value;

            if(!nome || !telefone || !email || !servico || !data || !horario) { alert('Preencha todos os campos.'); return; }
            if(!email.includes('@')) { alert('E-mail inválido.'); return; }
            if(telefone.length < 10) { alert('Telefone inválido.'); return; }
            if(new Date(data) <= new Date()) { alert('Data futura obrigatória.'); return; }

            const agendamento = { id: Date.now(), nome, telefone, email, servico, data, horario, observacoes: document.getElementById('observacoes').value };
            let agendamentos = JSON.parse(localStorage.getItem('agendamentos') || '[]');
            agendamentos.push(agendamento);
            localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
            msgDiv.innerHTML = '✨ Agendamento realizado com sucesso! ✨';
            msgDiv.classList.add('show');
            form.reset();
            setTimeout(() => msgDiv.classList.remove('show'), 4000);
        });
    }

    // Carrossel
    let currentIndex = 0;
    const carrossel = document.getElementById('carrossel');
    if(carrossel) {
        const total = document.querySelectorAll('.avaliacao-card').length;
        const update = () => carrossel.style.transform = `translateX(-${currentIndex * 100}%)`;
        document.getElementById('nextBtn')?.addEventListener('click', () => { currentIndex = (currentIndex + 1) % total; update(); });
        document.getElementById('prevBtn')?.addEventListener('click', () => { currentIndex = (currentIndex - 1 + total) % total; update(); });
        setInterval(() => { currentIndex = (currentIndex + 1) % total; update(); }, 5000);
    }

    // ScrollReveal
    if(typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('.servico-card, .avaliacao-card, .galeria-item, .sobre-content', { delay: 100, distance: '40px', origin: 'bottom', interval: 100 });
    }

    // Data mínima
    const dataInput = document.getElementById('data');
    if(dataInput) dataInput.min = new Date().toISOString().split('T')[0];

    // Navbar efeito
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('navbar');
        if(window.scrollY > 50) nav.style.background = 'rgba(17, 24, 39, 0.95)';
        else nav.style.background = 'rgba(17, 24, 39, 0.85)';
    });
});