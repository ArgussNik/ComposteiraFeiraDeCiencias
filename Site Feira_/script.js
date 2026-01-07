// ================= SLIDER =================
let indice = 0;
const slides = document.querySelectorAll(".composteira-slides img");
const total = slides.length;
let intervalo;

function mostrarSlide() {
    const largura = document.querySelector(".composteira-slider").offsetWidth;
    document.querySelector(".composteira-slides").style.transform =
        `translateX(-${indice * largura}px)`;
}

function moverSlide(direcao) {
    indice = (indice + direcao + total) % total;
    mostrarSlide();
}

function iniciarAutoPlay() {
    intervalo = setInterval(() => {
        moverSlide(1);
    }, 3000);
}

function pararAutoPlay() {
    clearInterval(intervalo);
}

iniciarAutoPlay();

const slider = document.getElementById("slider");
slider.addEventListener("mouseenter", pararAutoPlay);
slider.addEventListener("mouseleave", iniciarAutoPlay);
window.addEventListener("resize", mostrarSlide);

// ================= POKÉMON =================
const plantas = [
    "Free__Bulbasaur_PNG_Image_with_Transparent_Background-removebg-preview.png",
    "cypher.png",
    "Bayleef-removebg-preview.png",
    "venussaur.png"
];

const eletricos = [
    "pikachu.png",
    "magnite.png",
    "Jolteon (1).png",
    "electabuzz.png"
];

const pokemons = document.querySelectorAll('.pokemon-float');
let tipoAtual = 'plantas';

function trocarPokemon(novoTipo) {
    pokemons.forEach((p, i) => {
        p.style.transition = "opacity 0.8s ease";
        p.style.opacity = 0;

        setTimeout(() => {
            p.src = novoTipo[i % novoTipo.length];
            p.style.opacity = 1;
        }, 800);
    });
}

// ================= PARTÍCULAS =================
function criarParticulasCompostagem(eletrico = false) {
    // Remove container antigo
    const antigo = document.querySelector('#compostagem .particle-container');
    if (antigo) antigo.remove();

    const container = document.createElement('div');
    container.classList.add('particle-container');

    for (let i = 0; i < 15; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        p.style.left = Math.random() * 100 + '%';
        const duracao = (1 + Math.random() * 2) + 's';

        if(eletrico){
            // Partículas elétricas
            p.style.background = 'yellow';
            p.style.width = '5px';
            p.style.height = '30px';
            p.style.borderRadius = '2px';
            p.style.bottom = '0';
            p.style.animation = `raio ${duracao} linear infinite`;
        } else {
            // Partículas normais (plantas)
            p.style.background = Math.random() > 0.5 ? 'yellow' : 'white';
            p.style.width = '20px';
            p.style.height = '20px';
            p.style.borderRadius = '50%';
            p.style.bottom = '-20px';
            p.style.animation = `subir ${duracao} linear infinite`;
        }

        container.appendChild(p);
    }

    document.getElementById('compostagem').appendChild(container);
}

// ================= SCROLL PARA MUDAR POKÉMON E PARTÍCULAS =================
window.addEventListener('scroll', () => {
    const compostagem = document.getElementById('compostagem');
    const inicioSecao = compostagem.offsetTop;
    const scroll = window.scrollY + window.innerHeight / 2; // ponto central da tela

    if (scroll >= inicioSecao && tipoAtual !== 'eletricos') {
        tipoAtual = 'eletricos';
        trocarPokemon(eletricos);
        criarParticulasCompostagem(true); // partículas elétricas
    } else if (scroll < inicioSecao && tipoAtual !== 'plantas') {
        tipoAtual = 'plantas';
        trocarPokemon(plantas);
        criarParticulasCompostagem(false); // partículas normais
    }
});
