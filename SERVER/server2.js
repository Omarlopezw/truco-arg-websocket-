const express=require("express")
const app=express()
const path=require("path")
const http=require("http")
const {Server}=require("socket.io")
const {Truco} = require( "../API/controllers/trucoGame.js");
const {Player} = require("../API/controllers/playerHandler.js")

const server=http.createServer(app)

const io =new Server(server)
app.use(express.static(path.resolve("")))

let arr=[]
let playingArray=[]
let handInitialized = false;
let player1 = new Player();
let player2 = new Player();
let game = new Truco(player1,player2);
let hand = null;



io.on("connection",(socket)=>
{

    socket.on("find",(e)=>
    {

        if(e.name!=null)
        {

            arr.push(e.name);

            if(arr.length>=2)
            {
                let p1obj=
                {
                    p1name:arr[0],
                    p1move:""
                }
                let p2obj=
                {
                    p2name:arr[1],
                    p2move:""
                }

                let obj=
                {
                    p1:p1obj,
                    p2:p2obj,
                }

                // playingArray.push(obj)
                playingArray[0] = obj;
                playingArray[1] = handInitialized;
                arr.splice(0,2);

                io.emit("find",{allPlayers:playingArray})
                console.log('emisiones')
            }

        }

    })
    socket.on("initGame",(e)=>
    {
        if( e != null && !handInitialized )
        {
            console.log('entraa a init game ' + e.firstHandPlayer)
            let response = {};
            
            game.start(e.firstHandPlayer);
            player1.setName(e.userName);
            player2.setName(e.oppName);
            response[player1.name] = player1.cards;
            response[player2.name] = player2.cards;
            hand = game.getHand();
            console.log('Empieza jugador: ' + hand.player);
            
            let obj = {cards: response,hand:hand}
            io.emit("initGame",obj);
            handInitialized =true;
        }
    })

    socket.on("playCard",(e)=>
    {
        let response = {};
        let obj = {};
        if(e != null)
        {

            if(e.player == hand.player)
            {
                e.player == player1.name ?  response = game.processRequest(e.request,player1) :
                response = game.processRequest(e.request,player2);
                
                hand.player == player1.name ? game.setHand('player',player2.name) : game.setHand('player',player1.name);
                obj.hand = game.getHand();
                
                io.emit("playCard",response);
                io.emit("changeHand",obj);
            }
            else
            {
                response = null;
            }
            io.emit("playCard",response);
        }
    })

    socket.on("changeHand",(e)=>
    {
        if( e != null && e.value != hand.player )
        {
            let obj = {};

            game.setHand(e.key,e.value);
            obj.hand = game.getHand();

            io.emit("changeHand",obj);

        }
    })
    // socket.on("playing",(e)=>{
    //     if(e.value=="X"){
    //         let objToChange=playingArray.find(obj=>obj.p1.p1name===e.name)

    //         objToChange.p1.p1move=e.id
    //         objToChange.sum++
    //     }
    //     else if(e.value=="O"){
    //         let objToChange=playingArray.find(obj=>obj.p2.p2name===e.name)

    //         objToChange.p2.p2move=e.id
    //         objToChange.sum++
    //     }

    //     io.emit("playing",{allPlayers:playingArray})

    // })

    // socket.on("gameOver",(e)=>{
    //     playingArray=playingArray.filter(obj=>obj.p1.p1name!==e.name)
    //     console.log(playingArray)
    //     console.log("lol")
    // })

    console.log('usuario conectado');

})

app.get("/",(req,res)=>
{
    const filePath = path.join(__dirname, '../WEB/view/truco-arg.html');
    return res.sendFile(filePath);
})

server.listen(3000,()=>
{
    console.log("port connected to 3000")
})