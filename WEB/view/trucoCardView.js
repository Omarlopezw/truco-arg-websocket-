

class TrucoCard extends HTMLElement
{
    constructor()
    {
        super();
        this.path = '';
        this.card = document.createElement('div');
        this.card.classList.add('card');
        this.visibility = false; // Agrega una propiedad para indicar si es el jugador actual

        // this.card.style.backgroundImage = `url(${this.path})`;

        let style = document.createElement('style');
        style.innerText = ` /* Ejemplo de estilo para las cartas */
        .card {
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
        }`;

        this.appendChild(this.card);
        this.appendChild(style);

    }
    setPath(path)
    {
        if(this.visibility)
        {
            this.path = path;
            this.card.style.backgroundImage = `url(${this.path})`;
        }
        else
        {
            this.path = path;
            this.card.style.backgroundImage = `url("../../API/assets/img/backCard.jpg")`;
        }

    }
    getPath()
    {
        return this.path;
    }
    setVisibility(visibility)
    {
        this.visibility = visibility;
    }

}
customElements.define('truco-card', TrucoCard);

export {TrucoCard};