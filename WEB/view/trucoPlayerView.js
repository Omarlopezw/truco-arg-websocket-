import { TrucoCard } from "./trucoCardView.js";

class TrucoPlayer extends HTMLElement 
{
    constructor(path) 
    {
        super();
        this.attachShadow({ mode: 'open' }); // Abre el sombreador CSS
        
        this.cards = [];
        this.name = '';
        
        // Crear elementos y configurar la estructura
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player';

        this.playerName = document.createElement('h2');
        const playerAvatar = document.createElement('img');
        playerAvatar.src = path;
        
        const deck = document.createElement('div');
        deck.classList.add('truco-card');

        this.card1 = new TrucoCard();   
        // this.card1.setPath("../../API/assets/img/1_de_basto.png");
        this.cards.push(this.card1);
        this.card2 = new TrucoCard();  
        this.cards.push(this.card2);      
        this.card3 = new TrucoCard();
        this.cards.push(this.card3);              

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options';

        let style = document.createElement('style');
        style.innerText = `
        .player {
            display: flex;
            justify-content: space-around;
            width: 100%; /* Ocupar todo el ancho de la mesa */
        }
        .player img {
            width: 100px; /* Ancho de la imagen del avatar */
            height: 100px; /* Alto de la imagen del avatar */
            border-radius: 50%; /* Hace que la imagen sea circular */
            margin: 10px auto; /* Espaciado alrededor de la imagen y centrado horizontalmente */
            display: block;
        }
        
        /* Estilo para el contenedor de la carta */
        /* Estilo para las cartas del Truco */
        .truco-card {
            width: 120px;
            height: 180px;
            background-size: cover;
            background-repeat: no-repeat;
            text-align: center;
            font-weight: bold;
            font-size: 24px;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 5px;
            border-radius: 10px;
            cursor: pointer;
            transition: transform 0.2s ease-in-out;
        }
        
        .truco-card.played {
            transform: translateY(-10px);
        }

        
        .card.played {
            transform: translateY(-10px);
        }`;
        this.shadowRoot.appendChild(playerDiv)
		this.shadowRoot.appendChild(style);
        playerDiv.appendChild(this.playerName);
        playerDiv.appendChild(playerAvatar);
        playerDiv.appendChild(deck);
        deck.appendChild(this.cards[0]);
        deck.appendChild(this.cards[1]);
        deck.appendChild(this.cards[2]);
        // optionsDiv.appendChild(trucoButton);
        // optionsDiv.appendChild(envidoButton);
        // optionsDiv.appendChild(playCardButton);
        // playerDiv.appendChild(optionsDiv);


    }
    updateCards()
    {

    }
    getName()
    {
        return this.name;
    }
    setName(name)
    {
        this.name = name;
        // this.playerName.innerText =  `${this.name}`;
    }
    createButton(text, btnId) {
        const button = document.createElement('button');
        button.textContent = text;
        button.id = btnId;
        return button;
    }
    resetCards()
    {
        this.cards[0].setPath('');
        this.cards[1].setPath('');
        this.cards[2].setPath('');
    }
}

// Registrar el componente personalizado
customElements.define('truco-player', TrucoPlayer);

export {TrucoPlayer}