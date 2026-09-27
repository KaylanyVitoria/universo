/* ========================================
   ELEMENTOS
======================================== */

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

window.addEventListener("pageshow", () => {
    window.scrollTo(0, 0);
});

const starsContainer =
    document.getElementById("stars");

const universeStarsContainer =
    document.getElementById("universeStars");

const startButton =
    document.getElementById("startButton");

const memoryModal =
    document.getElementById("memoryModal");

const modalOverlay =
    document.getElementById("modalOverlay");

const closeModal =
    document.getElementById("closeModal");

const memoryDate =
    document.getElementById("memoryDate");

const memoryTitle =
    document.getElementById("memoryTitle");

const memoryText =
    document.getElementById("memoryText");

const memoryPhoto =
    document.getElementById("memoryPhoto");

const progressText =
    document.getElementById("progressText");

const progressFill =
    document.getElementById("progressFill");

const constellation =
    document.querySelector(".constellation");

const planet =
    document.querySelector(".planet");

const day27Section =
    document.getElementById("day27Section");

const relationshipDays =
    document.getElementById("relationshipDays");

const relationshipTime =
    document.getElementById("relationshipTime");


/* ========================================
   CONFIGURAÇÕES
======================================== */

const MUSIC_PATH =
    "./assets/musica/musica.mp3";

const SKY_IMAGE_PATH =
    "./assets/fotos/ceu-27-09-2025.jpg";

const RELATIONSHIP_START = new Date(2025, 8, 27, 0, 0, 0);

function updateRelationshipCounter() {
    const elapsedSeconds = Math.max(
        0,
        Math.floor((Date.now() - RELATIONSHIP_START.getTime()) / 1000)
    );

    const days = Math.floor(elapsedSeconds / 86400);
    const hours = Math.floor((elapsedSeconds % 86400) / 3600);
    const minutes = Math.floor((elapsedSeconds % 3600) / 60);
    const seconds = elapsedSeconds % 60;

    if (relationshipDays) {
        relationshipDays.textContent = `${days} ${days === 1 ? "dia" : "dias"}`;
    }

    if (relationshipTime) {
        relationshipTime.textContent =
            `${String(hours).padStart(2, "0")}h ` +
            `${String(minutes).padStart(2, "0")}min ` +
            `${String(seconds).padStart(2, "0")}s`;
    }
}

updateRelationshipCounter();
setInterval(updateRelationshipCounter, 1000);

let finalUnlocked = false;

let musicStarted = false;

let finalAnimationStarted = false;


/* ========================================
   CRIAR ESTRELAS DE FUNDO
======================================== */

function createStars(
    container,
    amount,
    className
) {

    if (!container) {
        return;
    }

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const star =
            document.createElement("span");

        star.classList.add(
            className
        );

        star.style.left =
            `${Math.random() * 100}%`;

        star.style.top =
            `${Math.random() * 100}%`;

        star.style.animationDelay =
            `${Math.random() * 5}s`;

        star.style.animationDuration =
            `${2 + Math.random() * 4}s`;

        container.appendChild(
            star
        );

    }

}


/* ========================================
   ESTRELAS DE FUNDO
======================================== */

createStars(
    starsContainer,
    180,
    "star"
);

createStars(
    universeStarsContainer,
    250,
    "universe-star"
);


/* ========================================
   ENTRAR NO UNIVERSO
======================================== */

if (startButton) {

    startButton.addEventListener(
        "click",
        () => {

            document.body.classList.add(
                "entered"
            );

        }
    );

}


/* ========================================
   MEMÓRIAS
======================================== */

const memories = {

    "2024": {

        date: "2024",

        title:
            "Quando nossos caminhos se cruzaram",

        text:
            "Foi em 2024 que nossos caminhos se encontraram pela primeira vez. Talvez naquele momento a gente ainda não imaginasse tudo que estava por vir.",

        photo:
            "./assets/fotos/27-09-2025.jpg"

    },


    "conversation": {

        date: "11.03.2025",

        title:
            "O começo da nossa história",

        text:
            "Foi nesse dia que começamos a conversar. Uma conversa que, sem a gente perceber, acabou nos levando até aqui.",

        photo:
            null

    },


    "first-date": {

        date: "30.07.2025",

        title:
            "Nosso primeiro encontro",

        text:
            "O dia em que aquilo que existia nas conversas virou uma memória de verdade. Um daqueles dias que eu quero guardar para sempre.",

        photo:
            "./assets/fotos/primeiro-encontro.jpg"

    },


    "farm": {

        date:
            "UMA MEMÓRIA",

        title:
            "Nosso dia no sítio",

        text:
            "Um lugar diferente, um dia nosso e mais uma memória que passou a fazer parte da nossa história.",

        photo:
            "./assets/fotos/sitio.jpg"

    },


    "secret": {

        date:
            "MEMÓRIA SECRETA 🔐",

        title:
            "Eu não sei explicar isso... 😂",

        text:
            "Mas acho que só nós duas conseguiríamos olhar para isso e pensar: sim, isso definitivamente aconteceu. 😂❤️",

        photo:
            "./assets/fotos/soprando.JPG"

    },


    "special": {

        date:
            "UMA MEMÓRIA ESPECIAL",

        title:
            "O dia que fomos para o jogo Ceará pela primeira vez",

        text:
            "Alguns momentos parecem simples quando acontecem. Depois percebemos que eles eram o começo de algo muito maior.",

        photo:
            "./assets/fotos/memoria-especial.jpg"

    },


    /* ====================================
       DIA 27/09/2025
    ==================================== */

    "anniversary": {

        date:
            "27.09.2025",

        title:
            "O dia em que virou nós ❤️",

        text:
            "O dia em que começamos oficialmente a nossa história. E esse ainda era só o primeiro capítulo.",

        photo:
            "./assets/fotos/27-09-2025.jpg"

    }

};


/* ========================================
   CONTROLE DE MEMÓRIAS
======================================== */

// O progresso vale apenas enquanto esta página estiver aberta.
const discovered = new Set();

localStorage.removeItem("discoveredMemories");

window.addEventListener("pagehide", () => {
    localStorage.removeItem("discoveredMemories");
});

const totalMemories = 6;


/* ========================================
   ABRIR MEMÓRIA
======================================== */

function openMemory(memoryId) {

    const memory =
        memories[memoryId];

    if (!memory) {
        return;
    }


    /* ====================================
       ESTRELA FINAL
    ==================================== */

    if (memoryId === "anniversary") {

        if (!finalUnlocked) {
            return;
        }

        unlockPlanet();

        return;

    }


    /* ====================================
       REGISTRAR MEMÓRIA
    ==================================== */

    if (!discovered.has(memoryId)) {

        discovered.add(
            memoryId
        );


        const clickedStar =
            document.querySelector(
                `[data-memory="${memoryId}"]`
            );


        if (clickedStar) {

            clickedStar.classList.add(
                "discovered"
            );

        }


        updateProgress();

    }


    /* ====================================
       PREENCHER MODAL
    ==================================== */

    if (memoryDate) {

        memoryDate.textContent =
            memory.date;

    }


    if (memoryTitle) {

        memoryTitle.textContent =
            memory.title;

    }


    if (memoryText) {

        memoryText.textContent =
            memory.text;

    }


    /* ====================================
       FOTO
    ==================================== */

    if (memoryPhoto) {

        if (memory.photo) {

            memoryPhoto.innerHTML = `

                <img
                    src="${memory.photo}"
                    alt="${memory.title}"
                >

            `;

        } else {

            memoryPhoto.innerHTML = `

                <span>
                    Uma memória que ainda
                    vamos descobrir ❤️
                </span>

            `;

        }

    }


    /* ====================================
       ABRIR MODAL
    ==================================== */

    if (memoryModal) {

        memoryModal.classList.add(
            "active"
        );

    }

}


/* ========================================
   ESTRELAS CLICÁVEIS
======================================== */

const memoryStars =
    document.querySelectorAll(
        ".memory-star"
    );


/* ========================================
   REAPLICAR ESTRELAS DESCOBERTAS
======================================== */

memoryStars.forEach(
    star => {

        const memoryId =
            star.dataset.memory;


        if (
            memoryId !== "anniversary" &&
            discovered.has(memoryId)
        ) {

            star.classList.add(
                "discovered"
            );

        }

    }
);


/* ========================================
   EVENTOS DE CLIQUE
======================================== */

memoryStars.forEach(
    star => {

        star.addEventListener(
            "click",
            () => {

                const memoryId =
                    star.dataset.memory;


                /* ==========================
                   ESTRELA FINAL
                ========================== */

                if (
                    memoryId === "anniversary"
                ) {

                    if (!finalUnlocked) {
                        return;
                    }

                    unlockPlanet();

                    return;

                }


                /* ==========================
                   MEMÓRIA NORMAL
                ========================== */

                openMemory(
                    memoryId
                );

            }
        );

    }
);


/* ========================================
   ATUALIZAR PROGRESSO
======================================== */

function updateProgress() {

    const amount =
        discovered.size;


    const percentage =
        (amount / totalMemories) *
        100;


    /* ====================================
       TEXTO
    ==================================== */

    if (progressText) {

        progressText.textContent =
            `${amount} de ${totalMemories} estrelas descobertas`;

    }


    /* ====================================
       BARRA
    ==================================== */

    if (progressFill) {

        progressFill.style.width =
            `${percentage}%`;

    }


    /* ====================================
       TODAS DESCOBERTAS
    ==================================== */

    if (amount >= totalMemories) {

        const finalStar =
            document.querySelector(
                ".final-star"
            );


        if (finalStar) {

            finalStar.classList.remove(
                "locked"
            );


            finalStar.classList.add(
                "unlocked"
            );


            const core =
                finalStar.querySelector(
                    ".star-core"
                );


            if (core) {

                core.textContent =
                    "♥";

            }

        }


        if (progressText) {

            progressText.textContent =
                "Você encontrou todas as estrelas ❤️";

        }


        finalUnlocked =
            true;


        /* ====================================
           DESBLOQUEAR PLANETA
        ==================================== */

        if (planet) {

            planet.classList.add(
                "planet-unlocked"
            );

        }


        /* ====================================
           MOSTRAR CÉU DO DIA 27
        ==================================== */

        showAnniversaryConstellation();

    }

}


/* ========================================
   CÉU DO DIA 27
======================================== */

function showAnniversaryConstellation() {

    const currentScrollY = window.scrollY;

    if (!constellation) {
        return;
    }


    constellation.classList.add(
        "anniversary-complete"
    );


    /* ====================================
       ESTRELA FINAL
    ==================================== */

    const finalStar =
        document.querySelector(
            ".final-star"
        );


    if (finalStar) {

        finalStar.classList.add(
            "anniversary-star"
        );

    }


    /* ====================================
       SEÇÃO DO CÉU
    ==================================== */

    const day27 =
        document.getElementById(
            "day27Section"
        );


    if (day27) {

        /* Remove o estado bloqueado */

        day27.classList.remove(
            "locked-section"
        );


        /* Adiciona estado desbloqueado */

        day27.classList.add(
            "unlocked-section"
        );


        day27.setAttribute(
            "aria-hidden",
            "false"
        );


        /* =================================
           FOTO DO CÉU
        ================================= */

        day27.style.backgroundImage = `
            linear-gradient(
                rgba(5, 5, 25, 0.30),
                rgba(5, 5, 25, 0.55)
            ),
            url("${SKY_IMAGE_PATH}")
        `;


        day27.style.backgroundSize =
            "cover";


        /* CORREÇÃO DO POSICIONAMENTO */

        day27.style.backgroundPosition =
            "50% 50%";


        day27.style.backgroundRepeat =
            "no-repeat";

    }


    /* ====================================
       TEXTO DO DIA 27
    ==================================== */

    let anniversaryMessage =
        document.getElementById(
            "anniversaryMessage"
        );


    if (!anniversaryMessage) {

        anniversaryMessage =
            document.createElement(
                "div"
            );


        anniversaryMessage.id =
            "anniversaryMessage";


        anniversaryMessage.innerHTML = `

            <span>
                27.09.2025
            </span>

            <strong>
                O dia em que virou nós ❤️
            </strong>

        `;


        constellation.appendChild(
            anniversaryMessage
        );

    }


    anniversaryMessage.classList.add(
        "show"
    );

    // A inserção do céu abaixo da constelação não deve mover a tela.
    requestAnimationFrame(() => {
        window.scrollTo(0, currentScrollY);
    });

}


/* ========================================
   DESBLOQUEAR PLANETA
======================================== */

function unlockPlanet() {

    if (!finalUnlocked) {
        return;
    }


    if (!planet) {
        return;
    }


    planet.classList.add(
        "planet-unlocked"
    );


    planet.classList.add(
        "planet-active"
    );


    setTimeout(
        () => {

            openFinalLetter();

        },
        700
    );

}


/* ========================================
   CLICAR NO PLANETA
======================================== */

if (planet) {

    planet.addEventListener(
        "click",
        () => {

            if (!finalUnlocked) {
                return;
            }

            openFinalLetter();

        }
    );

}


/* ========================================
   MÚSICA
======================================== */

function startMusic() {

    if (musicStarted) {
        return;
    }


    let audio =
        document.getElementById(
            "finalMusic"
        );


    if (!audio) {

        audio =
            document.createElement(
                "audio"
            );


        audio.id =
            "finalMusic";


        audio.src =
            MUSIC_PATH;


        audio.loop =
            true;


        audio.preload =
            "auto";


        audio.volume =
            0.65;


        document.body.appendChild(
            audio
        );

    }


    audio.play()
        .then(
            () => {

                musicStarted =
                    true;

            }
        )
        .catch(
            error => {

                console.log(
                    "A música não pôde iniciar:",
                    error
                );

            }
        );

}


/* ========================================
   CONTROLE DA MÚSICA
======================================== */

function toggleMusic() {

    const audio =
        document.getElementById(
            "finalMusic"
        );


    const button =
        document.getElementById(
            "musicToggle"
        );


    if (!audio) {
        return;
    }


    if (audio.paused) {

        audio.play();


        if (button) {

            button.textContent =
                "🔊";

        }

    } else {

        audio.pause();


        if (button) {

            button.textContent =
                "🔇";

        }

    }

}


/* ========================================
   GALERIA
======================================== */

const galleryPhotos = [

    {

        src:
            "./assets/fotos/27-09-2025.jpg",

        caption:
            "O começo de uma nova fase ❤️"

    },


    {

        src:
            "./assets/fotos/primeiro-encontro.jpg",

        caption:
            "Nosso primeiro encontro"

    },


    {

        src:
            "./assets/fotos/sitio.jpg",

        caption:
            "Um dia para guardar"

    },


    {

        src:
            "./assets/fotos/soprando.JPG",

        caption:
            "Só nós entenderíamos 😂"

    },


    {

        src:
            "./assets/fotos/memoria-especial.jpg",

        caption:
            "Mais uma memória especial"

    }

];


/* ========================================
   CRIAR GALERIA
======================================== */

function createGallery() {

    return `

        <div class="final-gallery">

            <div class="gallery-title">
                Alguns dos nossos momentos ✨
            </div>

            <div class="gallery-grid">

                ${galleryPhotos.map(
                    (photo, index) => `

                    <div
                        class="gallery-item"
                        data-gallery-index="${index}"
                    >

                        <img
                            src="${photo.src}"
                            alt="${photo.caption}"
                            loading="lazy"
                        >

                        <div class="gallery-caption">
                            ${photo.caption}
                        </div>

                    </div>

                `
                ).join("")}

            </div>

        </div>

    `;

}


/* ========================================
   LIGHTBOX DA GALERIA
======================================== */

function createGalleryLightbox() {

    if (
        document.getElementById(
            "galleryLightbox"
        )
    ) {

        return;
    }


    const lightbox =
        document.createElement(
            "div"
        );


    lightbox.id =
        "galleryLightbox";


    lightbox.innerHTML = `

        <div
            class="gallery-lightbox-overlay"
        ></div>


        <button
            class="gallery-lightbox-close"
            aria-label="Fechar foto"
        >
            ×
        </button>


        <img
            class="gallery-lightbox-image"
            src=""
            alt=""
        >


        <div
            class="gallery-lightbox-caption"
        ></div>

    `;


    document.body.appendChild(
        lightbox
    );


    const close =
        lightbox.querySelector(
            ".gallery-lightbox-close"
        );


    const overlay =
        lightbox.querySelector(
            ".gallery-lightbox-overlay"
        );


    close.addEventListener(
        "click",
        closeGalleryLightbox
    );


    overlay.addEventListener(
        "click",
        closeGalleryLightbox
    );

}


/* ========================================
   ABRIR FOTO
======================================== */

function openGalleryPhoto(index) {

    const photo =
        galleryPhotos[index];


    if (!photo) {
        return;
    }


    createGalleryLightbox();


    const lightbox =
        document.getElementById(
            "galleryLightbox"
        );


    const image =
        lightbox.querySelector(
            ".gallery-lightbox-image"
        );


    const caption =
        lightbox.querySelector(
            ".gallery-lightbox-caption"
        );


    image.src =
        photo.src;


    image.alt =
        photo.caption;


    caption.textContent =
        photo.caption;


    lightbox.classList.add(
        "active"
    );

}


/* ========================================
   FECHAR FOTO
======================================== */

function closeGalleryLightbox() {

    const lightbox =
        document.getElementById(
            "galleryLightbox"
        );


    if (!lightbox) {
        return;
    }


    lightbox.classList.remove(
        "active"
    );

}


/* ========================================
   EVENTOS DA GALERIA
======================================== */

document.addEventListener(
    "click",
    event => {

        const item =
            event.target.closest(
                ".gallery-item"
            );


        if (!item) {
            return;
        }


        const index =
            Number(
                item.dataset.galleryIndex
            );


        openGalleryPhoto(
            index
        );

    }
);


/* ========================================
   ANIMAÇÃO FINAL
======================================== */

function createFinalParticles() {

    if (!constellation) {
        return;
    }


    const container =
        document.createElement(
            "div"
        );


    container.className =
        "final-particles";


    constellation.appendChild(
        container
    );


    const particleCount =
        35;


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );


        particle.className =
            "final-particle";


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            100 +
            Math.random() *
            260;


        const x =
            Math.cos(angle) *
            distance;


        const y =
            Math.sin(angle) *
            distance;


        particle.style.setProperty(
            "--x",
            `${x}px`
        );


        particle.style.setProperty(
            "--y",
            `${y}px`
        );


        particle.style.animationDelay =
            `${Math.random() * 0.7}s`;


        container.appendChild(
            particle
        );

    }


    setTimeout(
        () => {

            container.classList.add(
                "explode"
            );

        },
        100
    );


    setTimeout(
        () => {

            container.remove();

        },
        2500
    );

}


/* ========================================
   TRANSFORMAÇÃO FINAL
======================================== */

function startFinalAnimation() {

    if (finalAnimationStarted) {
        return;
    }


    finalAnimationStarted =
        true;


    if (constellation) {

        constellation.classList.add(
            "final-transformation"
        );

    }


    createFinalParticles();


    setTimeout(
        () => {

            if (constellation) {

                constellation.classList.add(
                    "final-complete"
                );

            }

        },
        1600
    );

}


/* ========================================
   CARTA FINAL
======================================== */

function createFinalLetter() {

    let finalModal =
        document.getElementById(
            "finalLetterModal"
        );


    if (finalModal) {
        return finalModal;
    }


    finalModal =
        document.createElement(
            "div"
        );


    finalModal.id =
        "finalLetterModal";


    finalModal.innerHTML = `

        <div
            class="final-letter-overlay"
            id="finalLetterOverlay"
        ></div>


        <div class="final-letter">

            <button
                class="final-letter-close"
                id="finalLetterClose"
                aria-label="Fechar carta"
            >
                ×
            </button>


            <div class="letter-decoration">
                ✦
            </div>


            <span class="letter-date">
                27.09.2025
            </span>


            <h2>
                Para você ❤️
            </h2>


            <div class="letter-line"></div>


            <p>
                Existem momentos que a gente
                guarda não só na memória,
                mas também no coração.
            </p>


            <p>
                Quando olho para tudo que
                vivemos até aqui, percebo
                que cada conversa, cada saída,
                cada risada e cada pequeno
                momento ajudaram a construir
                a nossa história.
            </p>


            <p>
                E talvez essa seja a parte
                mais bonita: saber que ainda
                existem muitos capítulos
                para escrever.
            </p>


            <p>
                Obrigada por fazer parte
                da minha vida e por transformar
                tantos momentos simples em
                lembranças tão especiais.
            </p>


            <p>
                Que essa seja apenas uma
                pequena lembrança de tudo
                que ainda temos para viver.
            </p>


            <div class="letter-signature">

                Com carinho,

                <strong>
                    Kaylany ♡
                </strong>

            </div>


            ${createGallery()}


            <div class="final-message">

                <span>
                    E se você chegou até aqui...
                </span>


                <strong>
                    é porque essa história
                    ainda está só começando. ❤️
                </strong>

            </div>


            <div class="music-control">

                <button
                    id="musicToggle"
                    type="button"
                    aria-label="Controlar música"
                >
                    🔊
                </button>


                <span>
                    Nossa música
                </span>

            </div>


            <div class="letter-stars">
                ✦　·　✧　·　✦
            </div>

        </div>

    `;


    document.body.appendChild(
        finalModal
    );


    /* ====================================
       FECHAR
    ==================================== */

    const closeButton =
        document.getElementById(
            "finalLetterClose"
        );


    const overlay =
        document.getElementById(
            "finalLetterOverlay"
        );


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeFinalLetter
        );

    }


    if (overlay) {

        overlay.addEventListener(
            "click",
            closeFinalLetter
        );

    }


    /* ====================================
       BOTÃO DA MÚSICA
    ==================================== */

    const musicButton =
        document.getElementById(
            "musicToggle"
        );


    if (musicButton) {

        musicButton.addEventListener(
            "click",
            toggleMusic
        );

    }


    return finalModal;

}


/* ========================================
   ABRIR CARTA FINAL
======================================== */

function openFinalLetter() {

    if (!finalUnlocked) {
        return;
    }


    const finalModal =
        createFinalLetter();


    finalModal.classList.add(
        "active"
    );


    startMusic();


    setTimeout(
        () => {

            startFinalAnimation();

        },
        1000
    );

}


/* ========================================
   FECHAR CARTA
======================================== */

function closeFinalLetter() {

    const finalModal =
        document.getElementById(
            "finalLetterModal"
        );


    if (!finalModal) {
        return;
    }


    finalModal.classList.remove(
        "active"
    );

}


/* ========================================
   FECHAR MODAL DE MEMÓRIA
======================================== */

function closeMemory() {

    if (!memoryModal) {
        return;
    }


    memoryModal.classList.remove(
        "active"
    );

}


if (closeModal) {

    closeModal.addEventListener(
        "click",
        closeMemory
    );

}


if (modalOverlay) {

    modalOverlay.addEventListener(
        "click",
        closeMemory
    );

}


/* ========================================
   ESC
======================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeMemory();

            closeFinalLetter();

            closeGalleryLightbox();

        }

    }
);


/* ========================================
   ESTILOS EXTRAS
======================================== */

const finalLetterStyle =
    document.createElement(
        "style"
    );


finalLetterStyle.textContent = `

/* ========================================
   ESTRELAS DESCOBERTAS
======================================== */

.memory-star.discovered {

    opacity: 0.55;

    filter:
        drop-shadow(
            0 0 8px
            rgba(210, 190, 255, 0.7)
        );

}


.memory-star.discovered .star-core {

    color: #c9baff;

    text-shadow:
        0 0 8px
        rgba(190, 165, 255, 0.9),

        0 0 18px
        rgba(190, 165, 255, 0.5);

}


.memory-star.discovered:hover {

    opacity: 1;

    transform:
        translate(-50%, -50%)
        scale(1.12);

}


/* ========================================
   ESTRELA FINAL
======================================== */

.memory-star.locked {

    opacity: 0.25;

    filter:
        grayscale(0.5);

    cursor: not-allowed;

}


.memory-star.unlocked {

    opacity: 1;

    cursor: pointer;

    filter:
        drop-shadow(
            0 0 12px
            rgba(255, 180, 220, 0.9)
        );

}


/* ========================================
   DESTAQUE DO DIA 27
======================================== */

.anniversary-complete {

    position: relative;

}


#anniversaryMessage {

    position: absolute;

    left: 50%;

    top: 50%;

    transform:
        translate(-50%, -50%)
        scale(0.8);

    display: flex;

    flex-direction: column;

    align-items: center;

    gap: 8px;

    text-align: center;

    opacity: 0;

    pointer-events: none;

    transition:
        opacity 1s ease,
        transform 1s ease;

    z-index: 50;

}


#anniversaryMessage.show {

    opacity: 1;

    transform:
        translate(-50%, -50%)
        scale(1);

}


#anniversaryMessage span {

    font-size: 11px;

    letter-spacing: 4px;

    color:
        rgba(220, 210, 255, 0.7);

}


#anniversaryMessage strong {

    font-size:
        clamp(20px, 4vw, 30px);

    font-weight: 400;

    color: #ffffff;

    text-shadow:
        0 0 12px
        rgba(255, 180, 220, 0.8),

        0 0 35px
        rgba(180, 150, 255, 0.5);

}


.final-star.anniversary-star {

    filter:
        drop-shadow(
            0 0 15px
            rgba(255, 190, 225, 0.9)
        );

}


/* ========================================
   CÉU DO DIA 27
======================================== */

.day27-section {

    position: relative;

    overflow: hidden;

    background-color:
        #08091b;

    background-size:
        cover;

    background-position:
        50% 50%;

    background-repeat:
        no-repeat;

    transition:
        opacity 1s ease,
        transform 1s ease,
        background-image 1s ease;

}


.day27-section::before {

    content: "";

    position: absolute;

    inset: 0;

    background:
        radial-gradient(
            circle at center,
            rgba(120, 100, 220, 0.12),
            transparent 65%
        );

    pointer-events: none;

}


.day27-content {

    position: relative;

    z-index: 2;

}


/* ========================================
   SEÇÃO DESBLOQUEADA
======================================== */

.day27-section.unlocked-section {

    opacity: 1;

    transform:
        translateY(0);

}


/* ========================================
   CÉU — ESTRELAS DECORATIVAS
======================================== */

.day27-star {

    text-shadow:
        0 0 8px #ffffff,
        0 0 20px
        rgba(180, 170, 255, 0.9);

    animation:
        skyStarPulse
        3s
        ease-in-out
        infinite;

}


@keyframes skyStarPulse {

    0%,
    100% {

        opacity: 0.6;

        transform:
            scale(0.9);

    }

    50% {

        opacity: 1;

        transform:
            scale(1.15);

    }

}


/* ========================================
   CARTA FINAL
======================================== */

#finalLetterModal {

    position: fixed;

    inset: 0;

    display: flex;

    align-items: center;

    justify-content: center;

    padding: 25px;

    opacity: 0;

    visibility: hidden;

    z-index: 3000;

    transition:
        opacity 0.6s ease,
        visibility 0.6s ease;

}


#finalLetterModal.active {

    opacity: 1;

    visibility: visible;

}


.final-letter-overlay {

    position: absolute;

    inset: 0;

    background:
        rgba(2, 2, 10, 0.90);

    backdrop-filter:
        blur(16px);

}


.final-letter {

    position: relative;

    z-index: 2;

    width:
        min(92vw, 650px);

    max-height:
        90vh;

    overflow-y:
        auto;

    padding:
        55px 50px 45px;

    border:
        1px solid
        rgba(210, 195, 255, 0.25);

    border-radius:
        20px;

    background:
        linear-gradient(
            145deg,
            rgba(38, 33, 76, 0.98),
            rgba(10, 9, 27, 0.99)
        );

    box-shadow:
        0 30px 100px
        rgba(0, 0, 0, 0.8),

        0 0 80px
        rgba(130, 105, 255, 0.18);

    animation:
        letterAppear
        0.8s
        cubic-bezier(
            0.16,
            1,
            0.3,
            1
        );

}


@keyframes letterAppear {

    from {

        opacity: 0;

        transform:
            translateY(40px)
            scale(0.92)
            rotateX(8deg);

    }

    to {

        opacity: 1;

        transform:
            translateY(0)
            scale(1)
            rotateX(0);

    }

}


/* ========================================
   BOTÃO FECHAR
======================================== */

.final-letter-close {

    position: absolute;

    top: 18px;

    right: 20px;

    width: 36px;

    height: 36px;

    border: none;

    border-radius: 50%;

    background:
        rgba(255, 255, 255, 0.06);

    color:
        rgba(255, 255, 255, 0.7);

    font-size: 25px;

    cursor: pointer;

    transition:
        all 0.3s ease;

}


.final-letter-close:hover {

    background:
        rgba(255, 255, 255, 0.14);

    color: #ffffff;

    transform:
        rotate(90deg);

}


/* ========================================
   CABEÇALHO DA CARTA
======================================== */

.letter-decoration {

    text-align: center;

    font-size: 24px;

    color: #c5b7ff;

    text-shadow:
        0 0 10px
        rgba(180, 155, 255, 0.8),

        0 0 25px
        rgba(130, 100, 255, 0.5);

    margin-bottom: 18px;

}


.letter-date {

    display: block;

    text-align: center;

    font-size: 10px;

    letter-spacing: 4px;

    color:
        rgba(210, 200, 255, 0.55);

    margin-bottom: 15px;

}


.final-letter h2 {

    text-align: center;

    margin: 0;

    font-size:
        clamp(30px, 6vw, 42px);

    font-weight: 300;

    color: #ffffff;

}


.letter-line {

    width: 80px;

    height: 1px;

    margin:
        22px auto 30px;

    background:
        linear-gradient(
            90deg,
            transparent,
            rgba(205, 190, 255, 0.7),
            transparent
        );

}


/* ========================================
   TEXTO
======================================== */

.final-letter p {

    margin-bottom: 20px;

    font-size: 15px;

    line-height: 1.85;

    color:
        rgba(235, 230, 255, 0.75);

}


/* ========================================
   ASSINATURA
======================================== */

.letter-signature {

    display: flex;

    flex-direction: column;

    gap: 8px;

    margin-top: 30px;

    text-align: right;

    color:
        rgba(220, 210, 255, 0.55);

    font-size: 13px;

}


.letter-signature strong {

    font-size: 20px;

    font-weight: 400;

    color: #ffb5d8;

}


/* ========================================
   GALERIA
======================================== */

.final-gallery {

    margin-top: 40px;

    padding-top: 30px;

    border-top:
        1px solid
        rgba(210, 195, 255, 0.12);

}


.gallery-title {

    margin-bottom: 22px;

    text-align: center;

    font-size: 15px;

    letter-spacing: 1px;

    color:
        rgba(235, 230, 255, 0.8);

}


.gallery-grid {

    display: grid;

    grid-template-columns:
        repeat(2, 1fr);

    gap: 12px;

}


.gallery-item {

    position: relative;

    height: 170px;

    overflow: hidden;

    border-radius: 14px;

    cursor: pointer;

    border:
        1px solid
        rgba(210, 195, 255, 0.14);

    background:
        rgba(255, 255, 255, 0.04);

}


.gallery-item img {

    width: 100%;

    height: 100%;

    object-fit: cover;

    display: block;

    transition:
        transform 0.5s ease,
        filter 0.5s ease;

}


.gallery-item:hover img {

    transform:
        scale(1.08);

    filter:
        brightness(0.75);

}


.gallery-caption {

    position: absolute;

    left: 0;

    right: 0;

    bottom: 0;

    padding:
        25px 12px 12px;

    background:
        linear-gradient(
            transparent,
            rgba(0, 0, 0, 0.8)
        );

    font-size: 10px;

    color:
        rgba(255, 255, 255, 0.85);

    opacity: 0;

    transform:
        translateY(8px);

    transition:
        all 0.3s ease;

}


.gallery-item:hover
.gallery-caption {

    opacity: 1;

    transform:
        translateY(0);

}


/* ========================================
   LIGHTBOX
======================================== */

#galleryLightbox {

    position: fixed;

    inset: 0;

    z-index: 5000;

    display: flex;

    align-items: center;

    justify-content: center;

    padding: 30px;

    opacity: 0;

    visibility: hidden;

    transition:
        opacity 0.4s ease,
        visibility 0.4s ease;

}


#galleryLightbox.active {

    opacity: 1;

    visibility: visible;

}


.gallery-lightbox-overlay {

    position: absolute;

    inset: 0;

    background:
        rgba(0, 0, 0, 0.92);

    backdrop-filter:
        blur(12px);

}


.gallery-lightbox-image {

    position: relative;

    z-index: 2;

    max-width: 90vw;

    max-height: 82vh;

    object-fit: contain;

    border-radius: 12px;

    box-shadow:
        0 20px 80px
        rgba(0, 0, 0, 0.8);

    animation:
        lightboxAppear
        0.4s ease;

}


@keyframes lightboxAppear {

    from {

        opacity: 0;

        transform:
            scale(0.9);

    }

    to {

        opacity: 1;

        transform:
            scale(1);

    }

}


.gallery-lightbox-close {

    position: absolute;

    z-index: 3;

    top: 20px;

    right: 25px;

    width: 42px;

    height: 42px;

    border: none;

    border-radius: 50%;

    background:
        rgba(255, 255, 255, 0.08);

    color: #ffffff;

    font-size: 28px;

    cursor: pointer;

}


.gallery-lightbox-caption {

    position: absolute;

    z-index: 3;

    bottom: 25px;

    left: 50%;

    transform:
        translateX(-50%);

    width: 90%;

    text-align: center;

    color:
        rgba(255, 255, 255, 0.8);

    font-size: 13px;

}


/* ========================================
   MÚSICA
======================================== */

.music-control {

    display: flex;

    align-items: center;

    justify-content: center;

    gap: 10px;

    margin-top: 30px;

    color:
        rgba(220, 210, 255, 0.55);

    font-size: 11px;

    letter-spacing: 1px;

}


.music-control button {

    width: 34px;

    height: 34px;

    border:
        1px solid
        rgba(210, 195, 255, 0.18);

    border-radius: 50%;

    background:
        rgba(255, 255, 255, 0.05);

    color: #ffffff;

    cursor: pointer;

    transition:
        all 0.3s ease;

}


.music-control button:hover {

    transform:
        scale(1.1);

    background:
        rgba(160, 140, 255, 0.15);

}


/* ========================================
   MENSAGEM FINAL
======================================== */

.final-message {

    margin-top: 42px;

    padding:
        30px 20px;

    text-align: center;

    border-top:
        1px solid
        rgba(210, 195, 255, 0.1);

    border-bottom:
        1px solid
        rgba(210, 195, 255, 0.1);

}


.final-message span {

    display: block;

    margin-bottom: 10px;

    color:
        rgba(220, 215, 255, 0.55);

    font-size: 13px;

}


.final-message strong {

    display: block;

    color: #ffb5d8;

    font-size: 17px;

    font-weight: 400;

    line-height: 1.6;

    text-shadow:
        0 0 18px
        rgba(255, 120, 180, 0.35);

}


/* ========================================
   ESTRELAS DA CARTA
======================================== */

.letter-stars {

    margin-top: 35px;

    text-align: center;

    font-size: 12px;

    letter-spacing: 4px;

    color:
        rgba(200, 190, 255, 0.45);

}


/* ========================================
   PARTÍCULAS DA TRANSFORMAÇÃO
======================================== */

.final-particles {

    position: absolute;

    left: 50%;

    top: 52%;

    width: 1px;

    height: 1px;

    z-index: 20;

}


.final-particle {

    position: absolute;

    width: 5px;

    height: 5px;

    border-radius: 50%;

    background: #ffffff;

    box-shadow:
        0 0 8px #ffffff,
        0 0 18px
        rgba(170, 150, 255, 0.9);

    opacity: 0;

}


.final-particles.explode
.final-particle {

    animation:
        particleExplode
        1.8s
        ease-out
        forwards;

}


@keyframes particleExplode {

    0% {

        opacity: 0;

        transform:
            translate(0, 0)
            scale(0.3);

    }

    20% {

        opacity: 1;

    }

    100% {

        opacity: 0;

        transform:
            translate(
                var(--x),
                var(--y)
            )
            scale(0.8);

    }

}


/* ========================================
   PLANETA
======================================== */

.planet {

    transition:
        filter 0.5s ease,
        transform 0.5s ease;

}


.planet.planet-unlocked {

    cursor: pointer;

    pointer-events: auto;

    filter:
        drop-shadow(
            0 0 15px
            rgba(190, 165, 255, 0.5)
        );

}


.planet.planet-unlocked:hover {

    transform:
        translate(-50%, -50%)
        scale(1.08);

}


.planet.planet-active {

    filter:
        drop-shadow(
            0 0 25px
            rgba(255, 190, 230, 0.9)
        );

}


/* ========================================
   RESPONSIVIDADE
======================================== */

@media (max-width: 600px) {

    .final-letter {

        width: 94vw;

        padding:
            48px 20px 35px;

    }


    .final-letter p {

        font-size: 14px;

        line-height: 1.75;

    }


    .gallery-grid {

        grid-template-columns:
            1fr 1fr;

        gap: 8px;

    }


    .gallery-item {

        height: 135px;

        border-radius: 10px;

    }


    .gallery-caption {

        display: none;

    }


    .gallery-lightbox-image {

        max-width: 94vw;

        max-height: 75vh;

    }


    #anniversaryMessage strong {

        font-size: 20px;

    }


    #anniversaryMessage span {

        font-size: 9px;

        letter-spacing: 3px;

    }


    .day27-section {

        background-position:
            50% 50%;

    }

}

`;


document.head.appendChild(
    finalLetterStyle
);


/* ========================================
   INICIALIZAR PROGRESSO
======================================== */

updateProgress();
