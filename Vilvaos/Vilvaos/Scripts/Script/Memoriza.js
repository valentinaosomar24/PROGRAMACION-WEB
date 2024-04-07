let flippedCards = [];
let matchedPairs = 0;
let images = [
    { src: '../../img/amarillo.png', color: 'amarillo' },
    { src: '../../img/azul.png', color: 'azul' },
    { src: '../../img/cafe.png', color: 'cafe' },
    { src: '../../img/morado.png', color: 'morado' },
    { src: '../../img/naranja.png', color: 'naranja' },
    { src: '../../img/rojo.png', color: 'rojo' },
    { src: '../../img/rosa.png', color: 'rosa' },
    { src: '../../img/verde.png', color: 'verde' }
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
    carta.setAttribute('data-color', img.color); // Agregamos un atributo para el color
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
        const color = flippedCards[0].getAttribute('data-color'); // Obtenemos el color de la carta
        const imageSrc = flippedCards[0].getAttribute('data-img'); // Obtenemos la ruta de la imagen
        document.getElementById('colorMatch').innerText = `El color es ${color}`; // Mostramos el color en el modal
        document.getElementById('imageMatch').src = imageSrc;
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