
class TrucoController
{
    constructor(model) 
    {
        this.innerView = null;
        this.innerModel = model;
        this.socket = null;
        this.oppName = '';
        this.userName = '';
        this.firstHandPlayer = '';
        this.playedCard = null;
        this.hand = null;
    }
    initGame()
    {

        this.innerView.setNames(this.userName,this.oppName);
        this.socket.emit("initGame", {firstHandPlayer: this.firstHandPlayer,
            userName: this.userName,oppName: this.oppName});

    }
    dealCards(hand)
    {
        console.log('entre a dealscards ' +hand.cards[this.userName][0].img);
        console.log('entre a dealscards ' +hand.cards[this.oppName][0].img);
        this.innerView.player1.cards[0].setVisibility(true);
        this.innerView.player1.cards[1].setVisibility(true);
        this.innerView.player1.cards[2].setVisibility(true);
        this.innerView.player1.cards[0].setPath(hand.cards[this.userName][0].img);
        this.innerView.player1.cards[1].setPath(hand.cards[this.userName][1].img);
        this.innerView.player1.cards[2].setPath(hand.cards[this.userName][2].img);
        console.log('cartas player1 al empezar game: ' + hand.cards[this.userName][0].img)
        console.log('cartas player1 al empezar game: ' + hand.cards[this.userName][1].img)
        console.log('cartas player1 al empezar game: ' + hand.cards[this.userName][2].img)

        // // //player2
        this.innerView.player2.cards[0].setVisibility(false);
        this.innerView.player2.cards[1].setVisibility(false);
        this.innerView.player2.cards[2].setVisibility(false);
        this.innerView.player2.cards[0].setPath(hand.cards[this.oppName][0].img);
        this.innerView.player2.cards[1].setPath(hand.cards[this.oppName][1].img);
        this.innerView.player2.cards[2].setPath(hand.cards[this.oppName][2].img);
        console.log('cartas player2 al empezar game: ' + hand.cards[this.oppName][0].img)
        console.log('cartas player2 al empezar game: ' + hand.cards[this.oppName][1].img)
        console.log('cartas player2 al empezar game: ' + hand.cards[this.oppName][2].img)
    }
    renderHandCards(card,player)
    {        
        for (let i = 0; i < player.cards.length; i++) 
        {
            if(player.cards[i].getPath() == card.img)
            {
                player.cards[i].setVisibility(true);
                player.cards[i].setPath('');
                this.innerView.playCardButton.disabled = true;
                break;
            }
            // else
            // {
            //     alert('Indice no existe');
            //     console.log('no se ha encontrado el indice con carta: ' + card.img)
            //     break;
            // }
        }
    }
    resetPlayersHand()
    {
        this.innerView.player1.resetCards();
        this.innerView.player2.resetCards();
        console.log('cartas reset ');

    }
    updateTable(card)
    {
        if (card != null) 
        {
            this.innerView.playedCards.style.backgroundImage = `url(${card.img})`;
        } 
        else 
        {
            this.innerView.playedCards.style.backgroundImage = 'none';
        }

    }
    playCard(player,request)
    {
        let request2 = {player:player,request:request};
        if(this.hand.player != player)
        {
            alert('No es tu turno');
        }
        this.socket.emit("playCard", request2);
    }
    sayEnvido(player,request)
    {
        let request2 = {player:player,request:request};
        if(this.hand.player != player || this.hand.state  == 'finished-envido')
        {
            alert('No se puede cantar envido');
        }
        else
        {
            
            this.socket.emit("sayEnvido", request2);
            console.log('Player ' + player + 'emitio envido');
        }
    }
    sayTruco(player,request)
    {
        let request2 = {player:player,request:request};
        if(this.hand.player != player || this.hand.truco  !== undefined)
        {
            alert('No se puede cantar truco');
        }
        else
        {
            
            this.socket.emit("sayTruco", request2);
        }
    }
    waitPlayers()
    {
        if (this.innerView.getName() == null || this.innerView.getName() == '') 
        {
            alert("Please enter a name");
        }
        else 
        {
            this.socket.emit("find", { name: this.innerView.getName() });
            this.innerView.loadingImg.style.display = "block";
            this.innerView.button.disabled = true;
        }
    }
    handleNextRound(e) 
    {
        // Realiza las acciones necesarias para la ronda
        this.updateTable(null);
        this.resetPlayersHand();
        this.dealCards(e);
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

            alert('encontrado');
            let allPlayersArray = e.allPlayers[0];
            console.log("html",allPlayersArray[allPlayersArray.length-1]);

            if (this.innerView.getName() != '') 
            {
                allPlayersArray.p1.p1name == `${this.innerView.getName()}` ? this.oppName = allPlayersArray.p2.p2name : this.oppName = allPlayersArray.p1.p1name
                
                this.oppName == allPlayersArray.p1.p1name? this.userName = allPlayersArray.p2.p2name : this.userName = allPlayersArray.p1.p1name;
                this.firstHandPlayer = allPlayersArray.p1.p1name;
                console.log('deberia ser el primer jugador que manda: ' + allPlayersArray.p1.p1name)
                this.innerView.dispatchEvent(new CustomEvent('changeTrucoView', { detail:true }));
                console.log('jugadores: ' + Object.keys(allPlayersArray).length)                
                
                this.initGame();

                
            }

        })

        this.socket.on("initGame", (e) =>  
        {
            this.hand = e.hand;
            this.innerView.whoIsTurn.innerText = 'Turno de ' + this.hand.player;
            this.dealCards(e);
        })

        this.socket.on("playCard", (e) =>  
        {
            if(e != null)
            {
                console.log('carta que se deberia sacar del contrario:'  + e.img);
                this.renderHandCards(e,this.innerView.player1);
                this.renderHandCards(e,this.innerView.player2);
                this.updateTable(e);
            }
        })
        this.socket.on("changeHand", (e) =>  
        {
            this.hand = e.hand;
            this.innerView.whoIsTurn.innerText = 'Turno de ' + this.hand.player;

            if(this.hand.player == this.userName)
            {
                this.innerView.playCardButton.disabled = false;
            }
        })
        this.socket.on("compareCards", (e) =>  
        {
            alert('winner: ' + e.winner);
            this.hand = e;
            if(e.state == 'start')
            {
                this.socket.emit("nextRound",{});
            }

        })
        this.socket.on("nextRound", (e) =>  
        {
            this.handleNextRound(e);
            this.socket.off( (e) => {this.handleNextRound()});
        })

        this.socket.on("envidoRequest", (e) =>  
        {
            if(e.player == this.oppName)
            {
                if (confirm("Queres aceptar el envido?")) 
                {
                    this.socket.emit("envidoResponse",{response: true});

                } 
                else
                {
                    this.socket.emit("envidoResponse",{response: false});
                }
            }

        })
        this.socket.on("compareEnvido", (e) =>  
        {
            alert('Mis puntos envido ' + e[this.userName])
            alert('Puntos envido de mi oponente ' + e[this.oppName])
        })

        this.socket.on("getPlayersScore", (e) =>  
        {
            let winner = '';

            if( (e[this.userName] >= 15 ) )
            {

                winner = this.userName;
                this.socket.emit("finishGame",{winner: winner});
            }
            else if( (e[this.oppName]) >= 15)
            {
                winner = this.oppName;
                this.socket.emit("finishGame",{winner: winner});
            }
            else
            {
                this.innerView.playerOneScore.innerText = `Puntos de ${this.userName}: ` + e[this.userName];
                this.innerView.playerTwoScore.innerText = `Puntos de ${this.oppName}: ` + e[this.oppName];
            }
        })

        this.socket.on("trucoRequest", (e) =>  
        {
            if(e.player == this.oppName)
            {
                if (confirm("Queres aceptar el truco?")) 
                {
                    
                    // let request = {index: index,play:'mesa'};
                    // let request2 = {player:player,request:request};
                    
                    this.socket.emit("trucoResponse",{response: true,player:e.player });

                } 
                else
                {
                    this.socket.emit("trucoResponse",{response: false});
                }
            }

        })
        this.socket.on("trucoResponse", (e) =>  
        {
            let acceptedTruco = '';
            e.player == this.userName? acceptedTruco = this.oppName : acceptedTruco = this.userName;
            alert('Truco aceptado por player: ' + acceptedTruco);
        })
        this.socket.on("finishGame", (e) =>  
        {
            alert(`GAME OVER:  ${e.winner} GANA EL JUEGO`);
            this.innerView.dispatchEvent(new CustomEvent('finishGame', { detail:true }));
        })

    }

    setView(view)
    {
        this.innerView = view;
    }
}

export {TrucoController}