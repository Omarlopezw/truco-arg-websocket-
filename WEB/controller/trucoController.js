
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
        this.table = [];
        this.playedCard = null;
        this.hand = null;
        this.gameInitialized = false;

    }
    initGame()
    {

        this.innerView.setNames(this.userName,this.oppName);
        // this.innerModel.setNames(this.userName,this.oppName);
        // let response = this.innerModel.initGame(this.firstHandPlayer);
        // this.hand = this.innerModel.getHand();
        this.socket.emit("initGame", {firstHandPlayer: this.firstHandPlayer,
            userName: this.userName,oppName: this.oppName});

    }
    dealCards(hand)
    {
        console.log('entradno adealcard')
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
                this.table.push(card);
                // console.log('table: ' + this.table[0].img);
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
    updateTable(card)
    {
        // let latestCard = this.table[this.table.length-1];
        // console.log('latedtCard: ' + card.img);
        this.innerView.playedCards.style.backgroundImage = `url(${card.img})`;

    }
    playCard(player,request)
    {
        let request2 = {player:player,request:request};
        if(this.hand.player != player)
        {
            alert('No es tu turno');
        }
        this.socket.emit("playCard", request2);
        // this.renderHandCards(response,this.innerView.player1);
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
            let startedGame = e.allPlayers[1];
            let lastestPlayers = allPlayersArray[allPlayersArray.length-1];
            console.log("html",allPlayersArray[allPlayersArray.length-1]);

            if (this.innerView.getName() != '') 
            {
                // const foundObject = allPlayersArray.find(obj => obj.p1.p1name == `${this.innerView.getName()}` || obj.p2.p2name == `${this.innerView.getName()}`);
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
                // let obj = {key: 'player',value: `${this.oppName}`};
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

    }

    setView(view)
    {
        this.innerView = view;
    }
}

export {TrucoController}