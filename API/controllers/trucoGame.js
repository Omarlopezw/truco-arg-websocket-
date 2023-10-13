const { Player } = require('./playerHandler.js');
const { CardHandler } = require('./cardHandler.js');
const { hand } = require('../assets/hand.js');
const { Plays } = require("./plays.js");
// import { Player } from './playerHandler.js';
// import { CardHandler } from './cardHandler.js';
// import { hand } from '../assets/hand.js';
// import { Plays } from "./plays.js";

class Truco
{
    constructor(player1,player2)
    {
        this.mazo = new CardHandler();
        this.playerOne = player1;
        let playerOneName = player1.name;
        this.playerTwo = player2;
        let playerTwoName = player2.name;
        this.playerOneScore = 0;
        this.playerTwoScore = 0;
        this.stageScore = {[playerOneName]: 0,[playerTwoName]:0}
        this.hand = hand;
        this.plays = new Plays();
        this.table = {[playerOneName]: [],[playerTwoName]:[]};
    }
    start(firstHandPlayerName)
    {
        this.hand.numero = '1';
        this.hand.player = firstHandPlayerName;
        if (firstHandPlayerName == this.playerOne.name) 
        {
            console.log("El primer jugador comienza. "  + this.playerOne.name);
            this.dealCardToPlayer(this.playerOne);
            this.dealCardToPlayer(this.playerTwo);
            console.log("Que hacer?." + this.playerOne.getName());
            //     console.log("Envido..");
            //     console.log("Truco..");
            //     console.log("Arrojar carta..");
                // this.processRequest('mesa',this.playerOne);
                // this.nextPlayerForStage1(this.playerTwo);
        } 
        else 
        {
            console.log("El segundo jugador comienza." + this.playerTwo.name);
            // this.hand.player = this.playerTwo.name;
            // this.hand.numero = '1';
            this.dealCardToPlayer(this.playerTwo);
            this.dealCardToPlayer(this.playerOne);
            // console.log("Que hacer?.");
            //     console.log("Envido..");
            //     console.log("Truco..");
            //     console.log("Arrojar carta..");
                // this.processRequest('mesa',this.playerTwo);
                // this.nextPlayerForStage1(this.playerOne);
        }
    }
    getHand()
    {
        return this.hand;
    }
    setHand(key,value)
    {
        this.hand[key] = value;
    }
    dealCardToPlayer(player)
    {
        while(player.cards.length < 3)
        {
            let card = this.mazo.dealCard();
            if(card) player.cards.push(card);
        } 
    }
    compareCards()
    {
        let playerOneLatestCard = this.table[this.playerOne.name][this.table[this.playerOne.name].length - 1];
        let playerTwoLatestCard = this.table[this.playerTwo.name][this.table[this.playerTwo.name].length - 1];
        // console.log(playerTwoLatestCard)
        if(playerOneLatestCard.truco > playerTwoLatestCard.truco)
        {
            this.hand.winner = this.playerOne;
            this.stageScore[this.playerOne.name]=+1;
            this.playerOneScore=+1;
            console.log('winner stage 1 mesa: '+ this.hand.winner.name);
        }
        else if(playerOneLatestCard.truco < playerTwoLatestCard.truco)
        {
            this.hand.winner = this.playerTwo;
            this.stageScore[this.playerTwo.name]=+1;
            this.playerTwoScore=+1;
            console.log('winner stage 1 mesa: '+ this.hand.winner.name);

        }
        else
        {
            console.log('parda');
            this.hand.state = 'parda';
        }
    }
    compareEnvido()
    {
        if(this.playerOne.sayEnvido() > this.playerTwo.sayEnvido())
        {
            this.playerOneScore=+2;
        }
        else if(this.playerOne.sayEnvido() > this.playerTwo.sayEnvido())
        {
            this.playerTwoScore=+2;
        }
        else
        {
            console.log('gana el que es mano');
            this.hand.state = 'parda';
        }
    }
    nextPlayerForStage1(player)
    {
        if(this.hand.numero == '1' && this.hand.envido != '1' && this.hand.truco != '1')
        {
            console.log("Que hacer?.");
            console.log("Envido..");
            console.log("Truco..");
            console.log("Arrojar carta..");
            this.processRequest('mesa',player); 
            this.hand.state = 'stage1End';
            // this.beginStage2();
        }
        else if(this.hand.numero == '1' && this.hand.envido == '1' && this.hand.truco == '1' )
        {
            console.log("Arrojar carta..");
            this.processRequest('mesa',player); 
            this.hand.state = 'stage1End';
            // this.beginStage2();
        }
        else if(this.hand.numero == '1' && this.hand.envido != '1' && this.hand.truco == '1')
        {
            console.log("Que hacer?.");
            console.log("Envido..");
            console.log("Arrojar carta..");
            this.processRequest('mesa',player); 
            this.hand.state = 'stage1End';
            // this.beginStage2();
        }
        else
        {
            console.log("Que hacer?.");
            console.log("Truco..");
            console.log("Arrojar carta..");
            this.processRequest('mesa',player); 
            this.hand.state = 'stage1End';
            // this.beginStage2();
        }
    }
    beginStage2()
    {
        this.hand.numero = '2';
        if(this.hand.numero == '2' && this.hand.truco != '1')
        {
            console.log("Que hacer?.");
            console.log("Truco..");
            console.log("Arrojar carta..");
            this.processRequest('mesa',this.hand.winner); 
            let nextPlayer = this.hand.winner.name == this.playerOne.name? this.playerTwo : this.playerOne;
            this.nextPlayerForStage2(nextPlayer);
            if(this.stageScore[this.playerOne.name] == 2)
            {
                console.log('winner player one');
            }
            else if(this.stageScore[this.playerTwo.name] == 2)
            {
                console.log('winner player two');
            }
            else
            {
                this.beginStage3();
            }
        }
        else
        {
            console.log("Que hacer?.");
            console.log("Arrojar carta..");
            this.processRequest('mesa',this.hand.winner);
            let nextPlayer = this.hand.winner.name == this.playerOne.name? this.playerTwo : this.playerOne;
            this.nextPlayerForStage2(nextPlayer);
            if(this.stageScore[this.playerOne.name] == 2)
            {
                console.log('winner player one');
            }
            else if(this.stageScore[this.playerTwo.name] == 2)
            {
                console.log('winner player two');
            }
            else
            {
                this.beginStage3();
            }
        }
    }
nextPlayerForStage2(player)
    {
        if(this.hand.numero == '2' && this.hand.truco != '1')
        {
            console.log("Que hacer?.");
            console.log("Truco..");
            console.log("Arrojar carta..");
            this.processRequest('mesa',player); 
            this.hand.state = 'stage1End';
            // this.beginStage2();
        }
        else
        {
            console.log("Que hacer?.");
            console.log("Arrojar carta..");
            this.processRequest('mesa',player); 
            let nextPlayer = this.hand.winner.name == this.playerOne.name? this.playerTwo : this.playerOne;
            this.nextPlayerForStage2(nextPlayer);
            this.hand.state = 'stage1End';
            // this.beginStage2();
        }
    }
    beginStage3()
    {
        this.hand.numero = '3';
        let winnerPlayer = this.hand.winner;
        if(this.hand.numero == '3' && this.hand.truco != '1')
        {
            console.log("Que hacer?.");
            console.log("Truco..");
            console.log("Arrojar carta..");
            this.processRequest('mesa',winnerPlayer); 
            let nextPlayer = this.hand.winner.name == this.playerOne.name? this.playerTwo : this.playerOne;
            this.nextPlayerForStage3(nextPlayer);
        }
        else
        {
            console.log("Que hacer?.");
            console.log("Arrojar carta..");
            this.processRequest('mesa',winnerPlayer); 
            let nextPlayer = this.hand.winner.name == this.playerOne.name? this.playerTwo : this.playerOne;
            this.nextPlayerForStage3(nextPlayer);
        }
    }
    nextPlayerForStage3(player)
    {
        if(this.hand.numero == '3' && this.hand.truco != '1')
        {
            console.log("Que hacer?.");
            console.log("Truco..");
            console.log("Arrojar carta..");
            this.processRequest('mesa',player); 
            this.hand.state = 'stage1End';
        }
        else
        {
            console.log("Que hacer?.");
            console.log("Arrojar carta..");
            this.processRequest('mesa',player); 
            this.hand.state = 'stage1End';
        }
    }
    processRequest(request,player)
    {
        switch (request.play) {
            case 'mesa':
                // let indexMesa = 2;
                let card = player.throwCard(request.index);
                console.log('queda con: ' + player.cards)
                console.log('queda con: ' + player.cards[0].img)
                // this.table[player.name].push(card);
                this.updateTable(player);
                return card;
                break;
            case 'truco':
                let rivalTrucoResponse = false;
                let index;
                this.hand.truco = '1';
                player.name == this.playerOne.name ? rivalTrucoResponse = this.playerTwo.responseTruco(true) : rivalTrucoResponse = this.playerOne.responseTruco(true);
                rivalTrucoResponse != false? this.compareCards() : console.log('no truco') ;
                break;
            case 'envido':
                let rivalResponse = false;
                let indexEnvido = 0;
                this.hand.envido = '1';
                player.name == this.playerOne.name? rivalResponse = this.playerTwo.responseEnvido(true) : rivalResponse = this.playerOne.responseEnvido(true);
                rivalResponse != false? this.compareEnvido() : console.log('no envido') ;
                let cardInEnvido = player.throwCard(indexEnvido);
                this.table[player.name].push(cardInEnvido);
                this.updateTable(player);
                break;
        
            default:
                break;
        }
    }
    updateTable(player)
    {
        let playerName = player.name;
        console.log('Player: ' + playerName);
        for (const playerName in this.table) 
        {
            console.log(this.table[playerName]);
        }
        
    }
}
// let player1 = new Player('Omar');
// let player2 = new Player('Aldo');
// let game = new Truco(player1,player2);

// game.start();
// game.compareCards();
// game.beginStage2();
// game.beginStage3();

module.exports = {Truco};
// export{Truco};
