const { cards } = require('../assets/cards.js');
const { hand } = require('../assets/hand.js');

class CardHandler
{
    constructor()
    {
        this.fullDeck = [...cards]; // Mazo completo
        this.mazo = [...cards]; // Mazo actual
        this.hand = hand;
        this.deliveredCards = [];
    }

    dealCard() 
    {
        if (this.mazo.length === 0) 
        {
          this.mazo = [...cards];
          this.deliveredCards = [];
        }
    
        const randomNumber = Math.floor(Math.random() * this.mazo.length);
        const card = this.mazo.splice(randomNumber, 1)[0];
    
        if (!this.deliveredCards.includes(card)) 
        {
          this.deliveredCards.push(card);
          return card;
        } else {
          console.log('Esta carta ya se ha entregado. Mezcla el mazo y reinicia si deseas continuar.');
          return null; // Retorna null para indicar que no se ha repartido ninguna carta.
        }
      }
    
      resetDeck() 
      {
        this.mazo = [...cards];
        this.deliveredCards = [];
      }
}

module.exports = {CardHandler};
// export{CardHandler}