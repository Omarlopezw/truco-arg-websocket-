const { cards } = require('../assets/cards.js');
const { hand } = require('../assets/hand.js');
// import { cards } from '../assets/cards.js';
// import { hand } from '../assets/hand.js';

class CardHandler
{
    constructor()
    {
        // this.mazo = [...cards];
        // this.hand = hand;
        // this.deliveredeCard = [];
        this.fullDeck = [...cards]; // Mazo completo
        this.mazo = [...cards]; // Mazo actual
        this.hand = hand;
        this.deliveredCards = [];
    }

    // dealCard() 
    // {
    //     if (this.mazo.length === 0) 
    //     {
    //         console.log('El mazo está vacío, mezcla las cartas y reinicia.');
    //         // Aquí puedes realizar la lógica para mezclar el mazo y reiniciar el juego.
    //         return null;  // Retorna null para indicar que no se ha repartido ninguna carta.
    //     }
    
    //     const randomNumber = Math.floor(Math.random() * this.mazo.length);
    //     const card = this.mazo.splice(randomNumber, 1)[0];
    
    //     if (!this.deliveredeCard.includes(card)) 
    //     {
    //         this.deliveredeCard.push(card);
    //         return card;
    //     } 
    //     else 
    //     {
    //         console.log('Esta carta ya se ha entregado. Mezcla el mazo y reinicia si deseas continuar.');
    //         // Aquí puedes realizar la lógica para evitar repartir la misma carta nuevamente.
    //         return null;  // Retorna null para indicar que no se ha repartido ninguna carta.
    //     }
    // }
    // resetDeck() 
    
    // {
    //     this.mazo = this.mazo.concat(this.deliveredCards);

    //     this.deliveredCards = [];
    // }
    dealCard() 
    {
        if (this.mazo.length === 0) 
        {
        //   if (this.fullDeck.length === 0) {
        //       return null; // No hay cartas disponibles.
        //       console.log('El mazo completo está vacío. No hay cartas disponibles.');
        //   }
    
          // Mezclar y reiniciar el mazo
        //   this.mazo = this.shuffleDeck([...this.fullDeck]);
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
          // Aquí puedes realizar la lógica para evitar repartir la misma carta nuevamente.
          return null; // Retorna null para indicar que no se ha repartido ninguna carta.
        }
      }
    
      resetDeck() 
      {
        // this.mazo = this.shuffleDeck([...this.fullDeck]);
        this.mazo = [...cards];
        this.deliveredCards = [];
      }
    
      // Función para mezclar el mazo (algoritmo de Fisher-Yates)
      shuffleDeck(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
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