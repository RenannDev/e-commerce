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




    // slide do banner
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



// FAQ



});

document.addEventListener('DOMContentLoaded', () => {
    const perguntas = document.querySelectorAll('.faq-item');
    const respostasContainer = document.querySelector('.faq-central-resposta');
    const respostasConteudo = document.getElementById('respostas-faq');

    // Mapeia os dados das perguntas para as respostas
    const respostasMap = {};
    const divRespostas = respostasConteudo.querySelectorAll('div');
    divRespostas.forEach(div => {
        respostasMap[div.id] = div.innerHTML;
    });

    const isMobile = window.matchMedia('(max-width: 768px)');

    // Função para ativar o modo Desktop
    const ativarDesktop = () => {
        perguntas.forEach(pergunta => {
            pergunta.style.transform = 'none'; // Reseta o transform do mobile
            
            // Remove a resposta do mobile se existir
            const respostaMobile = pergunta.querySelector('.faq-resposta-mobile');
            if (respostaMobile) {
                respostaMobile.remove();
            }

            pergunta.addEventListener('click', () => {
                const respostaId = pergunta.dataset.resposta;
                const respostaHTML = respostasMap[respostaId];
                
                respostasContainer.style.opacity = '0';
                setTimeout(() => {
                    respostasContainer.innerHTML = respostaHTML;
                    respostasContainer.style.opacity = '1';
                }, 300);
            });
        });
    };

    // Função para ativar o modo Mobile (Acordeão)
    const ativarMobile = () => {
        perguntas.forEach(pergunta => {
            // Remove o listener de click do desktop
            pergunta.removeEventListener('click', null); 
            
            pergunta.addEventListener('click', (e) => {
                const respostaId = pergunta.dataset.resposta;
                let respostaMobile = pergunta.querySelector('.faq-resposta-mobile');

                // Se a resposta ainda não foi criada, cria e insere
                if (!respostaMobile) {
                    respostaMobile = document.createElement('div');
                    respostaMobile.className = 'faq-resposta-mobile';
                    respostaMobile.innerHTML = respostasMap[respostaId];
                    pergunta.appendChild(respostaMobile);
                }

                // Fecha todas as outras respostas abertas
                document.querySelectorAll('.faq-resposta-mobile.aberto').forEach(item => {
                    if (item !== respostaMobile) {
                        item.classList.remove('aberto');
                    }
                });
                
                // Alterna a classe 'aberto' para mostrar/esconder a resposta
                respostaMobile.classList.toggle('aberto');
            });
        });
    };

    // Inicializa a lógica baseada no tamanho da tela
    if (isMobile.matches) {
        ativarMobile();
    } else {
        ativarDesktop();
    }

    // Listener para mudanças no tamanho da tela
    isMobile.addEventListener('change', (e) => {
        if (e.matches) {
            ativarMobile();
        } else {
            ativarDesktop();
        }
    });
});


// FORMULARIO

 const form = document.querySelector('.contato-formulario form');
    const statusDiv = document.getElementById('form-status');

    // Adiciona um listener para o evento de envio do formulário
    form.addEventListener('submit', async (event) => {
        // Previne o comportamento padrão do navegador de recarregar a página
        event.preventDefault();

        // Limpa a mensagem de status anterior
        statusDiv.textContent = 'Enviando...';
        statusDiv.style.color = '#555';

        // Cria um objeto FormData com os dados do formulário
        const formData = new FormData(form);

        try {
            // Usa o método fetch para enviar os dados para o Formspree
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            // Verifica se a resposta da API foi bem-sucedida
            if (response.ok) {
                statusDiv.textContent = 'Mensagem enviada com sucesso!';
                statusDiv.style.color = 'green';
                form.reset(); // Limpa o formulário
            } else {
                // Se a resposta não for ok, lê a mensagem de erro
                const data = await response.json();
                if (Object.hasOwnProperty.call(data, 'errors')) {
                    statusDiv.textContent = data.errors.map(error => error.message).join(", ");
                } else {
                    statusDiv.textContent = 'Ocorreu um erro ao enviar a mensagem.';
                }
                statusDiv.style.color = 'red';
            }
        } catch (error) {
            // Em caso de erro de rede, mostra uma mensagem de erro
            statusDiv.textContent = 'Ocorreu um erro ao enviar a mensagem.';
            statusDiv.style.color = 'red';
        }
    });
