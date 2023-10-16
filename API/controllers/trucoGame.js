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
        // this.stageScore = {[playerOneName]: 0,[playerTwoName]:0}
        this.stageScore = {};
        this.hand = hand;
        this.plays = new Plays();
        // this.table = {[playerOneName]: [],[playerTwoName]:[]};
        this.table = {};
    }
    start(firstHandPlayerName)
    {
        this.hand.numero = '0';
        this.hand.state = 'start';
        this.hand.player = firstHandPlayerName;
        if (firstHandPlayerName == this.playerOne.name) 
        {
            console.log("El primer jugador comienza. "  + this.playerOne.name);
            this.dealCardToPlayer(this.playerOne);
            this.dealCardToPlayer(this.playerTwo);
        } 
        else 
        {
            console.log("El segundo jugador comienza." + this.playerTwo.name);
            // this.hand.player = this.playerTwo.name;
            // this.hand.numero = '1';
            this.dealCardToPlayer(this.playerTwo);
            this.dealCardToPlayer(this.playerOne);
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
        if(player.cards.length < 3)
        {
            while(player.cards.length < 3)
            {
                let card = this.mazo.dealCard();
                if(card) player.cards.push(card);
            } 
        }
        else
        {
            console.log('tiene 3 o mas cartas')
        }

    }
    resetRound()
    {
        this.playerOne.cards = [];
        this.playerTwo.cards = [];
        this.mazo.resetDeck();
        if(this.hand.player != this.playerOne.name)
        {
            this.hand.player = this.playerOne.name;
            this.dealCardToPlayer(this.playerOne);
            this.dealCardToPlayer(this.playerTwo);

        }
        else
        {
            this.hand.player = this.playerTwo.name;
            this.dealCardToPlayer(this.playerTwo);
            this.dealCardToPlayer(this.playerOne);
        }

    }
    compareCards()
    {
        console.log("playerOneLatestCard. "  + this.playerOne.name);
        console.log("playerTwoLatestCard. "  + this.playerTwo.name);

        let playerOneLatestCard = this.table[this.playerOne.name][this.table[this.playerOne.name].length - 1];
        let playerTwoLatestCard = this.table[this.playerTwo.name][this.table[this.playerTwo.name].length - 1];
        console.log("playerOneLatestCard. "  + playerOneLatestCard.truco);
        console.log("playerTwoLatestCard. "  + playerTwoLatestCard.truco);
        if(playerOneLatestCard.truco > playerTwoLatestCard.truco)
        {

            if (!this.stageScore[this.playerOne.name]) 
            {
                this.stageScore[this.playerOne.name] = 0; // Inicializa un nuevo array si no existe
            }
            this.stageScore[this.playerOne.name]+=1;

            console.log('stage score player 1 ' + this.stageScore[this.playerOne.name])

            if(this.stageScore[this.playerOne.name] == 2)
            {
                console.log('truco hand: ' + this.hand.truco)
                if(this.hand.truco == true)
                {
                    this.playerOneScore+=2;
                }
                else
                {
                    this.playerOneScore+=1;
                }
                this.hand.winner = this.playerOne.name;
                this.hand.state = 'end';
                this.hand.playersPoints[this.playerOne.name] = this.playerOneScore;
                this.hand.playersPoints[this.playerTwo.name] = this.playerTwoScore; 
                console.log('winner stage 1 mesa: '+ this.hand.winner);
                console.log('player1: '+ this.hand.playersPoints[this.playerOne.name]);
                console.log('player2: '+ this.hand.playersPoints[this.playerTwo.name]);
                this.stageScore[this.playerOne.name] = 0;
                if(this.stageScore[this.playerTwo.name])
                {
                    this.stageScore[this.playerTwo.name] = 0
                }
                else
                {
                    console.log('PLayer 2 sigue en 0')
                }
            }
        }
        else if(playerOneLatestCard.truco < playerTwoLatestCard.truco)
        {
            
            if (!this.stageScore[this.playerTwo.name]) 
            {
                this.stageScore[this.playerTwo.name] = 0; // Inicializa un nuevo array si no existe
            }
            this.stageScore[this.playerTwo.name]+=1;

            console.log('stage score player 2 ' + this.stageScore[this.playerTwo.name])
            
            if(this.stageScore[this.playerTwo.name] == 2)
            {
                console.log('truco hand: ' + this.hand.truco)
                if(this.hand.truco == true)
                {
                    this.playerTwoScore+=2;
                }
                else
                {
                    this.playerTwoScore+=1;
                }
                this.hand.winner = this.playerTwo.name;
                this.hand.state = 'end';
                this.hand.playersPoints[this.playerOne.name] = this.playerOneScore;
                this.hand.playersPoints[this.playerTwo.name] = this.playerTwoScore;                
                console.log('winner stage 1 mesa: '+ this.hand.winner);
                console.log('player1: '+ this.hand.playersPoints[this.playerOne.name]);
                console.log('player2: '+ this.hand.playersPoints[this.playerTwo.name]);

                this.stageScore[this.playerTwo.name] = 0;
                if(this.stageScore[this.playerOne.name])
                {
                    this.stageScore[this.playerOne.name] = 0
                }
                else
                {
                    console.log('PLayer 1 sigue en 0')
                }
            }


        }
        else
        {
            console.log('pardaa');
            if (!this.stageScore[this.playerOne.name] && !this.stageScore[this.playerTwo.name]) 
            {
                this.stageScore[this.playerOne.name] = 0; // Inicializa un nuevo array si no existe
                this.stageScore[this.playerTwo.name] = 0; // Inicializa un nuevo array si no existe
            }
            if(this.hand.parda != true)
            {
                this.stageScore[this.playerOne.name]+=1;
                this.stageScore[this.playerTwo.name]+=1;
                this.setHand('parda',true);
            }
            else
            {
                this.stageScore[this.playerOne.name] = 1;
                this.stageScore[this.playerTwo.name] = 1;
            }

        }
    }
    compareEnvido()
    {
        this.hand.envido = true;
        this.hand.state = 'finished-envido';
        let envidoPoints = {};
        if(this.playerOne.sayEnvido() > this.playerTwo.sayEnvido())
        {
            this.playerOneScore+=2;
        }
        else if(this.playerOne.sayEnvido() < this.playerTwo.sayEnvido())
        {
            this.playerTwoScore+=2;
        }
        else
        {
            console.log('pparda en envido')
            this.hand.player == this.playerOne.name? this.playerOneScore+=2 : this.playerTwoScore+=2;
        }
        envidoPoints[this.playerOne.name] = this.playerOne.sayEnvido();
        envidoPoints[this.playerTwo.name] = this.playerTwo.sayEnvido();

        return envidoPoints;
    }

    processRequest(request,player)
    {
        switch (request.play) {
            case 'mesa':
                // let indexMesa = 2;
                let card = player.throwCard(request.index);
                // console.log('queda con: ' + player.cards[request.index].img)
                // console.log('queda con: ' + this.playerOne.cards[request.index].img)
                // console.log('queda con: ' + this.playerTwo.cards[request.index].img)
                console.log('player que llega a request: ' + player.name)
                if (!this.table[player.name]) 
                {
                    this.table[player.name] = []; // Inicializa un nuevo array si no existe
                }
                this.table[player.name].push(card);
                // this.updateTable(player);
                this.hand.numero == '1' ? this.setHand('numero','2') : this.setHand('numero','1');
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
    getPlayersScore()
    {
        let points = {};
        points[this.playerOne.name] = this.playerOneScore;
        points[this.playerTwo.name] = this.playerTwoScore;

        return points;
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
