const { cards } = require('../assets/cards.js');
const { hand } = require('../assets/hand.js');
// import { cards } from '../assets/cards.js';
// import { hand } from '../assets/hand.js';

class CardHandler
{
    constructor()
    {
        this.mazo = [...cards];
        this.hand = hand;
        this.deliveredeCard = [];
    }

    dealCard()
    {
        if (this.mazo.length === 0) 
        {
            console.log('El mazo está vacío, mezcla las cartas y reinicia.');
            return;
        }

        const randomNumber = Math.floor(Math.random() * this.mazo.length);
        const card = this.mazo.splice(randomNumber, 1)[0];

        // Verifica si la carta ya ha sido entregada antes de agregarla a cartasEntregadas
        if (this.deliveredeCard.includes(card)) 
        {
            console.log('Esta carta ya se ha entregado. Mezcla el mazo y reinicia si deseas continuar.');
        } 
        else 
        {
            this.deliveredeCard.push(card);
            return card;
        }

    }

    mixCards()
    {
        if (this.hand.state == 'finish') 
        {
            this.mazo
        }
    }

}

// let cHandler = new CardHandler();

// let card = cHandler.dealCard();
// let card1 = cHandler.dealCard();
// let card2 = cHandler.dealCard();
// let card3 = cHandler.dealCard();

// console.log('my card: ' + card.numero + card.palo);
// console.log('my card: ' + card1.numero + card1.palo);
// console.log('my card: ' + card2.numero + card2.palo);
// console.log('my card: ' + card3.numero + card3.palo);

module.exports = {CardHandler};
// export{CardHandler}