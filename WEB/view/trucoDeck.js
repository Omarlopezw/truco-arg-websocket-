// Define un componente personalizado para el mazo de 40 cartas
class TrucoDeck extends HTMLElement {
    constructor() 
    {
        super();
        // Crear elementos y configurar la estructura del mazo
        this.deck = document.createElement('div');
        this.deck.classList.add('deck');

        // Configurar el tamaño del mazo y la imagen de fondo
        this.deck.style.backgroundImage = 'url("../../API/assets/img/cartasMazo.png")'; // Ruta de la imagen de fondo

        let style = document.createElement('style');
        style.innerText = `.deck 
        {
            width: 230px;
            height: 200px;
            backgroundSize: cover;
            backgroundColor: transparent;
            position: absolute; 
            align-items: center;
            top: 400px;
            left: 350px;
        }`;

        // Agregar el mazo al componente
        this.appendChild(this.deck);
        this.appendChild(style);
    }
}

// Registrar el componente personalizado para el mazo de 40 cartas
customElements.define('truco-deck', TrucoDeck);

export {TrucoDeck};