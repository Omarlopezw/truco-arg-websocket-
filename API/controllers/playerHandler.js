const { cards } = require("../assets/cards");
const { Plays } = require("./plays.js");
class Player
{
    constructor()
    {
        this.name = '';
        this.cards = [];
        this.challenges = {'envido': '','truco':''};
        this.plays = new Plays();
    }
    sayEnvido()
    {
        return this.plays.verifyEnvido(this.cards);  
    }
    responseEnvido(challenge)
    {
        if(challenge == true)
        {
            let points = 0;
            let response = '1';
            console.log('Player contrtario quiere envido: yes or no');
            response == '1'? points = this.plays.verifyEnvido(this.cards) : points = false;

            return points;
        }
    }
    responseTruco(challenge)
    {
        if(challenge == true)
        {
            let trucoResponse = 0;
            let response = '1';
            console.log('Player contrtario quiere envido: yes or no');
            let index = 0;
            response == '1'? trucoResponse = this.throwCard(index) : trucoResponse = false;

            return trucoResponse;
        }
    }
    sayTruco()
    {

    }
    throwCard(index)
    {
        // return this.cards[index] = {};
        return this.cards[index];
    }
    showHand()
    {
        return this.cards;
    }
    setName(name)
    {
        this.name = name;
    }
    getName()
    {
        return this.name;
    }
    
}

// export {Player};
module.exports =  {Player};