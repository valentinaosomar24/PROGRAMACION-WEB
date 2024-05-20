let flippedCards = [];
let matchedPairs = 0;
let images = [
    { src: '../../img/Memoriza/productos1.jpg', explicacion: '../../img/Memoriza/productos1explicacion.jpg' },
    { src: '../../img/Memoriza/productos2.jpg', explicacion: '../../img/Memoriza/productos2explicacion.jpg' },
    { src: '../../img/Memoriza/proveedor1.jpg', explicacion: '../../img/Memoriza/proveedor1explicacion.jpg' },
    { src: '../../img/Memoriza/proveedor2.jpg', explicacion: '../../img/Memoriza/proveedor2explicacion.jpg' },
    { src: '../../img/Memoriza/Usuario1.jpg', explicacion: '../../img/Memoriza/Usuario1explicacion.jpg' },
    { src: '../../img/Memoriza/Usuario2.jpg', explicacion: '../../img/Memoriza/Usuario2explicacion.jpg' },
    { src: '../../img/Memoriza/cliente1.jpg', explicacion: '../../img/Memoriza/cliente1explicacion.jpg' },
    { src: '../../img/Memoriza/cliente2.jpg', explicacion: '../../img/Memoriza/cliente2explicacion.jpg' }
];

// Duplica las imágenes y las mezcla
images = images.concat(images);
shuffle(images);

// Función para mezclar un arreglo
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const cuadro = document.querySelector('.cuadro');

// Configurar las cartas
images.forEach((img) => {
    const carta = document.createElement('div');
    carta.classList.add('carta');
    carta.setAttribute('data-img', img.src); // Cambiamos a src
    carta.setAttribute('data-info', img.explicacion); // Agregamos un atributo para el color
    carta.onclick = () => flipCard(carta);
    cuadro.appendChild(carta);
});

// Voltear las cartas al principio
document.querySelectorAll('.carta').forEach((carta, index) => {
    carta.style.backgroundImage = `url('${carta.getAttribute('data-img')}')`;
    carta.classList.add('flip');
    setTimeout(() => {
        carta.style.backgroundImage = "url('../../img/vilvaosBackGroundBlack.png')";
        carta.classList.add('logo');
        carta.classList.remove('flip');
    }, 1000);
});

function flipCard(card) {
    if (!card.classList.contains('flip') && flippedCards.length < 2) {
        card.style.backgroundImage = `url('${card.getAttribute('data-img')}')`;
        card.classList.remove('logo');
        card.classList.add('flip');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    if (flippedCards[0].getAttribute('data-img') === flippedCards[1].getAttribute('data-img')) {
        const info = flippedCards[0].getAttribute('data-info'); // Obtenemos el color de la carta
        document.getElementById('imageMatch').src = info;
        $('#Coincidencia').modal('show');
        flippedCards = [];
        matchedPairs++;
        if (matchedPairs === 8) {
            $('#Ganador').modal('show');
        }
    } else {
        flippedCards.forEach(card => {
            card.style.backgroundImage = "url('../../img/vilvaosBackGroundBlack.png')";
            card.classList.add('logo');
            card.classList.remove('flip');
        });
        flippedCards = [];
    }
}