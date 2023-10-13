et.on("changeHand",(e)=>
    {
        if( e != null && e.value != hand.player )
        {
            let obj = {};

            game.setHand(e.key,e.value);
            obj.hand = game.getHand();

            io.emit("changeHand",obj);