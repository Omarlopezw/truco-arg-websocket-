import { TrucoPlayer } from './trucoPlayerView.js';
import { TrucoDeck } from './trucoDeck.js';
// import {TrucoController} from '../controller/trucoController.js'

// Define un componente personalizado para la mesa de truco
class TrucoTable extends HTMLElement 
{
    constructor(controller) 
    {
        super();
        this.attachShadow({ mode: 'open' }); // Abre el sombreador CSS
        
        this.player1 = new TrucoPlayer();
        this.player2 = new TrucoPlayer();
        this.request = {};
        this.username = document.createElement('h2');
        this.username.innerText = '';
        this.oppName = document.createElement('h2');
        this.oppName.innerText = '';
        this.deck = new TrucoDeck();

        this.whoIsTurn = document.createElement('h2');
        this.whoIsTurn.innerText = '';

        // Crear elementos y configurar la estructura de la mesa
        this.tableDiv = document.createElement('div');
        this.tableDiv.className = 'table';

        this.playedCards = document.createElement('div');
        this.playedCards.classList.add('cards');

        this.options = document.createElement('div');
        this.options.classList.add('playButton');

        this.trucoButton = document.createElement('button');
        this.trucoButton.classList.add('playButton');
        this.trucoButton.innerText = 'truco';
        this.envidoButton = document.createElement('button');
        this.envidoButton.classList.add('playButton');
        this.envidoButton.innerText = 'envido';
        this.playCardButton = document.createElement('button');
        this.playCardButton.innerText = 'play card';
        this.playCardButton.classList.add('playButton');
        
        // Estilos de la mesa (puedes definirlos aquí o en un archivo CSS separado)
        let style = document.createElement('style');
        style.innerText = `.table {
            display: flex;
            flex-direction: column; /* Los jugadores estarán en una columna */
            align-items: center;
            // background-color: black;
            padding: 20px;
            position: relative; /* Para posicionar el mazo sobre la mesa */

            /* Estilo para el contenedor de opciones (lateral) */
        }
        .options 
        {
        display: flex;
        flex-direction: column; /* Colocar los botones en una columna */
        align-items: center; /* Centrar horizontalmente */
        padding: 10px; /* Espaciado interior */
        background-color: black; /* Fondo blanco para el contenedor de opciones */
        left: 500px;
        }

        /* Estilo para los botones */
        .playButton 
        {
        margin: 5px; /* Espacio entre los botones */
        padding: 10px 20px; /* Espacio interior del botón */
        background-color: #007bff; /* Color de fondo azul */
        color: #fff; /* Color de texto blanco */
        border: none; /* Sin borde */
        border-radius: 5px; /* Bordes redondeados */
        cursor: pointer; /* Cursor de puntero al pasar el ratón */
        }

        /* Estilo para los botones al pasar el ratón */
        playButton:hover 
        {
        background-color: green; /* Cambio de color al pasar el ratón */
        }
        .cards
        {
            width: 120px;
            height: 180px;
            background-size: cover;
            background-repeat: no-repeat;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 5px;
            border-radius: 10px;
            // background-image: url('../../API/assets/img/11_de_oro.png');
            position: absolute; 
            top: 500px;
            left: 600px;
        }        
        }`;

        
        // Agrega la imagen de la mesa en el medio de los jugadores
        this.tableImage = document.createElement('img');
        this.tableImage.src = "../../API/assets/img/trucoTable.jpg"; // Reemplaza con la ruta de tu imagen
        
        // Agrega la mesa a la sombra
        this.shadowRoot.appendChild(this.tableDiv);
        this.shadowRoot.appendChild(style);

        this.innerController = controller;
    }
    connectedCallback()
    {

        // Agrega al jugador 1 en la parte superior de la mesa
        this.tableDiv.appendChild(this.whoIsTurn);
        this.tableDiv.appendChild(this.username);
        this.tableDiv.appendChild(this.player1);
        this.tableDiv.appendChild(this.tableImage);
        this.tableDiv.appendChild(this.playedCards);
        this.tableDiv.appendChild(this.options);
        // Agrega al jugador 2 en la parte inferior de la mesa
        this.tableDiv.appendChild(this.player2);
        this.tableDiv.appendChild(this.oppName);
        this.tableDiv.appendChild(this.deck);
        this.options.appendChild(this.trucoButton);
        this.options.appendChild(this.envidoButton);
        this.options.appendChild(this.playCardButton);
        this.innerController.setView(this);    
        // this.innerController.initGame();

        this.playCardButton.onclick = (event)=>
        {  let index = prompt('Por favor, ingresa el indice de su carta a jugar: ');

            this.request = {index: index,play:'mesa'};
            this.innerController.playCard(this.getUsername(),this.request);
        };

    }
    setNames(username,oppName)
    {
        this.username.innerText = `${username}`;
        this.oppName.innerText = `${oppName}`;
        this.player1.setName(username);
        this.player2.setName(oppName);
    }
    getUsername()
    {
        return this.username.innerText;
    }
}

// Registrar el componente personalizado para la mesa de truco
customElements.define('truco-table', TrucoTable);

export { TrucoTable };