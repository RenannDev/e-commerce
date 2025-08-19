// script para o banner/carrosel
document.addEventListener('DOMContentLoaded', () => {

    const listaItens = document.querySelectorAll(".lista-de-items li");
    const imagens = document.querySelectorAll(".caixa-imgs img");

    listaItens.forEach(item => {
        item.addEventListener("click", () => {
            // 1. Remove a classe "on" de todos os itens da lista
            listaItens.forEach(outroItem => {
                outroItem.classList.remove("on");
            });

            // 2. Remove a classe "ativa" de todas as imagens
            imagens.forEach(img => {
                img.classList.remove("ativa");
            });

            // 3. Adiciona a classe "on" ao item clicado
            item.classList.add("on");

            // 4. Encontra a imagem correspondente e adiciona a classe "ativa"
            const idDaImagem = item.dataset.target;
            const imagemCorrespondente = document.querySelector(`.caixa-imgs img[data-id="${idDaImagem}"]`);

            if (imagemCorrespondente) {
                imagemCorrespondente.classList.add("ativa");
            }
        });
    });

});
// Seleciona os elementos do HTML
const carouselSlides = document.querySelector('.carousel-slides');
const dots = document.querySelectorAll('.dot');
const totalSlides = dots.length;



let currentSlide = 0;
let slideInterval;

// Função para mostrar o slide atual
function showSlide(index) {
    // Esconde a classe 'active' do ponto anterior
    dots.forEach(dot => dot.classList.remove('active'));
    // Adiciona a classe 'active' ao ponto do slide atual
    dots[index].classList.add('active');

    // Move o contêiner de slides para mostrar a imagem correta
    const offset = -index * 100;
    carouselSlides.style.transform = `translateX(${offset / totalSlides}%)`; // Ajuste na fórmula

    // Calcula o deslocamento correto para o 'translateX'
    const newOffset = -index * (100 / totalSlides);
    carouselSlides.style.transform = `translateX(${newOffset}%)`;
}

// Função para ir para o próximo slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Inicia o carrossel automático (muda a cada 4 segundos)
function startCarousel() {
    slideInterval = setInterval(nextSlide, 4000); // 4000ms = 4 segundos
}

// Para o carrossel quando o mouse está sobre ele
function stopCarousel() {
    clearInterval(slideInterval);
}

// Adiciona eventos de clique nos pontos para navegação manual
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
        stopCarousel(); // Para o carrossel para que o usuário navegue
        startCarousel(); // Reinicia o auto-play após a navegação manual
    });
});

// Adiciona eventos de hover para pausar e continuar o carrossel
const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', stopCarousel);
carouselContainer.addEventListener('mouseleave', startCarousel);


// Inicia o carrossel ao carregar a página
document.addEventListener('DOMContentLoaded', startCarousel);





// scipt para a secao porque comprar
// scipt para a secao porque comprar
