
class Plays
{
    constructor()
    {

    }

    verifyEnvido(cards)
    {
        let palosAcummulator = 
        {
            espada: { card: [], acummulator: 0 },
            oro: { card: [], acummulator: 0 },
            basto: { card: [], acummulator: 0 },
            copa: { card: [], acummulator: 0 }
        };
        
        if (cards.length === 3) 
        {
            for (const card of cards) 
            {
                const palo = card.palo;
                if (palo in palosAcummulator) 
                {
                palosAcummulator[palo].acummulator += 1;
                palosAcummulator[palo].card.push(card);
                }
            }
        }

        return this.calculateEnvido(palosAcummulator);
    }

    calculateEnvido(palosAcummulator)
    {
        let total = 0;
        let lieCards = [];
    for (const palo in palosAcummulator) 
    {
        
        if(palosAcummulator[palo].acummulator == 2 && palosAcummulator[palo].card.length != 0)
        {
            return total = 20 + palosAcummulator[palo].card[0].envido + palosAcummulator[palo].card[1].envido;
        }
        else
        {
            if (palosAcummulator[palo].acummulator === 1) 
            {
                lieCards.push(palosAcummulator[palo].card[0]);
                if (lieCards.length === 2) 
                {
                    const maxEnvido = Math.max(lieCards[0].envido, lieCards[1].envido);
                    lieCards = []; // Vaciar la matriz para la próxima llamada
                    return total = maxEnvido;
                }
            }
        }
    }
    }
    
}

module.exports = {Plays};
// export {Plays};