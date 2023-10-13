

import {TrucoController} from '../controller/trucoController.js';

class TrucoEntry extends HTMLElement 
{
    constructor(controller) 
    {
        super();
        this.attachShadow({ mode: 'open' }); // Abre el sombreador CSS

        this.mainTitle = document.createElement('h1');
        this.mainTitle.innerText = 'TRUCO ARGENTINO';

        this.nameLabel = document.createElement('label');
        this.nameLabel.innerText  = 'Enter your name';
        this.nameInput = document.createElement('input');
        this.nameInput.type = 'text';
        this.nameInput.value = '';

        this.button = document.createElement('button');
        this.button.innerText = 'Search for a player';
        this.button.classList.add('find');

        this.loadingImg = document.createElement('img');
        this.loadingImg.src = "../../API/assets/img/loading.gif";
        this.loadingImg.style.display = 'none';

        let style = document.createElement('style');
        style.innerText =`* {
            margin: 0;
            padding: 0;
        }
    
        body {
            background-color: rgb(255, 255, 255);
            display: grid;
            place-items: center;
            font-family: 'Tilt Warp', cursive;
        }
    
        h1 {
            margin: 50px 0 50px 0;
            font-size: 5rem;
            color: rgb(32, 183, 93);
            -webkit-text-stroke: .5px black;
        }
    
        input {
            margin-bottom: 20px;
            padding: 5px;
            font-size: 1.2rem;
        }
    
        button {
            font-size: 1.2rem;
            margin-bottom: 10px;
        }
    
        img {
            width: 30px;
        }
    
        #cont {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
        }
    
        .btn {
    
            font-size: 2rem;
            width: 100px;
            height: 100px;
            cursor: pointer;
            margin: 0;
            background-color: rgb(206, 203, 203);
            border-radius: 10px;
    
        }
    
        .find {
            font-size: 1.5rem;
            color: white;
            cursor: pointer;
            padding: 7px;
            border-radius: 10px;
            width: 250px;
            background-color: rgb(0, 0, 0);
        }
    
        .find:hover {
            background-color: rgb(226, 228, 230);
        }
    
        button.enabled {
            opacity: 1;
        }
    
        label {
            font-size: 2rem;
        }`
        this.shadowRoot.appendChild(style);

        this.innerController = controller;

    }
    connectedCallback()
    {      

        // Cargar el script de socket.io.js
        const script = document.createElement('script');
        script.src = '/socket.io/socket.io.js'; // Asegúrate de que esta ruta sea correcta
        script.async = true;
        script.onload = () => 
        {
            // El script de socket.io se ha cargado
            this.innerController.setView(this);
            this.innerController.iniciarSocketIO();
        };
        this.button.onclick = (event)=>
        {
            this.innerController.waitPlayers();
        }

        this.shadowRoot.appendChild(script);
        this.shadowRoot.appendChild(this.mainTitle);
        this.shadowRoot.appendChild(this.nameLabel);
        this.shadowRoot.appendChild(this.nameInput);
        this.shadowRoot.appendChild(this.button);   
        this.shadowRoot.appendChild(this.loadingImg);
    }
    getName()
    {
        return this.nameInput.value;
    }
}

// Registrar el componente personalizado para el mazo de 40 cartas
customElements.define('truco-entry', TrucoEntry);

export {TrucoEntry};
