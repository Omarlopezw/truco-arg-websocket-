// const {Truco} = require("../../API/controllers/trucoGame.js");
// const {Player} = require("../../API/controllers/playerHandler.js");
// import {Truco} from "../../API/controllers/trucoGame.js";
// import {Player} from"../../API/controllers/playerHandler.js";

class TrucoModel  
{
    constructor()
    {
        // this.player1 = new Player();
        // this.player2 = new Player();
        this.hand = {};
        this.socket = null;
        this.name = null;

    }
    getSocket()
    {
        return this.socket; // Devolver la instancia de Socket.IO
    }
    initGame(firstHandPlayerName)
    {
        // let response = {};
        // this.game = new Truco(this.player1,this.player2);
        // this.game.start(firstHandPlayerName);
        // response[this.player1.name] = this.player1.cards;
        // response[this.player2.name] = this.player2.cards;
        // this.hand = this.game.getHand();
        // alert('Empieza jugador: ' + this.hand.player);

        // return response;
    }
    playCard(player,request)
    {
        // let name = player.getName();
        let response;
        console.log(player);
        console.log('hand: '+this.hand.player);
        if(player == this.hand.player)
        {
            alert('Podes tiraar');
            player == this.player1.name ?  response = this.game.processRequest(request,this.player1) :
            response = this.game.processRequest(request,this.player2);
            
            return response;
        }
        else
        {
            alert('NOOOOOOOOOOOOO PODES tiraar');
            return null;

        }
    }
    findUser(e)
    {
        console.log('nombre que llego al mnodelo ' + this.name);
        let obj = {};
     
            alert('encontrado');
            let allPlayersArray = e.allPlayers[0];
            let startedGame = e.allPlayers[1];
            let lastestPlayers = allPlayersArray[allPlayersArray.length-1];
            console.log("html",allPlayersArray[allPlayersArray.length-1]);

            if (startedGame) 
            {
                // const foundObject = allPlayersArray.find(obj => obj.p1.p1name == `${this.innerView.getName()}` || obj.p2.p2name == `${this.innerView.getName()}`);
                allPlayersArray.p1.p1name == `${this.name}` ? obj.oppName = allPlayersArray.p2.p2name : obj.oppName = allPlayersArray.p1.p1name
                
                obj.oppName == allPlayersArray.p1.p1name? obj.userName = allPlayersArray.p2.p2name : obj.userName = allPlayersArray.p1.p1name;
                obj.firstHandPlayer = allPlayersArray.p1.p1name;
                console.log('deberia ser el primer jugador que manda: ' + allPlayersArray.p1.p1name)
                console.log('jugadores: ' + obj.oppName)                
                
                // setTimeout(this.initGame(startedGame), 0);

                    
            }
        return obj;
    }
    iniciarSocketIO() 
    {
        // Iniciar la conexión de Socket.IO
        this.socket = io();
    
        // Escuchar eventos de Socket.IO
        this.socket.on('connect', () => {
        console.log('Conexión a Socket.IO establecida');
        });
    
        this.socket.on('mensaje', (data) => {
        console.log('Mensaje recibido:', data);
        });

        this.socket.on("find", (e) => 
        {
            this.socket.emit('modelFind', e);

        })

        this.socket.on("playCard", (e) =>  
        {
            // if(this.hand.player != this.userName)
            // {
                console.log('carta que se deberia sacar del contrario:'  + e.img);
                this.renderHandCards(e,this.innerView.player2);
                this.updateTable(e);
            // }
        })
        this.socket.on("initGame", (e) =>  
        {
            this.dealCards(e);
        })

    }
    waitPlayers(name)
    {
        this.name = name;
        let response = false;

        if (name !== '') 
        {
            this.socket.emit("find", { name: name });
            response = true;
        }
        return response;
    }
    setNames(username,oppName)
    {
        this.player1.setName(username);
        this.player2.setName(oppName);
    }
    getHand()
    {
        return this.hand;
    }
    // game.compareCards();
    // game.beginStage2();
    // game.beginStage3();
}

// let model = new TrucoModel();

// let response = model.initGame();

// console.log('respuesta del modelo: ' + response['Omar'][0].numero + response['Omar'][0].palo + response['Omar'][0].img);


export {TrucoModel}