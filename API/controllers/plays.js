
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
        else if (palosAcummulator[palo].acummulator == 3 && palosAcummulator[palo].card.length != 0)
        {
           // Ordena el arreglo `lieCards` en orden descendente según la propiedad "envido"
            palosAcummulator[palo].card.sort((a, b) => b.envido - a.envido);
        
            // Calcula la suma de los dos valores de "envido" más altos
            const topTwoEnvidos = palosAcummulator[palo].card.slice(0, 2);
            return total = 20 + topTwoEnvidos[0].envido + topTwoEnvidos[1].envido;
        }
        else
        {
            if (palosAcummulator[palo].acummulator === 1) 
            {
                lieCards.push(palosAcummulator[palo].card[0]);
                if (lieCards.length === 3) 
                {
                    const maxEnvido = Math.max(lieCards[0].envido, lieCards[1].envido,lieCards[2].envido);
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